import { gql } from "@/gql/gql";
import { query } from "@/lib/apollo/server";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ReportDetail from "../../report-detail";

const AbsenceReportAllDetailQuery = gql(`
  query AbsenceReportAllDetail($reportId: UUID!) {
    absenceReportsCollection(
      filter: {
        id: { eq: $reportId }
      }
    ) {
      edges {
        node {
          user {
            id
          }
          ...AbsenceReportDetail
        }
      }
    }
  }
`);

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/all/[reportId]">) {
  const { id, reportId } = await params;
  await initLingui();

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  if (!permissions.includes("canReadAllReports")) {
    notFound();
  }

  // fetch the report
  const report = (
    await query({
      query: AbsenceReportAllDetailQuery,
      variables: {
        reportId: reportId,
      },
    })
  ).data?.absenceReportsCollection?.edges[0]?.node;

  if (!report) {
    notFound();
  }

  return (
    <ReportDetail
      report={report}
      backUrl={`/app/${id}/absences/all`}
      canDelete={permissions.includes("canDeleteAllReports")}
    />
  );
}
