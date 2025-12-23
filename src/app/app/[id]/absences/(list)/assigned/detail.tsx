"use client";

import { submitReview } from "@/actions/reviews";
import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  Button,
  Callout,
  Card,
  DataList,
  Flex,
  Heading,
  Separator,
  Spinner,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { AssignedReport } from "./list";

export default function ReportDetail({
  report,
  clubId,
}: {
  report: AssignedReport;
  clubId: string;
}) {
  const { t } = useLingui();
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reviews = (report.reviews || []) as any[];
  const reportData = report.data as Record<string, any>;

  const [form, setForm] = useState<any>(null);
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
          return;
        }
        setForm(data.questions);
      }
    }
    fetchForm();
    return () => {
      abortController.abort();
    };
  }, [report.form_id, clubId]);

  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  useEffect(() => {
    const abortController = new AbortController();
    async function fetchAcceptedStatus() {
      const supabase = createClient();
      const { data, error } = await supabase
        .rpc("is_report_approved", {
          p_report_id: report.id,
        })
        .abortSignal(abortController.signal);
      if (error) {
        console.error("Failed to fetch accepted status:", error);
        return;
      }
      setIsAccepted(data as boolean);
    }
    fetchAcceptedStatus();
    return () => {
      abortController.abort();
    };
  }, [report.id]);

  const handleSubmit = async (accepted: boolean) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await submitReview(clubId, report.id, accepted, comments.trim() || null);
      setSuccess(true);
      setComments("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <Flex direction="column" gap="4">
        {isAccepted !== null && (
          <Callout.Root color={isAccepted ? "green" : "yellow"}>
            <Callout.Text>
              {isAccepted
                ? t({
                    id: "absences.reportAccepted",
                    message: "This report has been accepted.",
                  })
                : t({
                    id: "absences.reportPending",
                    message: "This report is has not been accepted.",
                  })}
            </Callout.Text>
          </Callout.Root>
        )}

        <Heading size="4">
          <Trans>Report Review</Trans>
        </Heading>

        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        {success && (
          <Callout.Root color="green">
            <Callout.Text>Review submitted successfully</Callout.Text>
          </Callout.Root>
        )}

        <DataList.Root>
          <DataList.Item>
            <DataList.Label>
              <Trans>Submitted by</Trans>
            </DataList.Label>
            <DataList.Value>
              {report.user_name || <Trans>Unknown</Trans>}
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>
              <Trans>Event</Trans>
            </DataList.Label>
            <DataList.Value>
              {report.event_name || <Trans>No event</Trans>}
            </DataList.Value>
          </DataList.Item>

          {report.report_date && (
            <DataList.Item>
              <DataList.Label>
                <Trans>Date</Trans>
              </DataList.Label>
              <DataList.Value>
                {new Date(report.report_date).toLocaleDateString()}
              </DataList.Value>
            </DataList.Item>
          )}

          {report.event_start_time && (
            <DataList.Item>
              <DataList.Label>
                <Trans>Event date</Trans>
              </DataList.Label>
              <DataList.Value>
                {new Date(report.event_start_time).toLocaleString()}
              </DataList.Value>
            </DataList.Item>
          )}

          <DataList.Item>
            <DataList.Label>
              <Trans>Assigned to</Trans>
            </DataList.Label>
            <DataList.Value>
              {report.assigned_to_role_name || <Trans>Unassigned</Trans>}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        <Separator size="4" />

        <div>
          <Heading size="3" mb="2">
            <Trans>Report Details</Trans>
          </Heading>
          {form ? (
            reportData && Object.keys(reportData).length > 0 ? (
              <AbsenceFormRenderer form={form} values={reportData as any} />
            ) : (
              <Text color="gray">
                <Trans>No additional data</Trans>
              </Text>
            )
          ) : (
            <Spinner />
          )}
        </div>

        {reviews.length > 0 && (
          <>
            <Separator size="4" />
            <div>
              <Heading size="3" mb="2">
                <Trans>Previous Reviews</Trans>
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
                          {review.accepted ? (
                            <Trans>Accepted</Trans>
                          ) : (
                            <Trans>Rejected</Trans>
                          )}
                        </Text>
                      </Flex>
                      {review.comments && (
                        <Text size="2">{review.comments}</Text>
                      )}
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

        <Separator size="4" />

        <div>
          <Heading size="3" mb="2">
            <Trans>Add Your Review</Trans>
          </Heading>
          <Flex direction="column" gap="3">
            <TextArea
              placeholder={t({
                id: "absences.commentsPlaceholder",
                message: "Add comments (optional)",
              })}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
            <Flex gap="2">
              <Button
                color="green"
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
              >
                <Trans>Accept</Trans>
              </Button>
              <Button
                color="red"
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
              >
                <Trans>Reject</Trans>
              </Button>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Card>
  );
}
