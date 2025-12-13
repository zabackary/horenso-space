import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import getReports from "../getReports";
import { AbsencesTabNav } from "../layout";
import AbsenceReportList from "../list";

export default async function Page({
  params,
}: PageProps<"/[lang]/app/[id]/absences/my">) {
  const { id, lang } = await params;
  initLingui(lang);

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
