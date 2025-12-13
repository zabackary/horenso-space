import InvitesManager from "@/components/club-config/invite";
import { createClient } from "@/lib/supabase/server";
import { Box, Spinner } from "@radix-ui/themes";
import React from "react";
import { ClubConfigTabNav } from "../layout";

export default async function ClubInvitesPage({
  params,
}: PageProps<"/[lang]/app/[id]/club/config/invites">) {
  // permission check handled in layout
  const { id } = await params;
  const supabase = await createClient();

  const invitesPromise = supabase
    .rpc("get_invitations", { club_id: id })
    .then((res) => res.data ?? []);
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
      <ClubConfigTabNav active="invites" clubId={id} />
      <Box p="4">
        <React.Suspense fallback={<Spinner />}>
          <InvitesManager
            clubId={id}
            invitesPromise={invitesPromise}
            rolesPromise={rolesPromise}
          />
        </React.Suspense>
      </Box>
    </>
  );
}
