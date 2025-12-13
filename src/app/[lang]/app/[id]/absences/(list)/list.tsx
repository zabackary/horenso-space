"use client";

import { Card, Flex, Spinner, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Suspense, use } from "react";
import { AbsenceReport } from "./getReports";
import styles from "./list.module.css";

type AbsenceReportListProps = {
  reports: PromiseLike<AbsenceReport[]>;
  clubId: string;
  linkPathPrefix: string;
};

export default function AbsenceReportList({
  reports,
  clubId,
  linkPathPrefix,
}: AbsenceReportListProps) {
  const reportsData = use(reports);
  return (
    <Suspense fallback={<Spinner />}>
      {reportsData.length === 0 && <Text>No reports found.</Text>}
      <Flex direction="column" gap="3" width="100%">
        {reportsData.map((report) => (
          <Link
            key={report.id}
            href={`/app/${clubId}${linkPathPrefix}/${report.id}`}
            className={styles.reportCardLink}
          >
            <Card className={styles.reportCard}>
              <Flex direction="column" gap="2">
                <Flex direction="column" gap="1">
                  <Text weight="bold">
                    {report.event?.name ??
                      report.date?.toDateString() ??
                      "No event"}
                  </Text>
                  <Text size="2">Submitted by {report.userName}</Text>
                  <Text size="1" color="gray">
                    {report.event?.startTime.toDateString() ??
                      report.date?.toDateString() ??
                      "No date"}
                  </Text>
                </Flex>
                <Flex justify="between" align="center">
                  <Text size="2">
                    Assigned to:{" "}
                    {report.assignedToRole?.roleName || "Unassigned"}
                  </Text>
                  {report.reviews.length > 0 && (
                    <Text size="1" className={styles.reviewIndicator}>
                      ✓ {report.reviews.length} review
                      {report.reviews.length !== 1 ? "s" : ""}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Card>
          </Link>
        ))}
      </Flex>
    </Suspense>
  );
}
