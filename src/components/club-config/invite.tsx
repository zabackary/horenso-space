"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  Select,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { use, useState } from "react";
import styles from "./invite.module.css";

export default function InvitesManager({
  clubId,
  rolesPromise,
  invitesPromise,
}: {
  clubId: string;
  rolesPromise: PromiseLike<
    Pick<Database["public"]["Tables"]["roles"]["Row"], "id" | "name">[]
  >;
  invitesPromise: PromiseLike<
    Database["public"]["Functions"]["get_invitations"]["Returns"]
  >;
}) {
  const [error, setError] = useState<string | null>(null);
  const initialInvites = use(invitesPromise);
  const [invites, setInvites] = useState(() => initialInvites);
  const roles = use(rolesPromise);

  const { t } = useLingui();

  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState<string>(
    roles.length > 0 ? roles[0].id : ""
  );

  function openCreateDialog() {
    setGenerateDialogOpen(true);
  }

  function resetDialog() {
    setGenerateDialogOpen(false);
    setInviteRole(roles.length > 0 ? roles[0].id : "");
    setError(null);
  }

  async function generateInvite() {
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("create_invitation", {
        new_club_id: clubId,
        role_id: inviteRole,
        expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
      if (error) throw error;
      resetDialog();
      if (data) {
        setInvites((prevInvites) => [
          ...prevInvites,
          {
            id: data,
            role_name:
              roles.find((r) => r.id === inviteRole)?.name ?? "Unknown role",
            invited_by_name: "You",
            expires_at: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
            created_at: new Date().toISOString(),
            usage_count: 0,
          },
        ]);
      }
    } catch (error: unknown) {
      console.error("Failed to generate invite:", error);
      setError(
        t({
          id: "invitesManager.generateInviteError",
          message: "Failed to generate invite. Please try again.",
        })
      );
    }
  }

  async function handleDelete(inviteId: string) {
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("delete_invitation", {
        invitation_id: inviteId,
      });
      if (error) throw error;
      setInvites((prevInvites) =>
        prevInvites.filter((invite) => invite.id !== inviteId)
      );
    } catch (error: unknown) {
      console.error("Failed to delete invite:", error);
      setError(
        t({
          id: "invitesManager.deleteInviteError",
          message: "Failed to delete invite. Please try again.",
        })
      );
    }
  }

  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Heading size="5" as="h3">
        <Trans>Invites</Trans>
      </Heading>

      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Flex direction="column" gap="3">
        {roles.length === 0 ? (
          <Text>
            <Trans>Please create roles before generating invites.</Trans>
          </Text>
        ) : (
          invites.map((invite) => (
            <Card key={invite.id}>
              <Flex direction="row" align="center" width="100%" gap="2">
                <Flex direction="column" flexGrow="1" gap="1">
                  <Text size="3" weight="bold">
                    <Trans>Invite for role "{invite.role_name}"</Trans>{" "}
                    <Badge>
                      <Trans>Used {invite.usage_count} times</Trans>
                    </Badge>
                  </Text>
                  <Text size="2">
                    <Trans>
                      Expires at: {new Date(invite.expires_at).toLocaleString()}
                    </Trans>
                  </Text>
                </Flex>
                <Button
                  variant="soft"
                  color="red"
                  onClick={() => handleDelete(invite.id)}
                >
                  <TrashIcon />
                  <Trans>Delete</Trans>
                </Button>
                <Button asChild variant="solid">
                  <Link
                    href={`/app/club/invite/${invite.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      const url = `${window.location.origin}/app/club/invite/${invite.id}`;
                      if ("share" in navigator) {
                        try {
                          navigator
                            .share({
                              title: t({
                                id: "invitesManager.inviteLinkTitle",
                                message: "Club Invite Link",
                              }),
                              url,
                            })
                            .catch(() => {
                              navigator.clipboard.writeText(url);
                              alert(
                                t({
                                  id: "invitesManager.linkCopiedAlert",
                                  message: "Invite link copied to clipboard.",
                                })
                              );
                            });
                        } catch (_) {
                          navigator.clipboard.writeText(url);
                          alert(
                            t({
                              id: "invitesManager.linkCopiedAlert",
                              message: "Invite link copied to clipboard.",
                            })
                          );
                        }
                      }
                    }}
                  >
                    <Trans>Copy link</Trans>
                  </Link>
                </Button>
              </Flex>
            </Card>
          ))
        )}
      </Flex>

      <Flex
        direction="row"
        className={styles.createSection}
        gap="2"
        align="center"
      >
        <Button onClick={() => openCreateDialog()}>
          <Trans>Generate invite</Trans>
        </Button>
      </Flex>

      <Dialog.Root
        open={generateDialogOpen}
        onOpenChange={(open) => {
          if (!open) resetDialog();
        }}
      >
        <Dialog.Content asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateInvite();
            }}
          >
            <Dialog.Title>
              <Trans>Generate invite</Trans>
            </Dialog.Title>
            <Dialog.Description>
              <Trans>
                Generate a new invitation link for your club. You can choose the
                role that new members will have when they join using this link.
              </Trans>
            </Dialog.Description>
            <Flex direction="column" gap="2">
              {error && (
                <Callout.Root color="red">
                  <Callout.Icon>
                    <CrossCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}
              <Flex direction="column" gap="2" my="4">
                <Flex direction="row" align="center" gap="2">
                  <Text style={{ flexGrow: 1 }}>
                    <Trans>Select role for new members</Trans>
                  </Text>
                  <Select.Root
                    value={inviteRole}
                    onValueChange={(value) => setInviteRole(value)}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      {roles.map((r) => (
                        <Select.Item key={r.id} value={r.id}>
                          {r.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Flex>

              <Flex gap="2">
                <Button type="submit">
                  <Trans>Generate invite</Trans>
                </Button>
                <Button
                  variant="soft"
                  type="button"
                  onClick={() => resetDialog()}
                >
                  <Trans>Cancel</Trans>
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
