"use client";

import { gql } from "@/gql";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Avatar,
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
import { useState } from "react";
import styles from "./members-manager.module.css";

const MembersManagerQuery = gql(`
  query MembersManager($clubId: UUID!) {
    clubMembersCollection(
      orderBy: { joinedAt: DescNullsLast }
      first: 100
      filter: { clubId: { eq: $clubId } }
    ) {
      edges {
        node {
          user {
            fullName
            nickname
            avatarUrl
          }
          role {
            name
            id
          }
          userId
        }
      }
    }
    rolesCollection(
      orderBy: { name: AscNullsLast }
      first: 100
      filter: { clubId: { eq: $clubId } }
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

const ChangeMemberRoleMutation = gql(`
  mutation ChangeMemberRole($clubId: UUID!, $userId: UUID!, $roleId: UUID) {
    updateClubMembersCollection(
      set: {roleId: $roleId}
      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}
      atMost: 1
    ) {
      affectedCount
    }
  }
`);

const RemoveMemberMutation = gql(`
  mutation RemoveMember($clubId: UUID!, $userId: UUID!) {
    deleteFromClubMembersCollection(
      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}
      atMost: 1
    ) {
      affectedCount
    }
  }
`);

export default function MembersManager({ clubId }: { clubId: string }) {
  const [error, setError] = useState<string | null>(null);

  const { data, error: queryError } = useSuspenseQuery(MembersManagerQuery, {
    variables: { clubId },
  });

  if (queryError) {
    console.error("Failed to load members manager data:", queryError);
    return (
      <Callout.Root color="red">
        <Callout.Icon>
          <CrossCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          <Trans>Failed to load members data. Please try again later.</Trans>
        </Callout.Text>
      </Callout.Root>
    );
  }

  const members = data?.clubMembersCollection?.edges.map((e) => e.node) ?? [];
  const roles = data?.rolesCollection?.edges.map((e) => e.node) ?? [];

  const { t } = useLingui();

  const [changeMemberRole] = useMutation(ChangeMemberRoleMutation);

  async function changeRole(memberUserId: string, newRoleId: string) {
    setError(null);
    try {
      await changeMemberRole({
        variables: { clubId, userId: memberUserId, roleId: newRoleId },
        refetchQueries: [MembersManagerQuery],
      });
    } catch (e: unknown) {
      console.error("Failed to change member role:", e);
      setError(t`Failed to change member role. Please try again later.`);
    }
  }

  const [removeMemberMutation] = useMutation(RemoveMemberMutation);

  async function removeMember(memberUserId: string) {
    setError(null);
    const supabase = createClient();
    try {
      // First check if the member to be removed is the current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id === memberUserId) {
        setError(t`You cannot remove yourself from the club.`);
        return;
      }

      await removeMemberMutation({
        variables: { clubId, userId: memberUserId },
        refetchQueries: [MembersManagerQuery],
      });
    } catch (e: unknown) {
      console.error("Failed to remove member:", e);
      setError(t`Failed to remove member. Please try again later.`);
    }
  }

  return (
    <Flex direction="column" className={styles.root} gap="3">
      <Heading size="5" as="h3">
        <Trans>Manage members</Trans>
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
            <Trans>No members yet.</Trans>
          </Text>
        ) : (
          members.map((m) => {
            const displayName =
              m.user?.fullName ?? m.user?.nickname ?? t`Unknown user`;
            const role = m.role?.name ?? t`No role`;

            return (
              <Card key={m.userId}>
                <Flex align="center" gap="3" justify="between" width="100%">
                  <Avatar
                    fallback={displayName.charAt(0).toUpperCase()}
                    size="4"
                    src={m.user?.avatarUrl ?? undefined}
                  />
                  <Flex direction="column" style={{ flexGrow: 1 }} gap="1">
                    <RadixLink weight="bold" size="3" asChild>
                      <Link href={`/app/users/${m.userId}`}>{displayName}</Link>
                    </RadixLink>
                    <Text size="2" color="gray">
                      <Trans>Role: {role}</Trans>
                    </Text>
                  </Flex>
                  <Flex align="center" gap="2">
                    <Select.Root
                      value={m.role?.id ?? undefined}
                      onValueChange={(val) => changeRole(m.userId, val)}
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
                      onClick={() => removeMember(m.userId)}
                      variant="soft"
                      color="red"
                    >
                      <TrashIcon /> <Trans>Remove</Trans>
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
