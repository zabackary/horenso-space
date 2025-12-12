"use client";

import { submitReview } from "@/actions/reviews";
import AbsenceFormRenderer from "@/components/absence-form-renderer";
import { createClient } from "@/lib/supabase/client";
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
        <Heading size="4">Report Review</Heading>

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
            <DataList.Label>Submitted by</DataList.Label>
            <DataList.Value>{report.user_name || "Unknown"}</DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label>Event</DataList.Label>
            <DataList.Value>{report.event_name || "No event"}</DataList.Value>
          </DataList.Item>

          {report.event_start_time && (
            <DataList.Item>
              <DataList.Label>Event date</DataList.Label>
              <DataList.Value>
                {new Date(report.event_start_time).toLocaleString()}
              </DataList.Value>
            </DataList.Item>
          )}

          <DataList.Item>
            <DataList.Label>Assigned to</DataList.Label>
            <DataList.Value>
              {report.assigned_to_role_name || "Unassigned"}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        <Separator size="4" />

        <div>
          <Heading size="3" mb="2">
            Report Details
          </Heading>
          {form ? (
            reportData && Object.keys(reportData).length > 0 ? (
              <AbsenceFormRenderer form={form} values={reportData as any} />
            ) : (
              <Text color="gray">No additional data</Text>
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
                Previous Reviews
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
                          {review.accepted ? "Accepted" : "Rejected"}
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
            Add Your Review
          </Heading>
          <Flex direction="column" gap="3">
            <TextArea
              placeholder="Add comments (optional)"
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
                Accept
              </Button>
              <Button
                color="red"
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
              >
                Reject
              </Button>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </Card>
  );
}
