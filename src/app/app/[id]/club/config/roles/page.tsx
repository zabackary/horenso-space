import RolesManager from "@/components/club-config/roles-manager";
import { Box } from "@radix-ui/themes";
import { ClubConfigTabNav } from "../layout";

export default async function ClubRolesPage({
  params,
}: {
  params: { id: string };
}) {
  // permission check handled in layout
  const { id } = await params;
  return (
    <>
      <ClubConfigTabNav active="roles" clubId={id} />
      <Box p="4">
        {/* client component handles fetching/updating */}
        <RolesManager clubId={id} />
      </Box>
    </>
  );
}
