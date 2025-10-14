import { FullscreenCard } from "@/components/ui/fullscreen-card";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { CrossCircledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Callout, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { joinClub } from "./actions";
import styles from "./page.module.css";

interface JoinClubPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function JoinClubPage({
  params,
  searchParams,
}: JoinClubPageProps) {
  const { id } = await params;
  const { error: searchError } = await searchParams;

  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (!profile) {
    // redirect user to login if they are not signed in
    // The user will be redirected back to this page after login
    const searchParams = new URLSearchParams({
      next: `/app/club/join/${id}`,
    });
    redirect(`/auth/login?${searchParams.toString()}`);
  }
  const { data: invite, error } = await supabase
    .from("club_members")
    .select("roles(name), public_clubs(name, school)")
    .eq("accepted", false)
    .eq("user_id", profile.id)
    .eq("club_id", id)
    .single();
  if (error || !invite) {
    // If there was an error fetching the invite, or if no invite exists, show an empty page
    // This could happen if the invite has already been accepted, or if the ID is invalid
    // Note: We don't want to reveal whether the club exists or not for security reasons
    return <FullscreenCard>Invalid or expired invite link.</FullscreenCard>;
  }

  return (
    <FullscreenCard>
      <Flex justify="center" align="center" direction="column" gap="4" asChild>
        <form>
          <Text as="p" size="4" align="center">
            You are invited to join a club
          </Text>
          <Card className={styles.card}>
            <Flex
              justify="center"
              align="center"
              direction="column"
              p="2"
              gap="1"
              width="100%"
            >
              <PaperPlaneIcon width={36} height={36} className={styles.plane} />
              <Heading as="h1" size="7" align="center">
                {invite.public_clubs.name}
              </Heading>
              {invite.public_clubs.school ? (
                <Heading as="h3" size="5" align="center" color="gray">
                  at {invite.public_clubs.school}
                </Heading>
              ) : null}
            </Flex>
          </Card>
          {searchError !== undefined && (
            <Callout.Root color="red">
              <Callout.Icon>
                <CrossCircledIcon />
              </Callout.Icon>
              <Callout.Text>Failed to join club</Callout.Text>
            </Callout.Root>
          )}
          <Button size="4" variant="solid" formAction={joinClub.bind(null, id)}>
            Join Club
          </Button>
        </form>
      </Flex>
    </FullscreenCard>
  );
}
