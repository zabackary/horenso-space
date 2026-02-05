"use client";

import { ListLoading } from "@/components/loading";
import ClickableCard from "@/components/ui/clickable-card";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { Avatar, Badge, Flex, Text } from "@radix-ui/themes";
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
  const { t, i18n } = useLingui();
  return (
    <Suspense fallback={<ListLoading withHeading={false} cards={true} />}>
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
              <Flex direction="row" gap="2">
                <Avatar
                  size="2"
                  src={report.user.avatarUrl ?? undefined}
                  alt={report.user.fullName}
                  fallback={report.user.fullName.charAt(0).toUpperCase()}
                />
                <Flex direction="column" gap="2">
                  <Flex direction="column" gap="1">
                    <Text weight="bold">
                      {report.event?.name ??
                        (report.date && i18n.date(report.date)) ??
                        "No event"}
                      {/* Show event date if present */}
                      {report.event?.startTime && report.event?.endTime ? (
                        <>
                          {" "}
                          <Badge size="1" color="blue">
                            {i18n.date(report.event.startTime, {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}{" "}
                            -{" "}
                            {i18n.date(report.event.endTime, {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </Badge>
                        </>
                      ) : null}
                    </Text>
                    <Text size="2">
                      <Trans>Submitted by</Trans> {report.user.fullName}
                    </Text>
                    <Text size="1" color="gray">
                      <Trans>
                        Submitted on{" "}
                        {i18n.date(report.submittedAt, {
                          dateStyle: "long",
                          timeStyle: "long",
                        })}
                      </Trans>
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
                      <Flex gap="2">
                        <Badge size="1" color="gray">
                          <Plural
                            value={report.reviews.length}
                            one="# review"
                            other="# reviews"
                          />
                        </Badge>
                        <Badge
                          size="1"
                          color={report.approved ? "green" : "red"}
                        >
                          {report.approved ? (
                            <Trans>Approved</Trans>
                          ) : (
                            <Trans>Rejected</Trans>
                          )}
                        </Badge>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          </ClickableCard>
        ))}
      </Flex>
    </Suspense>
  );
}
