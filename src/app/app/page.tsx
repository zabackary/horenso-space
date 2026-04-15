import { AppHeader } from "@/components/ui/app-header";
import ClubCard from "@/components/ui/club-card";
import { gql } from "@/gql";
import { query } from "@/lib/apollo/server";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

const joinedClubsQuery = gql(`
  query JoinedClubs($me: UUID!) {
    clubMembersCollection(filter: { userId: { eq: $me } }) {
      edges {
        node {
          club {
            nodeId,
            ...ClubCard
          }
        }
      }
    }
  }
`);

export default async function App({ params }: PageProps<"/app">) {
  const {} = await params;
  await initLingui();

  const supabase = await createClient();
  const { data, error } = await query({
    query: joinedClubsQuery,
    variables: { me: (await supabase.auth.getClaims()).data?.claims.sub ?? "" },
  });

  if (error) {
    console.error("couldn't fetch clubs:", error);
  }

  const clubs =
    data?.clubMembersCollection?.edges.map((e) => e.node.club ?? []).flat() ??
    [];

  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        align="center"
        justify="center"
        flexGrow="1"
        gap="4"
        p="4"
        style={{ zIndex: -1 }}
      >
        <Heading size="7" as="h1">
          <Trans>Select a club</Trans>
        </Heading>
        {clubs.length ? (
          <Flex gap="4" wrap="wrap" justify="center">
            {clubs.map((club) => (
              <ClubCard key={club.nodeId} club={club} />
            ))}
          </Flex>
        ) : clubs ? (
          <Callout.Root>
            <Callout.Text>
              <Trans>
                No clubs found. You need an invite link to join a club.
              </Trans>
            </Callout.Text>
          </Callout.Root>
        ) : (
          <Callout.Root>
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <Trans>An error occurred</Trans>
            </Callout.Text>
          </Callout.Root>
        )}
        <Button asChild variant="soft" size="4">
          <Link href="/app/club/create">
            <Trans>Create a club</Trans>
          </Link>
        </Button>
      </Flex>
    </>
  );
}
