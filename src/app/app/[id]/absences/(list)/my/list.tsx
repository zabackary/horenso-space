"use client";

import AbsenceReportCard from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import { gql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";

const myReportsQuery = gql(`
  query MyAbsenceReports($clubId: UUID!, $userId: UUID!) {
    absenceReportsCollection(
      filter: {
        clubId: { eq: $clubId }
        userId: { eq: $userId }
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

export function MyReportsList({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  const { t } = useLingui();
  const { data } = useSuspenseQuery(myReportsQuery, {
    variables: {
      clubId: clubId,
      userId: userId,
    },
  });
  const reports = data?.absenceReportsCollection?.edges ?? [];

  return reports.length <= 0 ? (
    <EmptyState
      icon={<FileTextIcon />}
      title={t`You don't have any absence reports`}
    />
  ) : (
    <Flex direction="column" gap="3" width="100%">
      {reports.map((report) => (
        <AbsenceReportCard
          key={report.node.id}
          report={report.node}
          href={`/app/${clubId}/absences/my/${report.node.id}`}
        />
      ))}
    </Flex>
  );
}
