"use client";

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client/react";
import { useLingui } from "@lingui/react/macro";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import type { AbsenceReportCardProps } from "@/components/ui/absence-report-card";
import AbsenceReportCard from "@/components/ui/absence-report-card";
import EmptyState from "@/components/ui/empty-state";
import PaginationControls from "@/components/ui/pagination-controls";

const PAGE_SIZE = 20;

type AllReportsQueryData = {
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

type AllReportsQueryVariables = {
  clubId: string;
  first: number;
  after: string | null;
};

const allReportsQuery = gql`
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
          id
          date
          createdAt
          assignedToRole: roles {
            name
          }
          reviews: absenceReportReviewsCollection {
            edges {
              node {
                id
              }
            }
          }
          event {
            id
            title
            startTime
            endTime
          }
          user {
            fullName
            avatarUrl
          }
          status: absenceReportsStatusCollection {
            edges {
              node {
                isApproved
              }
            }
          }
        }
      }
    }
  }
`;

export function AllReportsList({ clubId }: { clubId: string }) {
  const { t } = useLingui();
  const [after, setAfter] = useState<string | null>(null);
  const [previousCursors, setPreviousCursors] = useState<(string | null)[]>([]);

  const { data } = useSuspenseQuery<
    AllReportsQueryData,
    AllReportsQueryVariables
  >(allReportsQuery, {
    variables: {
      clubId,
      first: PAGE_SIZE,
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
        label={t`Showing ${reports.length} reports on this page`}
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
