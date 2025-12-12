import { notFound } from "next/navigation";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import getReports from "../getReports";
import { AbsencesTabNav } from "../layout";
import AbsenceReportList from "../list";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/all">) {
  const { id } = await params;

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  if (!permissions.includes("canReadAllReports")) {
    notFound();
  }

  const reports = getReports(supabase, id);

  return (
    <>
      <AbsencesTabNav active="all" clubId={id} permissions={permissions} />
      <AbsenceReportList reports={reports} />
    </>
  );
}
