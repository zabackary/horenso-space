"use client";

import { useSuspenseQuery } from "@apollo/client/react";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import AbsenceReportCard from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import PaginationControls from "@/components/ui/pagination-controls";
import { gql } from "@/gql";
import { useCursorPagination } from "@/lib/useCursorPagination";

const PAGE_SIZE = 20;

const allReportsQuery = gql(`
  query AllAbsenceReports($clubId: UUID!, $first: Int!, $after: Cursor) {
    absenceReportsCollection(
      filter: {
        clubId: { eq: $clubId }
      }
      orderBy: { createdAt: DescNullsFirst }
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
  const { after, first, hasPrevious, goToNext, goToPrevious } =
    useCursorPagination(PAGE_SIZE);
  const { data } = useSuspenseQuery(allReportsQuery, {
    variables: {
      clubId: clubId,
      first,
      after,
    },
  });
  const collection = data?.absenceReportsCollection;
  const reports = collection?.edges ?? [];
  const pageInfo = collection?.pageInfo;

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
      <PaginationControls
        hasPrevious={hasPrevious}
        hasNext={pageInfo?.hasNextPage ?? false}
        onPrevious={goToPrevious}
        onNext={() => goToNext(pageInfo?.endCursor)}
      />
    </Flex>
  );
}
