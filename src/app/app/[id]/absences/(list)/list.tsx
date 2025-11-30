"use client";

import { DataList, Flex, Spinner } from "@radix-ui/themes";
import { Suspense, use } from "react";

interface AbsenceReportReview {
  id: string;
  reviewer: {
    userId: string;
    fullName: string;
  };
  comments: string | null;
  accepted: boolean;
  createdAt: string;
}

interface AbsenceReport {
  id: string;
  userName: string;
  reviews: AbsenceReportReview[];
  event: {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
  } | null;
  assignedTo: {
    userId: string;
    fullName: string;
  } | null;
}

export default function AbsenceReportList({
  reports,
}: {
  reports: PromiseLike<AbsenceReport[]>;
}) {
  const reportsData = use(reports);
  return (
    <Suspense fallback={<Spinner />}>
      <DataList.Root>
        {reportsData.map((report) => (
          <DataList.Item key={report.id}>
            <DataList.Label>
              {report.event?.name} - {report.event?.startTime.toDateString()}
            </DataList.Label>
            <DataList.Value>
              <Flex direction="column" gap="2">
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label>Submitted by</DataList.Label>
                    <DataList.Value>{report.userName}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Assigned to</DataList.Label>
                    <DataList.Value>
                      {report.assignedTo
                        ? report.assignedTo.fullName
                        : "Unassigned"}
                    </DataList.Value>
                  </DataList.Item>
                  {report.reviews.map((review) => (
                    <DataList.Item key={review.id}>
                      <DataList.Label>
                        Review by {review.reviewer.fullName}
                      </DataList.Label>
                      <DataList.Value>
                        {review.accepted ? "Accepted" : "Rejected"}
                        {review.comments && ` - Comments: ${review.comments}`}
                      </DataList.Value>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              </Flex>
            </DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Suspense>
  );
}
