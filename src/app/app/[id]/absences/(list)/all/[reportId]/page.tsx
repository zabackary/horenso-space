import { gql } from "@/gql/gql";
import { query } from "@/lib/apollo/server";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportDetail from "../../report-detail";

const AbsenceReportAllDetailQuery = gql(`
  query AbsenceReportAllDetail($reportId: UUID!) {
    absence_reportsCollection(
      filter: {
        id: { eq: $reportId }
      }
    ) {
      edges {
        node {
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
  ).data?.absence_reportsCollection?.edges[0]?.node;

  if (!report) {
    notFound();
  }

  return (
    <Flex direction="column" gap="4" p="4" width="100%">
      <Flex direction="row" align="center" gap="2">
        <IconButton variant="soft" asChild>
          <Link href={`/app/${id}/absences/all`}>
            <ArrowLeftIcon />
          </Link>
        </IconButton>
        <Heading size="4" as="h2">
          <Trans>Report details</Trans>
        </Heading>
      </Flex>
      <ReportDetail report={report} />
    </Flex>
  );
}
