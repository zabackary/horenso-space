"use client";

import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  BookmarkFilledIcon,
  CalendarIcon,
  Cross1Icon,
  GlobeIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  IconButton,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import type React from "react";
import { useState } from "react";
import styles from "./create-event-card.module.css";

export interface CreateEventCardProps {
  clubId: string;
  withPadding?: boolean;
  onCancel?: () => void;
  onCreate?: (eventId: string) => void;
}

export default function CreateEventCard({
  clubId,
  withPadding,
  onCancel,
  onCreate,
}: CreateEventCardProps) {
  const { t } = useLingui();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
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

      const user = (await getProfile(supabase))!;

      const { data } = await supabase
        .from("calendar_events")
        .insert({
          title,
          club_id: clubId,
          start_time: new Date(start).toUTCString(),
          end_time: new Date(end).toUTCString(),
          created_by: user.id,
          location: location ?? undefined,
          description: notes,
        })
        .throwOnError()
        .select("id")
        .single();
      if (onCreate && data) {
        onCreate(data.id);
      }
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openNativeDateTimePicker = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.showPicker();
  };

  return (
    <Flex direction="column" gap="2" p={withPadding ? "1" : "0"} asChild>
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <Flex
          direction="row"
          gap="2"
          className={styles.buttons}
          align="center"
          justify="between"
        >
          {onCancel && (
            <IconButton
              type="button"
              size="3"
              variant="soft"
              onClick={onCancel}
              disabled={loading}
            >
              <Cross1Icon />
            </IconButton>
          )}
          <Button type="submit" size="3" loading={loading}>
            <BookmarkFilledIcon />
            <Trans>Save</Trans>
          </Button>
        </Flex>
        <TextField.Root
          placeholder={t`New event name`}
          size="3"
          variant="soft"
          className={styles.title}
          name="title"
          ref={(input) => {
            if (input) {
              setTimeout(() => input.focus(), 0);
            }
          }}
          required
        />
        <Flex direction="row" gap="2">
          <Box className={styles["row-icon"]}>
            <CalendarIcon />
          </Box>
          <Grid columns="auto" gap="2" flexGrow="1">
            <TextField.Root
              placeholder={t`Start date and time`}
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              name="start"
              onClick={openNativeDateTimePicker}
              required
            />
            <TextField.Root
              placeholder={t`End date and time`}
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              min={start}
              name="end"
              onClick={openNativeDateTimePicker}
              required
            />
          </Grid>
        </Flex>
        <Flex direction="row" gap="2">
          <Box className={styles["row-icon"]}>
            <GlobeIcon />
          </Box>
          <TextField.Root
            placeholder={t`Location`}
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
            placeholder={t`Notes`}
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
      </form>
    </Flex>
  );
}
