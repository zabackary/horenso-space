import type { Database } from "@/@types/database.types";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AbsencesTabNav } from "../tab-nav";
import AssignedReportsList from "./list";

type AssignedReport =
  Database["public"]["Functions"]["get_assigned_absence_reports"]["Returns"][number];

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/assigned">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  if (!permissions.includes("canWriteReportReview")) {
    notFound();
  }

  const { data: reports, error } = await supabase.rpc(
    "get_assigned_absence_reports",
    {
      p_club_id: id,
    }
  );

  if (error) {
    throw error;
  }

  const reportsList = (reports || []) as AssignedReport[];

  return (
    <>
      <AbsencesTabNav active="assigned" clubId={id} permissions={permissions} />
      <AssignedReportsList clubId={id} initialReports={reportsList} />
    </>
  );
}
