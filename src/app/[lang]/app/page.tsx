import { AppHeader } from "@/components/ui/app-header";
import ClubCard from "@/components/ui/club-card";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

export default async function App({ params }: PageProps<"/[lang]/app">) {
  const { lang } = await params;
  initLingui(lang);
  const supabase = await createClient();
  const { data: clubs, error: clubsError } = await supabase
    .from("joined_clubs")
    .select("*");

  if (clubsError) {
    console.error("couldn't fetch clubs:", clubsError);
  }

  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        gap="4"
        p="4"
        style={{ zIndex: -1 }}
      >
        <Heading size="7" as="h1">
          <Trans id="app.selectClub">Select a club</Trans>
        </Heading>
        {clubs?.length ? (
          <Flex gap="4" wrap="wrap" justify="center">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </Flex>
        ) : clubs ? (
          <Callout.Root>
            <Callout.Text>
              <Trans id="app.noClubs">
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
              <Trans id="app.error">An error occurred</Trans>
            </Callout.Text>
          </Callout.Root>
        )}
        <Button asChild variant="soft" size="4">
          <Link href="/app/club/create">
            <Trans id="app.createClub">Create a club</Trans>
          </Link>
        </Button>
      </Flex>
    </>
  );
}
