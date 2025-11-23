"use client";

import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeftIcon,
  CalendarIcon,
  GlobeIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Heading,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./create-event-card.module.css";

export interface CreateEventCardProps {
  clubId: string;
}

export default function CreateEventCard({ clubId }: CreateEventCardProps) {
  const router = useRouter();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (endDate === "") {
      setEndDate(e.target.value);
    }
  };
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      const supabase = createClient();
      const formData = new FormData(e.target as HTMLFormElement);
      const title = formData.get("title") as string;
      const location = formData.get("location") as string;
      const notes = formData.get("notes") as string;

      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      const user = (await getProfile(supabase))!;

      const { data } = await supabase
        .from("calendar_events")
        .insert({
          title,
          club_id: clubId,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          created_by: user.id,
          location: location ?? undefined,
          description: notes,
        })
        .throwOnError()
        .select("id")
        .single();
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="2" asChild>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <Flex direction="row" align="center" gap="2">
          <Button
            className={styles["close-button"]}
            variant="soft"
            size="2"
            onClick={handleBack}
            type="button"
          >
            <ArrowLeftIcon /> Back
          </Button>
          <Heading size="3">Create event</Heading>
        </Flex>
        <TextField.Root
          placeholder="Event Name"
          size="3"
          name="title"
          required
        />
        <Flex direction="row" gap="2">
          <Box className={styles["row-icon"]}>
            <CalendarIcon />
          </Box>
          <Grid columns="auto auto" gap="2" flexGrow="1">
            <TextField.Root
              placeholder="Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              name="startDate"
              required
            />
            <TextField.Root
              placeholder="Date"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              name="startTime"
              required
            />
            <TextField.Root
              placeholder="Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              name="endDate"
              required
            />
            <TextField.Root
              placeholder="Date"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={startDate === endDate ? startTime : undefined}
              name="endTime"
              required
            />
          </Grid>
        </Flex>
        <Flex direction="row" gap="2">
          <Box className={styles["row-icon"]}>
            <GlobeIcon />
          </Box>
          <TextField.Root
            placeholder="Location"
            size="2"
            className={styles["location-textfield"]}
            name="location"
          />
        </Flex>
        <Flex direction="row" gap="2">
          <Box className={styles["row-icon"]}>
            <TextIcon />
          </Box>
          <TextArea
            placeholder="Notes"
            className={styles["notes-textarea"]}
            size="2"
            name="notes"
          />
        </Flex>
        {error && (
          <Callout.Root>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Button type="submit" size="3" className={styles["save-button"]}>
          Save
        </Button>
      </form>
    </Flex>
  );
}
