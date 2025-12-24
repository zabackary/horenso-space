import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";
import RolesView from "./roles-view";

export default async function ClubRolesPage({
  params,
}: PageProps<"/app/[id]/config/roles">) {
  // permission check handled in layout
  const { id } = await params;
  await initLingui();
  const supabase = await createClient();

  const rolesPromise = supabase
    .from("roles")
    .select(
      "id, name, description, permissions, absence_report_reviewer_role, absence_report_approval_required, absence_report_form"
    )
    .eq("club_id", id)
    .order("created_at", { ascending: true })
    .then((res) => res.data ?? []);

  const formsPromise = supabase
    .from("absence_report_forms")
    .select("id, name")
    .eq("club_id", id)
    .order("created_at", { ascending: true })
    .then((res) => res.data ?? []);

  return (
    <Box p="4">
      <RolesView
        clubId={id}
        rolesPromise={rolesPromise}
        formsPromise={formsPromise}
      />
    </Box>
  );
}
