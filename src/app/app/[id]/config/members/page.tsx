import MembersManager from "@/components/club-config/members-manager";
import { initLingui } from "@/lib/i18n/initLingui";
import { Box } from "@radix-ui/themes";

export default async function ClubMembersPage({
  params,
}: PageProps<"/app/[id]/config/members">) {
  const { id } = await params;
  await initLingui();

  return (
    <Box p="4">
      <MembersManager clubId={id} />
    </Box>
  );
}
