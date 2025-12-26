import { Box } from "@radix-ui/themes";
import InvitesManager from "@/components/club-config/invite";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";

export default async function ClubInvitesPage({
  params,
}: PageProps<"/app/[id]/config/invites">) {
  // permission check handled in layout
  const { id } = await params;
  await initLingui();
  const supabase = await createClient();

  const invitesPromise = supabase
    .rpc("get_invitations", { club_id: id })
    .then((res) => res.data ?? []);
  const rolesPromise = supabase
    .from("roles")
    .select(
      "id, name, description, permissions, absence_report_reviewer_role, absence_report_approval_required",
    )
    .eq("club_id", id)
    .order("created_at", { ascending: true })
    .then((res) => res.data ?? []);

  return (
    <Box p="4">
      <InvitesManager
        clubId={id}
        invitesPromise={invitesPromise}
        rolesPromise={rolesPromise}
      />
    </Box>
  );
}
