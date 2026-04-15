"use client";

import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  BookmarkFilledIcon,
  Cross1Icon,
  DownloadIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import type React from "react";
import { useState } from "react";
import styles from "./create-event-card.module.css";
import EventForm, { type EventFormData } from "./event-form";

export interface CreateEventCardProps {
  clubId: string;
  withPadding?: boolean;
  onCancel?: () => void;
  onCreate?: (eventId: string) => void;
  onCSVImport?: () => void;
}

export default function CreateEventCard({
  clubId,
  withPadding,
  onCancel,
  onCreate,
  onCSVImport,
}: CreateEventCardProps) {
  const { t } = useLingui();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const userId = (await supabase.auth.getClaims()).data?.claims.sub;
      if (!userId) {
        setError(
          t`You may be signed out. Please refresh the page and sign in again.`,
        );
        return;
      }

      const startDateTime = new Date(
        `${formData.startDate}T${formData.startTime}:00`,
      ).toISOString();
      const endDateTime = new Date(
        `${formData.endDate}T${formData.endTime}:00`,
      ).toISOString();

      const { data } = await supabase
        .from("calendar_events")
        .insert({
          title: formData.title,
          club_id: clubId,
          start_time: startDateTime,
          end_time: endDateTime,
          created_by: userId,
          location: formData.location || undefined,
          description: formData.notes || undefined,
        })
        .throwOnError()
        .select("id")
        .single();

      if (onCreate && data) {
        onCreate(data.id);
      }
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
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
          <Flex direction="row" gap="2">
            {onCSVImport && (
              <Button
                type="button"
                size="3"
                variant="soft"
                onClick={onCSVImport}
              >
                <DownloadIcon />
                <Trans>Import from CSV</Trans>
              </Button>
            )}
            <Button type="submit" size="3" loading={loading}>
              <BookmarkFilledIcon />
              <Trans>Save</Trans>
            </Button>
          </Flex>
        </Flex>

        <EventForm data={formData} onChange={setFormData} error={error} />
      </form>
    </Flex>
  );
}
