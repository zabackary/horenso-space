import HomeCard from "@/components/ui/home-card";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { Box, Card, Grid, Heading, Text } from "@radix-ui/themes";

export default async function ClubPage({
  params,
}: PageProps<"/[lang]/app/[id]">) {
  const { id } = await params;

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
          <Heading>最近のお知らせ</Heading>
          <Text>お知らせの内容がここに入ります。</Text>
        </Card>
      </Box>
      {permissions.permissions.includes("canManageClub") ? (
        <HomeCard
          title="クラブ設定"
          description="クラブのメタデータ、役割、メンバーを管理します。"
          href={`/app/${id}/club/config/metadata`}
        />
      ) : null}
      <HomeCard
        title="カレンダー"
        description="クラブのイベントやミーティングを確認しましょう。"
        href={`/app/${id}/calendar`}
        action={
          permissions.permissions.includes("canWriteCalendar")
            ? {
                label: "イベントを追加する",
                href: `/app/${id}/calendar/create`,
              }
            : undefined
        }
      />
      <HomeCard
        title="欠席連絡"
        description="欠席報告フォームにアクセスします。"
        href={`/app/${id}/absences`}
        action={
          permissions.permissions.includes("canWriteOwnReport")
            ? {
                label: "欠席を連絡する",
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
