"use client";

import { gql } from "@apollo/client";
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
import PaginationControls from "@/components/ui/pagination-controls";
import { createClient } from "@/lib/supabase/client";
import { UserLink } from "../ui/user-link";
import styles from "./members-manager.module.css";

const PAGE_SIZE = 20;

type MembersManagerQueryData = {
  clubMembersCollection?: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{
      node: {
        userId: string;
        user?: {
          fullName: string;
          nickname?: string | null;
          avatarUrl?: string | null;
        } | null;
        role?: {
          name: string;
          id: string;
        } | null;
      };
    }>;
  } | null;
  rolesCollection?: {
    edges: Array<{
      node: {
        id: string;
        name: string;
      };
    }>;
  } | null;
};

type MembersManagerQueryVariables = {
  clubId: string;
  first: number;
  after: string | null;
};

const MembersManagerQuery = gql`
  query MembersManager($clubId: UUID!, $first: Int!, $after: Cursor) {
    clubMembersCollection(
      orderBy: { joinedAt: DescNullsLast }
      first: $first
      after: $after
      filter: { clubId: { eq: $clubId } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
`;

const ChangeMemberRoleMutation = gql`
  mutation ChangeMemberRole($clubId: UUID!, $userId: UUID!, $roleId: UUID) {
    updateClubMembersCollection(
      set: {roleId: $roleId}
      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}
      atMost: 1
    ) {
      affectedCount
    }
  }
`;

const RemoveMemberMutation = gql`
  mutation RemoveMember($clubId: UUID!, $userId: UUID!) {
    deleteFromClubMembersCollection(
      filter: {userId: {eq: $userId}, clubId: {eq: $clubId}}
      atMost: 1
    ) {
      affectedCount
    }
  }
`;

export default function MembersManager({ clubId }: { clubId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const [previousCursors, setPreviousCursors] = useState<(string | null)[]>([]);
  const { t } = useLingui();
  const [changeMemberRole] = useMutation(ChangeMemberRoleMutation);
  const [removeMemberMutation] = useMutation(RemoveMemberMutation);

  const { data, error: queryError } = useSuspenseQuery<
    MembersManagerQueryData,
    MembersManagerQueryVariables
  >(MembersManagerQuery, {
    variables: { clubId, first: PAGE_SIZE, after },
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

  const membersCollection = data?.clubMembersCollection;
  const members = membersCollection?.edges.map((e) => e.node) ?? [];
  const pageInfo = membersCollection?.pageInfo;
  const roles = data?.rolesCollection?.edges.map((e) => e.node) ?? [];

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
                  <UserLink userId={m.userId}>
                    <Avatar
                      fallback={displayName.charAt(0).toUpperCase()}
                      size="4"
                      src={m.user?.avatarUrl ?? undefined}
                    />
                  </UserLink>
                  <Flex direction="column" style={{ flexGrow: 1 }} gap="1">
                    <UserLink userId={m.userId}>
                      <RadixLink weight="bold" size="3" asChild>
                        <Link href={`/app/users/${m.userId}`}>
                          {displayName}
                        </Link>
                      </RadixLink>
                    </UserLink>
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
        {members.length > 0 && (
          <PaginationControls
            label={t`Showing ${members.length} members on this page`}
            hasPrevious={previousCursors.length > 0}
            hasNext={Boolean(pageInfo?.hasNextPage && pageInfo.endCursor)}
            onPrevious={() => {
              const previous = previousCursors.at(-1) ?? null;
              setPreviousCursors((current) => current.slice(0, -1));
              setAfter(previous);
            }}
            onNext={() => {
              if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
              setPreviousCursors((current) => [...current, after]);
              setAfter(pageInfo.endCursor);
            }}
          />
        )}
      </Flex>
    </Flex>
  );
}
