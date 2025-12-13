"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
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
      setError(error instanceof Error ? error.message : "An error occurred");
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
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }

  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Heading size="5" as="h3">
        Invites
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
          <Text>No invites created yet.</Text>
        ) : (
          invites.map((invite) => (
            <Card key={invite.id}>
              <Flex direction="row" align="center" width="100%" gap="2">
                <Flex direction="column" flexGrow="1">
                  <Text size="3" weight="bold">
                    Role: {invite.role_name}
                  </Text>
                  <Text size="2">Invited by: {invite.invited_by_name}</Text>
                  <Text size="2">
                    Expires at: {new Date(invite.expires_at).toLocaleString()}
                  </Text>
                  <Text size="2">Used {invite.usage_count} times</Text>
                </Flex>
                <Button
                  variant="soft"
                  color="red"
                  onClick={() => handleDelete(invite.id)}
                >
                  <TrashIcon />
                  Delete
                </Button>
                <Button asChild variant="solid">
                  <Link
                    href={`/app/club/invite/${invite.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(
                        `${window.location.origin}/app/club/invite/${invite.id}`
                      );
                    }}
                  >
                    Copy link
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
        <Button onClick={() => openCreateDialog()}>Generate invite</Button>
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
            <Dialog.Title>Generate invite</Dialog.Title>
            <Dialog.Description>
              Create an invite link to invite a new member to your club.
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
                  <Text style={{ flexGrow: 1 }}>Role when joining</Text>
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
                <Button type="submit">Generate invite</Button>
                <Button
                  variant="soft"
                  type="button"
                  onClick={() => resetDialog()}
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}
