"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Link as RadixLink,
  Select,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { use, useState } from "react";
import styles from "./members-manager.module.css";

type ClubMemberRow = Database["public"]["Tables"]["club_members"]["Row"];
type ProfileRow = Database["public"]["Views"]["profiles"]["Row"];
type RoleRow = Database["public"]["Tables"]["roles"]["Row"];

type MemberWithProfile = ClubMemberRow & { profile: ProfileRow | null };

type Role = { id: string; name: string };

export default function MembersManager({
  membersPromise,
  rolesPromise,
  clubId,
}: {
  membersPromise: Promise<MemberWithProfile[]>;
  rolesPromise: Promise<{ id: string; name: string }[]>;
  clubId: string;
}) {
  const initialMembers = (use(membersPromise) ?? []) as MemberWithProfile[];
  const initialRoles = (use(rolesPromise) ?? []) as RoleRow[];

  const { t } = useLingui();

  type MemberClient = {
    key: string;
    user_id: string;
    role_id: string | null;
    profile: ProfileRow | null;
  };

  const [members, setMembers] = useState<MemberClient[]>(
    () =>
      initialMembers.map((m) => ({
        key: m.user_id,
        user_id: m.user_id,
        role_id: (m.role_id as string) ?? null,
        profile: m.profile,
      })) ?? []
  );
  const [roles] = useState<Role[]>(
    () =>
      initialRoles.map((r) => ({
        id: r.id,
        name: (r as { id: string; name: string }).name,
      })) ?? []
  );
  const [error, setError] = useState<string | null>(null);

  async function changeRole(memberUserId: string, newRoleId: string) {
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("club_members")
        .update({ role_id: newRoleId })
        .match({ club_id: clubId, user_id: memberUserId })
        .throwOnError();
      setMembers((prev) =>
        prev.map((m) =>
          m.user_id === memberUserId ? { ...m, role_id: newRoleId } : m
        )
      );
    } catch (e: unknown) {
      console.error("Failed to change member role:", e);
      setError(
        t({
          id: "membersManager.changeRoleError",
          message: "Failed to change member role. Please try again later.",
        })
      );
    }
  }

  async function removeMember(memberUserId: string) {
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("club_members")
        .delete()
        .match({ club_id: clubId, user_id: memberUserId })
        .throwOnError();
      setMembers((prev) => prev.filter((m) => m.user_id !== memberUserId));
    } catch (e: unknown) {
      console.error("Failed to remove member:", e);
      setError(
        t({
          id: "membersManager.removeMemberError",
          message: "Failed to remove member. Please try again later.",
        })
      );
    }
  }

  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Heading size="5" as="h3">
        <Trans id="membersManager.manageMembers">Manage members</Trans>
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
        {members.length === 0 ? (
          <Text className={styles.empty}>
            <Trans id="membersManager.noMembers">No members yet.</Trans>
          </Text>
        ) : (
          members.map((m) => {
            const displayName =
              m.profile?.full_name ?? m.profile?.nickname ?? m.user_id;
            const effectiveRoleId = m.role_id ?? roles[0]?.id ?? "";
            const currentRoleLabel =
              roles.find((r) => r.id === effectiveRoleId)?.name ?? "";

            return (
              <Card key={m.key}>
                <Flex align="center" gap="3" justify="between" width="100%">
                  <Flex direction="column" style={{ flexGrow: 1 }} gap="1">
                    <RadixLink weight="bold" size="3" asChild>
                      <Link href={`/app/users/${m.user_id}`}>
                        {displayName}
                      </Link>
                    </RadixLink>
                    <Text size="2" color="gray">
                      <Trans id="membersManager.roleLabel">
                        Role: {currentRoleLabel}
                      </Trans>
                    </Text>
                  </Flex>
                  <Flex align="center" gap="2">
                    <Select.Root
                      value={effectiveRoleId}
                      onValueChange={(val) => changeRole(m.user_id, val)}
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
                    <Button
                      onClick={() => removeMember(m.user_id)}
                      variant="soft"
                      color="red"
                    >
                      <TrashIcon />{" "}
                      <Trans id="membersManager.remove">Remove</Trans>
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            );
          })
        )}
      </Flex>
    </Flex>
  );
}
