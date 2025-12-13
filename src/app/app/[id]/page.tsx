import HomeCard from "@/components/ui/home-card";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Box, Card, Grid, Heading, Text } from "@radix-ui/themes";

export default async function ClubPage({ params }: PageProps<"/app/[id]">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const permissions = await getPermissionsForClub(supabase, id);

  return (
    <Grid
      gap="4"
      p="4"
      columns={{
        xs: "1",
        sm: "2",
        md: "3",
      }}
      style={{ zIndex: -1 }}
    >
      <Box
        asChild
        gridColumn={{
          xs: "span 1",
          sm: "span 2",
          md: "span 3",
        }}
      >
        <Card variant="ghost">
          <Heading>
            <Trans id="home.news">Recent news</Trans>
          </Heading>
          <Text>
            <Trans id="home.newsContent">News content will appear here</Trans>
          </Text>
        </Card>
      </Box>
      {permissions.permissions.includes("canManageClub") ? (
        <HomeCard
          title={<Trans id="home.clubSettings">Club settings</Trans>}
          description={
            <Trans id="home.clubSettingsDesc">
              Manage club metadata, roles, and members
            </Trans>
          }
          href={`/app/${id}/club/config/metadata`}
        />
      ) : null}
      <HomeCard
        title={<Trans id="home.calendar">Calendar</Trans>}
        description={
          <Trans id="home.calendarDesc">
            Check your club events and meetings
          </Trans>
        }
        href={`/app/${id}/calendar`}
        action={
          permissions.permissions.includes("canWriteCalendar")
            ? {
                label: <Trans id="home.addEvent">Add event</Trans>,
                href: `/app/${id}/calendar/create`,
              }
            : undefined
        }
      />
      <HomeCard
        title={<Trans id="home.absences">Absence reports</Trans>}
        description={
          <Trans id="home.absencesDesc">Access absence report forms</Trans>
        }
        href={`/app/${id}/absences`}
        action={
          permissions.permissions.includes("canWriteOwnReport")
            ? {
                label: <Trans id="home.reportAbsence">Report absence</Trans>,
                href: `/app/${id}/absences/create`,
              }
            : undefined
        }
      />
      {/* <HomeCard
        title="ドキュメント"
        description="クラブの共有ドキュメントにアクセスします。"
        href={`/app/${id}/documents`}
        action={
          permissions.permissions.includes("canWriteFiles")
            ? {
                label: "アップロードする",
                href: `/app/${id}/documents/upload`,
              }
            : undefined
        }
      />
      <HomeCard
        title="通知"
        description="最近の通知を確認します。"
        href={`/app/${id}/notifications`}
        action={
          permissions.permissions.includes("canWriteCalendar")
            ? {
                label: "新しい通知を投稿する",
                href: `/app/${id}/notifications/post`,
              }
            : undefined
        }
      /> */}
    </Grid>
  );
}
