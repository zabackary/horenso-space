import type { Database } from "@/@types/database.types";
import MetadataForm from "@/components/club-config/metadata-form";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Box, Spinner } from "@radix-ui/themes";
import React from "react";
import { ClubConfigTabNav } from "../layout";

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

  const clubRes = await supabase
    .from("clubs")
    .select("id, name, description, website, public")
    .eq("id", id)
    .single();
  const club: ClubRow | null = (clubRes.data ?? null) as ClubRow | null;

  const clubPromise = Promise.resolve(club);

  return (
    <>
      <ClubConfigTabNav active="metadata" clubId={id} />
      <Box p="4">
        <React.Suspense fallback={<Spinner />}>
          <MetadataForm clubPromise={clubPromise} />
        </React.Suspense>
      </Box>
    </>
  );
}
