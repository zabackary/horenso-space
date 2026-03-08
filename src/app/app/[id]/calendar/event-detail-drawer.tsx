"use client";

import { deleteCalendarEvent, updateCalendarEvent } from "@/actions/calendar";
import { Drawer } from "@/components/ui/drawer";
import { FragmentType, getFragmentData, gql } from "@/gql";
import { Trans, useLingui } from "@lingui/react/macro";
import { Cross1Icon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  Button,
  Flex,
  IconButton,
  VisuallyHidden,
} from "@radix-ui/themes";
import type React from "react";
import { useCallback, useState } from "react";
import styles from "./create-event-card.module.css";
import EventForm, { type EventFormData } from "./event-form";

export const EventDetailDrawerFragment = gql(`
  fragment EventDetailDrawer on CalendarEvents {
    id
    title
    startTime
    endTime
    description
    location
  }
`);

export interface EventDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: FragmentType<typeof EventDetailDrawerFragment>;
  clubId: string;
  canWrite: boolean;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export default function EventDetailDrawer({
  open,
  onOpenChange,
  event: eventFragment,
  clubId,
  canWrite,
  onDelete,
  onUpdate,
}: EventDetailDrawerProps) {
  const { t } = useLingui();
  const event = getFragmentData(EventDetailDrawerFragment, eventFragment);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Form state - convert event to form data
  const eventToFormData = (event: {
    title: string;
    startTime: string;
    endTime: string;
    location?: string | null;
    description?: string | null;
  }): EventFormData => {
    return {
      title: event.title,
      startDate: new Date(event.startTime).toLocaleDateString("en-CA"),
      startTime: new Date(event.startTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      endDate: new Date(event.endTime).toLocaleDateString("en-CA"),
      endTime: new Date(event.endTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      location: event.location || "",
      notes: event.description || "",
    };
  };
  const [formDataState, setFormDataState] = useState<EventFormData>(
    eventToFormData(event),
  );
  const formData =
    canWrite && isEditing ? formDataState : eventToFormData(event);

  const handleSaveEdit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      setError(null);

      try {
        const startDateTime = new Date(
          `${formData.startDate}T${formData.startTime}:00`,
        ).toISOString();
        const endDateTime = new Date(
          `${formData.endDate}T${formData.endTime}:00`,
        ).toISOString();

        await updateCalendarEvent(clubId, event.id, {
          title: formData.title,
          description: formData.notes || undefined,
          location: formData.location || undefined,
          start_time: startDateTime,
          end_time: endDateTime,
        });

        setIsEditing(false);
        onUpdate?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update event");
      } finally {
        setIsSaving(false);
      }
    },
    [clubId, event.id, formData, onUpdate],
  );

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteCalendarEvent(clubId, event.id);
      onDelete?.();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
    }
  }, [clubId, event.id, onDelete, onOpenChange]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[420, "100%"]}
      modal={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content>
          <VisuallyHidden>
            <Drawer.Title>
              {isEditing ? <Trans>Edit Event</Trans> : event.title}
            </Drawer.Title>
          </VisuallyHidden>
          <VisuallyHidden>
            <Drawer.Description>
              <Trans>Event details for {event.title}</Trans>
            </Drawer.Description>
          </VisuallyHidden>

          <Flex direction="column" gap="2" p="1" asChild>
            <form onSubmit={handleSaveEdit} className={styles["form"]}>
              {/* Header with close button and actions */}
              <Flex
                direction="row"
                gap="2"
                className={styles.buttons}
                align="center"
                justify="between"
              >
                <Drawer.Close asChild>
                  <IconButton variant="soft" size="3">
                    <Cross1Icon />
                  </IconButton>
                </Drawer.Close>

                {!isEditing && (
                  <Flex gap="2">
                    {canWrite && (
                      <>
                        <Button
                          type="button"
                          variant="soft"
                          size="3"
                          onClick={() => {
                            setIsEditing(true);
                            setFormDataState(eventToFormData(event));
                          }}
                        >
                          <Pencil1Icon />
                          <Trans>Edit</Trans>
                        </Button>
                        <Button
                          type="button"
                          variant="soft"
                          color="red"
                          size="3"
                          onClick={() => {
                            setDeleteConfirmOpen(true);
                            onOpenChange(false);
                          }}
                        >
                          <TrashIcon />
                          <Trans>Delete</Trans>
                        </Button>
                      </>
                    )}
                  </Flex>
                )}

                {isEditing && (
                  <Flex gap="2">
                    <Button
                      type="button"
                      variant="soft"
                      size="3"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      <Trans>Cancel</Trans>
                    </Button>
                    <Button type="submit" size="3" loading={isSaving}>
                      <Trans>Save</Trans>
                    </Button>
                  </Flex>
                )}
              </Flex>

              <EventForm
                data={formData}
                onChange={setFormDataState}
                readOnly={!isEditing}
                error={error}
                showTitle
              />
            </form>
          </Flex>
        </Drawer.Content>
      </Drawer.Portal>

      {/* Delete confirmation dialog */}
      <AlertDialog.Root
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
      >
        <AlertDialog.Content>
          <AlertDialog.Title>
            <Trans>Delete event</Trans>
          </AlertDialog.Title>
          <AlertDialog.Description>
            <Trans>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </Trans>
          </AlertDialog.Description>
          <Flex gap="2" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft">
                <Trans>Cancel</Trans>
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action onClick={handleDelete}>
              <Button color="red" variant="solid" loading={isDeleting}>
                <Trans>Delete</Trans>
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Drawer.Root>
  );
}
