"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { Box, Flex, Heading, Select, Text } from "@radix-ui/themes";
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
  const [roles, setRoles] = useState<Role[]>(
    () =>
      initialRoles.map((r) => ({
        id: r.id,
        name: (r as { id: string; name: string }).name,
      })) ?? []
  );
  const [error, setError] = useState<string | null>(null);

  async function changeRole(memberUserId: string, newRoleId: string | null) {
    setError(null);
    const supabase = createClient();
    try {
      await supabase
        .from("club_members")
        .update({ role_id: newRoleId ?? "" })
        .match({ club_id: clubId, user_id: memberUserId })
        .throwOnError();
      setMembers((prev) =>
        prev.map((m) =>
          m.user_id === memberUserId ? { ...m, role_id: newRoleId } : m
        )
      );
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <Flex direction="column" gap="4">
      <Heading size="5" as="h3">
        Members
      </Heading>
      {error && <Text color="red">{error}</Text>}

      {members.length === 0 ? (
        <Box className={styles.empty}>No members found.</Box>
      ) : (
        <Box>
          {members.map((m) => (
            <Flex
              key={m.key}
              className={styles.memberRow}
              align="center"
              justify="between"
            >
              <Flex className={styles.memberInfo} align="center">
                <Text>
                  {m.profile?.full_name ?? m.profile?.nickname ?? m.user_id}
                </Text>
              </Flex>
              <Flex className={styles.controls} align="center">
                <Select.Root
                  value={m.role_id ?? ""}
                  onValueChange={(val) => changeRole(m.user_id, val || null)}
                >
                  <Select.Trigger>
                    <Text>
                      {roles.find((r) => r.id === m.role_id)?.name ?? "No role"}
                    </Text>
                  </Select.Trigger>
                  <Select.Content>
                    {roles.map((r) => (
                      <Select.Item key={r.id} value={r.id}>
                        <Text>{r.name}</Text>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </Flex>
          ))}
        </Box>
      )}
    </Flex>
  );
}
