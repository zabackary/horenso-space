import { FragmentType, getFragmentData, gql } from "@/gql";
import { useLazyQuery } from "@apollo/client/react";
import { Trans } from "@lingui/react/macro";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Flex,
  Heading,
  HoverCard,
  IconButton,
  Link as RadixLink,
  Skeleton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const UserLinkCardFragment = gql(`
  fragment UserLinkCard on Profiles {
    id
    fullName
    nickname
    bio
    school
    avatarUrl

    clubMembersCollection {
      edges {
        node {
          club {
            id
            name
          }
        }
      }
    }
  }
`);

export interface UserLinkCardProps {
  profile: FragmentType<typeof UserLinkCardFragment>;
}

/**
 * A card showing the user's avatar, full name, and linking to their profile page
 * along with some metadata.
 *
 * Typically used in the user link hovercard.
 */
export default function UserLinkCard({
  profile: profileFragment,
}: UserLinkCardProps) {
  const profile = getFragmentData(UserLinkCardFragment, profileFragment);
  return (
    <Flex direction="column" gap="2" align="stretch" width="320px">
      <Flex direction="row" gap="2" align="start">
        <Avatar
          size="4"
          src={profile.avatarUrl || undefined}
          alt={profile.fullName}
          fallback={profile.fullName?.charAt(0)?.toUpperCase() || "?"}
        />
        <Flex
          direction="column"
          gap="0"
          align="start"
          justify="center"
          alignSelf="stretch"
          flexGrow="1"
        >
          <Heading size="5" truncate>
            {profile.fullName}
          </Heading>
          {profile.nickname && (
            <Text size="2" truncate>
              {profile.nickname}
            </Text>
          )}
        </Flex>
        <Tooltip content={<Trans>View profile</Trans>}>
          <IconButton asChild variant="outline" size="2">
            <Link href={`/app/users/${profile.id}`}>
              <OpenInNewWindowIcon />
            </Link>
          </IconButton>
        </Tooltip>
      </Flex>
      {profile.clubMembersCollection &&
        (profile.clubMembersCollection.edges.length > 1 ? (
          <Flex direction="row" gap="1">
            <Text size="2" weight="bold">
              <Trans>Clubs:</Trans>
            </Text>
            <Text size="2" truncate>
              {profile.clubMembersCollection.edges.map(({ node }) => (
                <RadixLink asChild key={node.club?.id}>
                  <Link href={`/app/${node.club?.id}`}>{node.club?.name}</Link>
                </RadixLink>
              ))}
            </Text>
          </Flex>
        ) : profile.clubMembersCollection.edges.length === 1 ? (
          <Flex direction="row" gap="1">
            <Text size="2" truncate>
              <Trans>
                Member of "
                {profile.clubMembersCollection.edges[0].node.club?.name}"
              </Trans>
            </Text>
          </Flex>
        ) : null)}
      {profile.bio && (
        <Flex direction="row" gap="1" align="center">
          <Tooltip content={profile.bio}>
            <Text size="2" truncate>
              {profile.bio}
            </Text>
          </Tooltip>

          {profile.school && <Badge>{profile.school}</Badge>}
        </Flex>
      )}
      {!profile.bio && profile.school && (
        <Text size="2">
          <Badge>{profile.school}</Badge>
        </Text>
      )}
    </Flex>
  );
}

export function UserLinkCardSkeleton() {
  return (
    <Flex direction="column" gap="2" align="stretch" width="320px">
      <Flex direction="row" gap="2" align="start">
        <Skeleton>
          <Avatar size="4" fallback="?" />
        </Skeleton>
        <Flex
          direction="column"
          gap="0"
          align="start"
          justify="center"
          alignSelf="stretch"
          flexGrow="1"
        >
          <Skeleton>
            <Heading size="5" truncate>
              Loading...
            </Heading>
          </Skeleton>
        </Flex>
      </Flex>
      <Skeleton>
        <Text size="2" weight="bold">
          Loading...
        </Text>
      </Skeleton>
      <Skeleton>
        <Text size="2" truncate>
          Loading...
        </Text>
      </Skeleton>
    </Flex>
  );
}

export interface UserLinkProps {
  userId?: string;
}

const UserLinkCardQuery = gql(`
  query UserLinkCardQuery($userId: UUID) {
    profilesCollection(filter:  {
       id: { eq: $userId }
    }) {
      edges {
        node {
          ...UserLinkCard
        }
      }
    }
  }
`);

/**
 * A UserLink wraps a component, providing a hovercard showing the UserLinkCard with more details about the user.
 */
export function UserLink({
  userId,
  children,
}: PropsWithChildren<UserLinkProps>) {
  // Lazy-load the UserLinkCard data when the component is hovered
  const [loadCardData, { data, called }] = useLazyQuery(UserLinkCardQuery, {
    fetchPolicy: "cache-first",
  });

  const handleMouseEnter = () => {
    if (called) return; // Don't load again if we've already loaded once
    try {
      loadCardData({ variables: { userId } });
    } catch (error) {
      console.error("Failed to load user link card data:", error);
    }
  };

  const profile = data?.profilesCollection?.edges[0]?.node ?? null;

  return (
    <HoverCard.Root>
      <HoverCard.Trigger onMouseEnter={handleMouseEnter}>
        {children}
      </HoverCard.Trigger>
      <HoverCard.Content>
        {profile ? (
          <UserLinkCard profile={profile} />
        ) : (
          <UserLinkCardSkeleton />
        )}
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

export const UserButtonFragment = gql(`
  fragment UserButton on Profiles {
    id
    fullName
    avatarUrl
  }
`);
