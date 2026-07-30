import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import RolesView from "./roles-view";

export default async function ClubRolesPage({
  params,
}: PageProps<"/app/[id]/config/roles">) {
  // permission check handled in layout
  const { id } = await params;
  await initLingui();
  const supabase = await createClient();

  const formsPromise = supabase
    .from("absence_report_forms")
    .select("id, name")
    .eq("club_id", id)
    .order("created_at", { ascending: true })
    .then((res) => res.data ?? []);

  return <RolesView clubId={id} formsPromise={formsPromise} />;
}
