"use client";

import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  Card,
  DataList,
  Flex,
  Heading,
  Separator,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import styles from "./report-detail.module.css";

type Report = {
  id: string;
  user_id: string | null;
  user_name: string | null;
  event_id: string | null;
  event_name: string | null;
  event_start_time: string | null;
  event_end_time: string | null;
  assigned_to_role_id: string | null;
  assigned_to_role_name: string | null;
  reviews: any;
  data: any;
  form_id: string | null;
};

export default function ReportDetail({
  report,
  clubId,
}: {
  report: Report;
  clubId: string;
}) {
  const { i18n } = useLingui();
  const reviews = (report.reviews || []) as any[];
  const reportData = report.data as Record<string, any>;

  const [form, setForm] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchForm() {
      if (report.form_id) {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("absence_report_forms")
          .select("questions")
          .eq("id", report.form_id)
          .abortSignal(abortController.signal)
          .single();
        if (error) {
          console.error("Failed to fetch form:", error);
        } else {
          setForm(data.questions);
        }
      }
      setFormLoading(false);
    }
    fetchForm();
    return () => {
      abortController.abort();
    };
  }, [report.form_id, clubId]);

  return (
    <Flex direction="column" gap="4" flexGrow="1">
      <Heading size="4">
        <Trans id="absences.reportDetails">Report Details</Trans>
      </Heading>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>
            <Trans id="absences.submittedBy">Submitted by</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.user_name || i18n._("common.unknown")}
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>
            <Trans id="absences.event">Event</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.event_name || i18n._("common.noEvent")}
          </DataList.Value>
        </DataList.Item>

        {report.event_start_time && (
          <DataList.Item>
            <DataList.Label>
              <Trans id="absences.eventDate">Event date</Trans>
            </DataList.Label>
            <DataList.Value>
              {new Date(report.event_start_time).toLocaleString()}
            </DataList.Value>
          </DataList.Item>
        )}

        <DataList.Item>
          <DataList.Label>
            <Trans id="absences.assignedTo">Assigned to</Trans>
          </DataList.Label>
          <DataList.Value>
            {report.assigned_to_role_name || i18n._("absences.unassigned")}
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Separator size="4" />

      <div>
        <Heading size="3" mb="2">
          <Trans id="absences.formResponses">Form Responses</Trans>
        </Heading>
        {formLoading ? (
          <Spinner />
        ) : form ? (
          reportData && Object.keys(reportData).length > 0 ? (
            <AbsenceFormRenderer form={form} values={reportData as any} />
          ) : (
            <Text color="gray">
              <Trans id="absences.noData">No additional data</Trans>
            </Text>
          )
        ) : (
          <Text color="gray">
            <Trans id="absences.noForm">
              No form associated with this report
            </Trans>
          </Text>
        )}
      </div>

      {reviews.length > 0 && (
        <>
          <Separator size="4" />
          <div>
            <Heading size="3" mb="2">
              <Trans id="absences.reviews">Reviews</Trans>
            </Heading>
            <Flex direction="column" gap="2">
              {reviews.map((review: any) => (
                <Card key={review.id} className={styles.reviewCard}>
                  <Flex direction="column" gap="2">
                    <Flex justify="between" align="center">
                      <Text weight="bold">{review.reviewer_name}</Text>
                      <Text
                        size="2"
                        color={review.accepted ? "green" : "red"}
                        weight="bold"
                      >
                        {review.accepted
                          ? i18n._("absences.accepted")
                          : i18n._("absences.rejected")}
                      </Text>
                    </Flex>
                    {review.comments && <Text size="2">{review.comments}</Text>}
                    <Text size="1" color="gray">
                      {new Date(review.created_at).toLocaleString()}
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
