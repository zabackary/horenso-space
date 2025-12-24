"use client";

import ClickableCard from "@/components/ui/clickable-card";
import { Plural, Trans } from "@lingui/react/macro";
import { Badge, Flex, Spinner, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Suspense, use } from "react";
import { AbsenceReport } from "./getReports";

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
      {reportsData.length === 0 && (
        <Text>
          <Trans>No reports found.</Trans>
        </Text>
      )}
      <Flex direction="column" gap="3" width="100%">
        {reportsData.map((report) => (
          <ClickableCard asChild key={report.id}>
            <Link
              key={report.id}
              href={`/app/${clubId}${linkPathPrefix}/${report.id}`}
            >
              <Flex direction="column" gap="2">
                <Flex direction="column" gap="1">
                  <Text weight="bold">
                    {report.event?.name ??
                      report.date?.toDateString() ??
                      "No event"}
                  </Text>
                  <Text size="2">
                    <Trans>Submitted by</Trans> {report.userName}
                  </Text>
                  <Text size="1" color="gray">
                    {report.event?.startTime.toDateString() ??
                      report.date?.toDateString() ??
                      "No date"}
                  </Text>
                </Flex>
                <Flex justify="between" align="center">
                  <Text size="2">
                    <Trans>Assigned to</Trans>{" "}
                    {report.assignedToRole?.roleName || (
                      <Trans>Unassigned</Trans>
                    )}
                  </Text>
                  {report.reviews.length > 0 && (
                    <Badge size="1" color="gray">
                      <Plural
                        value={report.reviews.length}
                        one="# review"
                        other="# reviews"
                      />
                    </Badge>
                  )}
                </Flex>
              </Flex>
            </Link>
          </ClickableCard>
        ))}
      </Flex>
    </Suspense>
  );
}
