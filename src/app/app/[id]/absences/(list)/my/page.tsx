import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import getReports from "../getReports";
import AbsenceReportList from "../list";
import { AbsencesTabNav } from "../tab-nav";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/my">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);
  const profile = await getProfile(supabase);

  const reports = getReports(supabase, id, profile!.id);

  return (
    <>
      <AbsencesTabNav active="my" clubId={id} permissions={permissions} />
      <AbsenceReportList
        reports={reports}
        clubId={id}
        linkPathPrefix="/absences/my"
      />
    </>
  );
}
