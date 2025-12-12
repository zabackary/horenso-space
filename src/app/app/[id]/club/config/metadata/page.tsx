import { Box, Spinner } from "@radix-ui/themes";
import React from "react";
import type { Database } from "@/@types/database.types";
import MetadataForm from "@/components/club-config/metadata-form";
import { createClient } from "@/lib/supabase/server";
import { ClubConfigTabNav } from "../layout";

type ClubRow = Database["public"]["Tables"]["clubs"]["Row"];

export default async function ClubMetadataPage({
  params,
}: {
  params: { id: string };
}) {
  // permission check handled in layout
  const { id } = await params;
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
