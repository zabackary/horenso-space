"use client";

import AbsenceReportCard from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import { gql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

const allReportsQuery = gql(`
  query AllAbsenceReports($clubId: UUID!) {
    absenceReportsCollection(
      filter: {
        clubId: { eq: $clubId }
      }
      orderBy: { createdAt: DescNullsFirst }
      offset: 0
    ) {
      edges {
        node {
          id,
          ...AbsenceReportCard
        }
      }
    }
  }
`);

export function AllReportsList({ clubId }: { clubId: string }) {
  const { t } = useLingui();
  const { data } = useSuspenseQuery(allReportsQuery, {
    variables: {
      clubId: clubId,
    },
  });
  const reports = data?.absenceReportsCollection?.edges ?? [];

  return reports.length <= 0 ? (
    <EmptyState icon={<FileTextIcon />} title={t`No absence reports`} />
  ) : (
    <Flex direction="column" gap="3" width="100%">
      {reports.map((report) => (
        <AbsenceReportCard
          key={report.node.id}
          report={report.node}
          href={`/app/${clubId}/absences/all/${report.node.id}`}
        />
      ))}
    </Flex>
  );
}
