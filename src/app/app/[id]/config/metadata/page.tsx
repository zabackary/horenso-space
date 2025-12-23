import type { Database } from "@/@types/database.types";
import MetadataForm from "@/components/club-config/metadata-form";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";

type ClubRow = Database["public"]["Tables"]["clubs"]["Row"];

export default async function ClubMetadataPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  // permission check handled in layout
  const { id } = await params;
  await initLingui();
  const supabase = await createClient();

  const clubPromise = supabase
    .from("clubs")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError()
    .then((res) => res.data);

  return (
    <Box p="4">
      <MetadataForm clubPromise={clubPromise} />
    </Box>
  );
}
