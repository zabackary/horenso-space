"use client";

import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Button,
  Callout,
  Flex,
  Switch,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useId, useState } from "react";

export interface FeedbackFormProps {
  handleClose?: () => void;
}

export default function FeedbackForm({ handleClose }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState("");
  const [isAssociatedWithClub, setIsAssociatedWithClub] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { t } = useLingui();

  const a11yId = useId();

  // examine the url for the club id
  let clubId: string | null = new URL(window.location.href).pathname.split(
    "/"
  )[2];
  // check if the club id is a valid uuid
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(clubId)) {
    clubId = null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("feedback_submissions").insert({
      feedback,
      club_id: isAssociatedWithClub ? clubId : null,
      user_id: (await supabase.auth.getUser()).data.user?.id || null,
    });
    if (error) {
      console.error("Error submitting feedback:", error);
      setError(
        t({
          id: "feedbackForm.submitError",
          message: "Failed to submit feedback. Please try again later.",
        })
      );
    } else {
      handleClose?.();
    }
    setIsSubmitting(false);
  };

  return (
    <Flex direction="column" gap="4" mt="3">
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="3">
          <Flex direction="column" gap="2">
            <Text as="label" size="2" htmlFor={`${a11yId}-feedback-textarea`}>
              <Trans id="feedbackForm.yourFeedback">Your feedback</Trans>
            </Text>
            <Text size="1" color="gray">
              <Trans id="feedbackForm.details">
                Please provide as much detail as possible to help us address
                your issue. A minimum of 15 characters is required.
              </Trans>
            </Text>
            <TextArea
              placeholder="Share your thoughts..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={8}
              required
              id={`${a11yId}-feedback-textarea`}
            />
          </Flex>

          {clubId && (
            <Flex align="center" gap="2">
              <Switch
                checked={isAssociatedWithClub}
                onCheckedChange={setIsAssociatedWithClub}
                id={`${a11yId}-associate-club`}
              />
              <Flex direction="column" gap="1">
                <Text size="2" as="label" htmlFor={`${a11yId}-associate-club`}>
                  <Trans id="feedbackForm.attachClubInfo">
                    Attach this club's information
                  </Trans>
                </Text>
                <Text size="1" color="gray">
                  <Trans id="feedbackForm.attachClubInfoDescription">
                    Sending your club information will help us better understand
                    your problem to resolve it faster.
                  </Trans>
                </Text>
              </Flex>
            </Flex>
          )}

          {error && (
            <Callout.Root color="red">
              <Callout.Icon>
                <CrossCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Flex justify="start" gap="2">
            <Button
              type="submit"
              disabled={feedback.trim().length < 15}
              title={
                feedback.trim().length < 15
                  ? t({
                      id: "feedbackForm.provideMoreDetailedFeedback",
                      message: "Please provide more detailed feedback.",
                    })
                  : undefined
              }
              loading={isSubmitting}
            >
              <Trans id="feedbackForm.sendFeedback">Send feedback</Trans>
            </Button>
            <Button
              variant="soft"
              type="button"
              onClick={() => handleClose?.()}
              disabled={isSubmitting}
            >
              <Trans id="common.cancel">Cancel</Trans>
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
