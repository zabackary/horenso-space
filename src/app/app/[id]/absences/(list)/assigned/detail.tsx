"use client";

import { submitReview } from "@/actions/reviews";
import AbsenceFormRenderer from "@/components/absence-form-renderer";
import useAbsenceReportStatus from "@/lib/absences/useAbsenceReportStatus";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Card,
  DataList,
  Flex,
  Heading,
  Separator,
  Skeleton,
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
  const { t, i18n } = useLingui();
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

  const approvalStatus = useAbsenceReportStatus(report.id);

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
        {approvalStatus ? (
          <Callout.Root
            color={
              approvalStatus === "approved"
                ? "green"
                : approvalStatus === "rejected"
                  ? "red"
                  : "yellow"
            }
          >
            {approvalStatus === "approved" && (
              <>
                <Callout.Icon>
                  <CheckCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  <Trans>Absence is approved</Trans>
                </Callout.Text>
              </>
            )}
            {approvalStatus === "rejected" && (
              <>
                <Callout.Icon>
                  <CrossCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  <Trans>Absence is rejected</Trans>
                </Callout.Text>
              </>
            )}
            {approvalStatus === "pending" && (
              <Callout.Text>
                <Trans>The report is pending review</Trans>
              </Callout.Text>
            )}
          </Callout.Root>
        ) : (
          <Skeleton>
            <Callout.Root>
              <Callout.Text>
                <Trans>Loading report status...</Trans>
              </Callout.Text>
            </Callout.Root>
          </Skeleton>
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
              placeholder={t`Add comments (optional)`}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
            <Flex gap="2">
              <Button
                color="green"
                onClick={() => handleSubmit(true)}
                loading={isSubmitting}
              >
                <Trans>Accept</Trans>
              </Button>
              <Button
                color="red"
                onClick={() => handleSubmit(false)}
                loading={isSubmitting}
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
