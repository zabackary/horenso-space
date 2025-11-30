import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import getProfile from "@/lib/auth/getProfile";
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
  const profile = await getProfile(supabase);

  const reports = getReports(supabase, id, profile!.id);

  return (
    <>
      <AbsencesTabNav active="my" clubId={id} permissions={permissions} />
      <AbsenceReportList reports={reports} />
    </>
  );
}
