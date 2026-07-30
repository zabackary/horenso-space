"use client";

import { useSuspenseQuery } from "@apollo/client/react";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import AbsenceReportCard from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import PaginationControls from "@/components/ui/pagination-controls";
import { gql } from "@/gql";
import {
  DEFAULT_PAGE_SIZE,
  useCursorPagination,
} from "@/lib/useCursorPagination";

const myReportsQuery = gql(`
  query MyAbsenceReports($clubId: UUID!, $userId: UUID!, $first: Int!, $after: Cursor) {
    absenceReportsCollection(
      filter: {
        clubId: { eq: $clubId }
        userId: { eq: $userId }
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

export function MyReportsList({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  const { t } = useLingui();
  const { after, first, hasPrevious, goToNext, goToPrevious } =
    useCursorPagination(DEFAULT_PAGE_SIZE);
  const { data } = useSuspenseQuery(myReportsQuery, {
    variables: {
      clubId: clubId,
      userId: userId,
      first,
      after,
    },
  });
  const collection = data?.absenceReportsCollection;
  const reports = collection?.edges ?? [];
  const pageInfo = collection?.pageInfo;

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
      <PaginationControls
        hasPrevious={hasPrevious}
        hasNext={pageInfo?.hasNextPage ?? false}
        onPrevious={goToPrevious}
        onNext={() => goToNext(pageInfo?.endCursor)}
      />
    </Flex>
  );
}
