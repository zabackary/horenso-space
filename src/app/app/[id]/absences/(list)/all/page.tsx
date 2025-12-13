import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import getReports from "../getReports";
import AbsenceReportList from "../list";
import { AbsencesTabNav } from "../tab-nav";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/all">) {
  const { id } = await params;
  await initLingui();

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
