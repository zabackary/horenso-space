"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Callout,
  Card,
  Flex,
  Heading,
  RadioCards,
  Select,
  TextField,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { use, useState } from "react";
import type { AbsenceForm } from "@/@types/AbsenceForm";
import AbsenceFormRenderer from "@/components/absence-form-renderer";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/client";

export default function Form({
  clubId,
  events,
  template,
}: {
  clubId: string;
  template: {
    id: string;
    questions: AbsenceForm;
  };
  events: PromiseLike<
    {
      id: string;
      title: string;
      startTime: Date;
      endTime: Date;
    }[]
  >;
}) {
  const { t } = useLingui();
  const eventsData = use(events);
  const [event, setEvent] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [absenceType, setAbsenceType] = useState<"event" | "general" | null>(
    null,
  );
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const supabase = createClient();
    const user = await getProfile(supabase);
    const { data: res, error } = await supabase.from("absence_reports").insert([
      {
        club_id: clubId,
        event_id: event ?? undefined,
        date: date ?? undefined,
        form_id: template.id,
        data: data,
        user_id: user?.id,
      },
    ]);
    if (error) {
      console.error("Error submitting absence report:", error);
      setError(t`Failed to submit absence report. Please try again.`);
    } else {
      redirect(`/app/${clubId}/absences`);
    }
  };

  return (
    <Flex direction="column" gap="2">
      <RadioCards.Root
        value={absenceType}
        onValueChange={(value) => setAbsenceType(value as "event" | "general")}
      >
        <RadioCards.Item value="event">
          <Trans>Event Absence</Trans>
        </RadioCards.Item>
        <RadioCards.Item value="general">
          <Trans>General Absence</Trans>
        </RadioCards.Item>
      </RadioCards.Root>
      {absenceType === "event" && (
        <Card>
          <Heading size="4" as="h4" mb="4">
            <Trans>Event</Trans>
          </Heading>
          <Select.Root
            onValueChange={(value) => setEvent(value)}
            value={event || undefined}
          >
            <Select.Trigger
              placeholder={t`Select event`}
              style={{ width: "100%" }}
            />
            <Select.Content>
              {eventsData.map((event) => (
                <Select.Item key={event.id} value={event.id}>
                  {event.title} - {event.startTime.toDateString()}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Card>
      )}
      {absenceType === "general" && (
        <Card>
          <Heading size="4" as="h4" mb="4">
            <Trans>General Absence</Trans>
          </Heading>
          <TextField.Root
            type="date"
            placeholder={t`Date`}
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </Card>
      )}
      {((absenceType === "event" && event) ||
        (absenceType === "general" && date)) && (
        <AbsenceFormRenderer
          form={template.questions}
          values={data || {}}
          onChange={(values) => setData(values)}
          onSubmit={handleSubmit}
        />
      )}
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CrossCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </Flex>
  );
}
