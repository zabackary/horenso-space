import { gql } from "@/gql/gql";
import { query } from "@/lib/apollo/server";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ReportDetail from "../../report-detail";

const AbsenceReportMyDetailQuery = gql(`
  query AbsenceReportMyDetail($reportId: UUID!) {
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
}: PageProps<"/app/[id]/absences/my/[reportId]">) {
  const { id, reportId } = await params;
  await initLingui();

  // fetch the report
  const report = (
    await query({
      query: AbsenceReportMyDetailQuery,
      variables: {
        reportId: reportId,
      },
    })
  ).data?.absenceReportsCollection?.edges[0]?.node;

  if (!report) {
    notFound();
  }

  const client = await createClient();

  const userId = await client.auth.getUser().then((res) => res.data.user?.id);

  const { permissions } = await getPermissionsForClub(client, id);

  return (
    <ReportDetail
      report={report}
      backUrl={`/app/${id}/absences/my`}
      canDelete={
        (permissions.includes("canDeleteOwnReport") &&
          report.user?.id === userId) ||
        permissions.includes("canDeleteAllReports")
      }
    />
  );
}
