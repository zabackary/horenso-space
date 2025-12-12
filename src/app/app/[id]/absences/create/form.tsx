"use client";

import { DEFAULT_ABSENCE_FORM } from "@/@types/AbsenceForm";
import AbsenceFormRenderer from "@/components/absence-form-renderer";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  Flex,
  Heading,
  RadioCards,
  Select,
  TextField,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { use, useState } from "react";

export default function Form({
  clubId,
  events,
}: {
  clubId: string;
  events: PromiseLike<
    {
      id: string;
      title: string;
      startTime: Date;
      endTime: Date;
    }[]
  >;
}) {
  const eventsData = use(events);
  const [event, setEvent] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [absenceType, setAbsenceType] = useState<"event" | "general" | null>(
    null
  );
  const [data, setData] = useState<any>(null);

  const handleSubmit = async () => {
    console.log("Submitting absence report for event:", event);
    console.log("Form data:", data);
    const supabase = createClient();
    const user = await getProfile(supabase);
    const { data: res, error } = await supabase.from("absence_reports").insert([
      {
        club_id: clubId,
        event_id: event,
        data: data,
        user_id: user!.id,
      },
    ]);
    if (error) {
      console.error("Error submitting absence report:", error);
      alert("Failed to submit absence report. Please try again.");
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
        <RadioCards.Item value="event">Event Absence</RadioCards.Item>
        <RadioCards.Item value="general">General Absence</RadioCards.Item>
      </RadioCards.Root>
      {absenceType === "event" && (
        <Card>
          <Heading size="4" as="h4" mb="4">
            Event
          </Heading>
          <Select.Root
            onValueChange={(value) => setEvent(value)}
            value={event || undefined}
          >
            <Select.Trigger
              placeholder="Select event..."
              style={{ width: "100%" }}
            />
            <Select.Content>
              {eventsData.map((event, index) => (
                <Select.Item key={index} value={event.id}>
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
            General Absence
          </Heading>
          <TextField.Root
            type="date"
            placeholder="Date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </Card>
      )}
      {((absenceType === "event" && event) ||
        (absenceType === "general" && date)) && (
        <AbsenceFormRenderer
          form={DEFAULT_ABSENCE_FORM}
          onChange={(values) => setData(values)}
          onSubmit={handleSubmit}
        />
      )}
    </Flex>
  );
}
