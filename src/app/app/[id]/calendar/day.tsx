import { ListLoading } from "@/components/loading";
import ClickableCard from "@/components/ui/clickable-card";
import EmptyState from "@/components/ui/empty-state";
import { createClient } from "@/lib/supabase/client";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Suspense, useEffect, useMemo, useState } from "react";
import getReports, { AbsenceReport } from "../absences/(list)/getReports";
import AbsenceReportList from "../absences/(list)/list";
import styles from "./day.module.css";
import EventDetailDrawer from "./event-detail-drawer";

export interface DayCalendarProps {
  date: string;
  onDateChange?: (date: string) => void;
  clubId: string;
  refreshKey?: string;

  createEvent?: () => void;
  canReadAllReports: boolean;
  canWrite?: boolean;
}

export default function DayCalendar({
  date,
  onDateChange,
  createEvent,
  clubId,
  refreshKey,
  canReadAllReports,
  canWrite = false,
}: DayCalendarProps) {
  const { t } = useLingui();
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  const [events, setEvents] = useState<
    | {
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        description?: string;
        location?: string;
      }[]
    | null
  >(null);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventDrawerOpen, setEventDrawerOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchEvents() {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("club_id", clubId)
        .gte("start_time", startOfDay.toISOString())
        .lte("end_time", endOfDay.toISOString())
        .order("start_time", { ascending: true })
        .abortSignal(abortController.signal);

      if (error) {
        if (!error.message.includes("AbortError"))
          console.error("Error fetching events:", error);
      } else {
        setEvents(
          data.map((event) => ({
            id: event.id,
            title: event.title,
            startDate: event.start_time,
            endDate: event.end_time,
            description: event.description || undefined,
            location: event.location || undefined,
          })),
        );
      }
    }

    setEvents(null);
    fetchEvents();

    return () => {
      abortController.abort();
    };
  }, [date, clubId, supabase, refreshKey, refreshTrigger]);

  const [reports, setReports] = useState<AbsenceReport[] | null>(null);
  useEffect(() => {
    if (!date) return;
    const abortController = new AbortController();

    async function fetchReports() {
      const supabase = createClient();
      const reports = await getReports(supabase, {
        clubId,
        date: new Date(date),
      });
      if (abortController.signal.aborted) return;
      setReports(reports);
    }

    setReports(null);
    fetchReports().catch((err) => {
      if (err.name === "AbortError" || err.message.includes("AbortError"))
        return;
      console.error("Error fetching reports:", err);
    });

    return () => {
      abortController.abort();
    };
  }, [date, clubId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Flex direction="column" align="center" gap="2">
          <Heading size="5" as="h3" align="center">
            {new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Heading>
          <Separator />
        </Flex>
      </div>
      <div className={styles.mainContent}>
        <Box width="100%">
          {events === null ? (
            <ListLoading withHeading={false} />
          ) : events.length === 0 ? (
            <EmptyState
              icon={<CalendarIcon />}
              title={t`No events for today.`}
              action={
                createEvent
                  ? {
                      label: t`Add event`,
                      onClick: createEvent,
                    }
                  : undefined
              }
            />
          ) : (
            events.map((event) => (
              <ClickableCard
                key={event.id}
                mb="2"
                onClick={() => {
                  setSelectedEventId(event.id);
                  setEventDrawerOpen(true);
                }}
              >
                <Flex direction="column" gap="2">
                  <Heading size="5">{event.title}</Heading>
                  <Text size="2">
                    {new Date(event.startDate).toLocaleTimeString()} -{" "}
                    {new Date(event.endDate).toLocaleTimeString()}
                  </Text>
                  {event.description && (
                    <Flex direction="row" gap="1" align="start">
                      <TextIcon style={{ flexShrink: 0, marginTop: "2px" }} />
                      <Text size="2">{event.description}</Text>
                    </Flex>
                  )}
                  {event.location && (
                    <Flex direction="row" gap="1" align="start">
                      <GlobeIcon style={{ flexShrink: 0, marginTop: "2px" }} />
                      <Text size="2">{event.location}</Text>
                    </Flex>
                  )}
                </Flex>
              </ClickableCard>
            ))
          )}
        </Box>
      </div>
      {canReadAllReports && (
        <div className={styles.sidebar}>
          <Card className={styles.sidebarCard}>
            <Flex direction="column" gap="3">
              <Heading size="5">
                <Trans>Absence reports for this day</Trans>
              </Heading>
              <Suspense fallback={<ListLoading />}>
                {reports !== null ? (
                  reports.length > 0 ? (
                    <AbsenceReportList
                      reports={Promise.resolve(reports)}
                      clubId={clubId}
                      linkPathPrefix="/absences/all"
                    />
                  ) : (
                    <EmptyState
                      icon={<FileTextIcon />}
                      title={t`No absence reports`}
                      caption={t`There are no reported absences for this day.`}
                    />
                  )
                ) : (
                  <ListLoading withHeading={false} />
                )}
              </Suspense>
            </Flex>
          </Card>
        </div>
      )}

      {selectedEventId && events && (
        <EventDetailDrawer
          open={
            eventDrawerOpen &&
            selectedEventId !== null &&
            events.find((e) => e.id === selectedEventId) !== undefined
          }
          onOpenChange={(open) => {
            setEventDrawerOpen(open);
          }}
          event={events.find((e) => e.id === selectedEventId)!}
          clubId={clubId}
          canWrite={canWrite}
          onDelete={() => {
            setEventDrawerOpen(false);
            setRefreshTrigger((t) => t + 1);
          }}
          onUpdate={() => {
            setRefreshTrigger((t) => t + 1);
          }}
        />
      )}
    </div>
  );
}
