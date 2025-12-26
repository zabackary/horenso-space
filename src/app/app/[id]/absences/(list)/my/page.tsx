import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import getReports from "../getReports";
import AbsenceReportList from "../list";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/my">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const reports = getProfile(supabase).then((profile) =>
    getReports(supabase, id, profile!.id),
  );

  return (
    <AbsenceReportList
      reports={reports}
      clubId={id}
      linkPathPrefix="/absences/my"
    />
  );
}
