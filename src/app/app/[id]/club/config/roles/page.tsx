import RolesManager from "@/components/club-config/roles-manager";
import { createClient } from "@/lib/supabase/server";
import { Box, Spinner } from "@radix-ui/themes";
import React from "react";
import { ClubConfigTabNav } from "../layout";

export default async function ClubRolesPage({
  params,
}: PageProps<"/app/[id]/club/config/roles">) {
  // permission check handled in layout
  const { id } = await params;
  const supabase = await createClient();

  const rolesPromise = supabase
    .from("roles")
    .select(
      "id, name, description, permissions, absence_report_reviewer_role, absence_report_approval_required"
    )
    .eq("club_id", id)
    .order("created_at", { ascending: true })
    .then((res) => res.data ?? []);

  return (
    <>
      <ClubConfigTabNav active="roles" clubId={id} />
      <Box p="4">
        <React.Suspense fallback={<Spinner />}>
          <RolesManager clubId={id} rolesPromise={rolesPromise} />
        </React.Suspense>
      </Box>
    </>
  );
}
