import ClubCard from "@/components/ui/club-card";
import UserProfile from "@/components/ui/user-profile";
import { gql } from "@/gql";
import { query } from "@/lib/apollo/server";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Flex, Heading } from "@radix-ui/themes";
import { redirect } from "next/navigation";

const UserQuery = gql(`
  query User($id: UUID!) {
    club_membersCollection(filter: { user_id: { eq: $id } }) {
      edges {
        node {
          clubs {
            nodeId,
            ...ClubCard
          }
        }
      }
    }
  }
`);

export default async function UserPage({
  params,
}: PageProps<"/app/users/[id]">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const ownProfile = await getProfile(supabase);

  if (ownProfile?.id === id) {
    redirect("/app/users/me");
  }

  const { data } = await query({
    query: UserQuery,
    variables: { id },
  });

  const mutualClubs = data?.club_membersCollection?.edges
    .map((e) => e.node.clubs ?? [])
    .flat();

  return (
    <Flex p="4" direction="column" gap="2">
      <UserProfile id={id} />
      {mutualClubs && mutualClubs.length > 0 && (
        <Flex direction="column" gap="1">
          <Heading>
            <Trans>Common Clubs</Trans>
          </Heading>
          <Flex gap="2" wrap="wrap">
            {mutualClubs.map((club) => (
              <ClubCard key={club.nodeId} club={club} />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
