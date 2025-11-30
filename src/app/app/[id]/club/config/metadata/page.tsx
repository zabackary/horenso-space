import MetadataForm from "@/components/club-config/metadata-form";
import { Box } from "@radix-ui/themes";
import { ClubConfigTabNav } from "../layout";

export default async function ClubMetadataPage({
  params,
}: PageProps<"/app/[id]/club/config/metadata">) {
  // permission check handled in layout
  const { id } = await params;
  return (
    <>
      <ClubConfigTabNav active="metadata" clubId={id} />
      <Box p="4">
        {/* client component handles fetching/updating */}
        <MetadataForm clubId={id} />
      </Box>
    </>
  );
}
