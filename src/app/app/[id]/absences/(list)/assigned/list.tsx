"use client";

import type { Database } from "@/@types/database.types";
import ClickableCard from "@/components/ui/clickable-card";
import { Trans, useLingui } from "@lingui/react/macro";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import ReportDetail from "./detail";
import styles from "./list.module.css";

export type AssignedReport =
  Database["public"]["Functions"]["absence_reports_assigned_get"]["Returns"][number];

export default function AssignedReportsList({
  clubId,
  initialReports,
}: {
  clubId: string;
  initialReports: AssignedReport[];
}) {
  const { t } = useLingui();
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const reports = initialReports;

  const selectedReport = reports.find((r) => r.id === selectedReportId);

  return (
    <Flex className={styles.layout} gap="4">
      <Card className={styles.sidebar}>
        <Flex direction="column" gap="3">
          <Heading size="3">
            <Trans>Assigned Reports</Trans>
          </Heading>
          <Flex direction="column" gap="2">
            {reports.length === 0 && (
              <Text className={styles.empty}>
                <Trans>No reports assigned to you.</Trans>
              </Text>
            )}
            {reports.map((report) => {
              const isSelected = selectedReportId === report.id;
              return (
                <ClickableCard
                  key={report.id}
                  className={`${isSelected ? styles.reportCardSelected : ""}`}
                  onClick={() => setSelectedReportId(report.id)}
                >
                  <Flex direction="column" gap="1">
                    <Text weight="bold">{report.user_name}</Text>
                    <Text size="2">
                      {report.event_name ??
                        new Date(report.report_date).toLocaleDateString() ?? (
                          <Trans>No event</Trans>
                        )}
                    </Text>
                    {report.event_start_time && (
                      <Text size="1" className={styles.reportMeta}>
                        {report.event_start_time ? (
                          new Date(report.event_start_time).toLocaleDateString()
                        ) : (
                          <Trans>No date</Trans>
                        )}
                      </Text>
                    )}
                    {(report.reviews as any[]).length > 0 && (
                      <Text size="1" className={styles.reviewed}>
                        ✓ <Trans>Reviewed</Trans>
                      </Text>
                    )}
                  </Flex>
                </ClickableCard>
              );
            })}
          </Flex>
        </Flex>
      </Card>

      <div className={styles.detailCard}>
        {selectedReport ? (
          <ReportDetail report={selectedReport} clubId={clubId} />
        ) : (
          <Card>
            <Text>
              <Trans>Select a report to review</Trans>
            </Text>
          </Card>
        )}
      </div>
    </Flex>
  );
}
