"use client";

import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { createClient } from "@/lib/supabase/client";
import { Trans } from "@lingui/react/macro";
import {
  Badge,
  Card,
  DataList,
  Flex,
  Heading,
  Separator,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { AbsenceReport } from "./getReports";

export default function ReportDetail({
  report,
  clubId,
}: {
  report: AbsenceReport;
  clubId: string;
}) {
  const [form, setForm] = useState<any>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchForm() {
      const supabase = createClient();
      // Get the form ID and responses associated with this report
      let reportData: Record<string, any> | null = null;
      const { data: reportRes, error: reportError } = await supabase
        .from("absence_reports")
        .select("data, form_id")
        .eq("id", report.id)
        .abortSignal(abortController.signal)
        .single();
      if (reportError) {
        throw reportError;
      }
      if (reportRes.form_id) {
        setReportData(reportRes.data);
        // Fetch the form structure
        const { data, error } = await supabase
          .from("absence_report_forms")
          .select("questions")
          .eq("id", reportRes.form_id)
          .abortSignal(abortController.signal)
          .single();
        if (error) {
          throw error;
        } else {
          setForm(data.questions);
        }
      } else {
        setForm(null);
      }
    }
    setFormLoading(true);
    fetchForm()
      .catch((err) => {
        if (err.name === "AbortError" || err.message.includes("AbortError"))
          return;
        console.error("Error fetching form:", err);
      })
      .finally(() => {
        setFormLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [report.id, clubId]);

  return (
    <Flex direction="column" gap="4" flexGrow="1">
      <Heading size="4" as="h3">
        <Trans>Report Details</Trans>
      </Heading>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>
            <Trans>Submitted by</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.userName || <Trans>Unknown</Trans>}
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>
            <Trans>Event</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.event?.name || <Trans>No event</Trans>}
          </DataList.Value>
        </DataList.Item>

        {report.event?.startTime && (
          <DataList.Item>
            <DataList.Label>
              <Trans>Event date</Trans>
            </DataList.Label>
            <DataList.Value>
              {new Date(report.event.startTime).toLocaleString()}
            </DataList.Value>
          </DataList.Item>
        )}

        <DataList.Item>
          <DataList.Label>
            <Trans>Assigned to</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.assignedToRole?.roleName || <Trans>Unassigned</Trans>}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Separator size="4" />

      <div>
        <Heading size="3" mb="2" as="h4">
          <Trans>Form Responses</Trans>
        </Heading>
        {formLoading ? (
          <Spinner />
        ) : form ? (
          reportData && Object.keys(reportData).length > 0 ? (
            <AbsenceFormRenderer form={form} values={reportData as any} />
          ) : (
            <Text color="gray">
              <Trans>No additional data</Trans>
            </Text>
          )
        ) : (
          <Text color="gray">
            <Trans>No form associated with this report</Trans>
          </Text>
        )}
      </div>

      {report.reviews.length > 0 && (
        <>
          <Separator size="4" />
          <div>
            <Heading size="3" mb="2" as="h4">
              <Trans>Reviews</Trans>
            </Heading>
            <Flex direction="column" gap="2">
              {report.reviews.map((review) => (
                <Card key={review.id}>
                  <Flex direction="column" gap="2">
                    <Flex justify="between" align="center">
                      <Text weight="bold">{review.reviewer.fullName}</Text>
                      <Badge size="2" color={review.accepted ? "green" : "red"}>
                        {review.accepted ? (
                          <Trans>Accepted</Trans>
                        ) : (
                          <Trans>Rejected</Trans>
                        )}
                      </Badge>
                    </Flex>
                    {review.comments && <Text size="2">{review.comments}</Text>}
                    <Text size="1" color="gray">
                      {new Date(review.createdAt).toLocaleString()}
                    </Text>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </div>
        </>
      )}
    </Flex>
  );
}
