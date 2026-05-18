"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client/react";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import type { AbsenceReportCardProps } from "@/components/ui/absence-report-card";
import AbsenceReportCard, {
  AbsenceReportCardFragment,
} from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import PaginationControls from "@/components/ui/pagination-controls";

const PAGE_SIZE = 20;

type MyReportsQueryData = {
  absenceReportsCollection?: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{
      node: AbsenceReportCardProps["report"] & { id: string };
    }>;
  } | null;
};

type MyReportsQueryVariables = {
  clubId: string;
  userId: string;
  first: number;
  after: string | null;
};

const myReportsQuery = gql`
  query MyAbsenceReports(
    $clubId: UUID!
    $userId: UUID!
    $first: Int!
    $after: Cursor
  ) {
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
          id
          ...AbsenceReportCard
        }
      }
    }
  }
  ${AbsenceReportCardFragment}
`;

export function MyReportsList({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  const { t } = useLingui();
  const [after, setAfter] = useState<string | null>(null);
  const [previousCursors, setPreviousCursors] = useState<(string | null)[]>([]);

  const { data } = useSuspenseQuery<
    MyReportsQueryData,
    MyReportsQueryVariables
  >(myReportsQuery, {
    variables: {
      clubId,
      userId,
      first: PAGE_SIZE,
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
        label={`Showing ${reports.length} reports on this page`}
        hasPrevious={previousCursors.length > 0}
        hasNext={Boolean(pageInfo?.hasNextPage && pageInfo.endCursor)}
        onPrevious={() => {
          const previous = previousCursors.at(-1) ?? null;
          setPreviousCursors((current) => current.slice(0, -1));
          setAfter(previous);
        }}
        onNext={() => {
          if (!pageInfo?.hasNextPage || !pageInfo.endCursor) return;
          setPreviousCursors((current) => [...current, after]);
          setAfter(pageInfo.endCursor);
        }}
      />
    </Flex>
  );
}
