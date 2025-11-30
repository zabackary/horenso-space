import MembersManager from "@/components/club-config/members-manager";
import { Box } from "@radix-ui/themes";
import { ClubConfigTabNav } from "../layout";

export default async function ClubMembersPage({
  params,
}: PageProps<"/app/[id]/club/config/members">) {
  const { id } = await params;
  return (
    <>
      <ClubConfigTabNav active="members" clubId={id} />
      <Box p="4">
        <MembersManager clubId={id} />
      </Box>
    </>
  );
}
