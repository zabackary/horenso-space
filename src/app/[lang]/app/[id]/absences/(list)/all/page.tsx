import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import getReports from "../getReports";
import { AbsencesTabNav } from "../layout";
import AbsenceReportList from "../list";

export default async function Page({
  params,
}: PageProps<"/[lang]/app/[id]/absences/all">) {
  const { id, lang } = await params;
  initLingui(lang);

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  if (!permissions.includes("canReadAllReports")) {
    notFound();
  }

  const reports = getReports(supabase, id);

  return (
    <>
      <AbsencesTabNav active="all" clubId={id} permissions={permissions} />
      <AbsenceReportList
        reports={reports}
        clubId={id}
        linkPathPrefix="/absences/all"
      />
    </>
  );
}
