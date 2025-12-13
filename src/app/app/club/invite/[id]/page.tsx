import { FullscreenCard } from "@/components/ui/fullscreen-card";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { CrossCircledIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Callout, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { joinClub } from "./actions";
import styles from "./page.module.css";

export default async function JoinClubPage({
  params,
  searchParams,
}: PageProps<"/app/club/invite/[id]">) {
  const { id } = await params;
  await initLingui();
  const { error: searchError } = await searchParams;

  const supabase = await createClient();
  const profile = await getProfile(supabase);
  if (!profile) {
    // redirect user to login if they are not signed in
    // The user will be redirected back to this page after login
    const searchParams = new URLSearchParams({
      next: `/app/club/invite/${id}`,
    });
    redirect(`/auth/login?${searchParams.toString()}`);
  }
  const { data: invite, error } = await supabase
    .rpc("verify_invitation", {
      invitation_id: id,
    })
    .single();
  if (error || !invite) {
    // If there was an error fetching the invite, or if no invite exists, show an empty page
    // This could happen if the invite has already been accepted, or if the ID is invalid
    // Note: We don't want to reveal whether the club exists or not for security reasons
    return (
      <FullscreenCard>
        <Trans id="invite.invalid">Invalid or expired invite link</Trans>
      </FullscreenCard>
    );
  }

  return (
    <FullscreenCard>
      <Flex justify="center" align="center" direction="column" gap="4" asChild>
        <form>
          <Text as="p" size="4" align="center">
            <Trans id="invite.heading">You are invited to join a club</Trans>
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
                {invite.club_name}
              </Heading>
              <Heading as="h3" size="5" align="center" color="gray">
                <Trans id="invite.by">by {invite.invited_by_name}</Trans>
              </Heading>
            </Flex>
          </Card>
          <Text as="p" size="4" align="center">
            <Trans id="invite.details">
              You will be joining as: <strong>{invite.role_name}</strong>.
              Expires at:{" "}
              <strong>{new Date(invite.expires_at).toLocaleString()}</strong>
            </Trans>
          </Text>
          {searchError !== undefined && (
            <Callout.Root color="red">
              <Callout.Icon>
                <CrossCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                <Trans id="invite.error">Failed to join club</Trans>
              </Callout.Text>
            </Callout.Root>
          )}
          <Button size="4" variant="solid" formAction={joinClub.bind(null, id)}>
            <Trans id="invite.join">Join Club</Trans>
          </Button>
        </form>
      </Flex>
    </FullscreenCard>
  );
}
