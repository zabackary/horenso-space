"use client";

import { ListLoading } from "@/components/loading";
import ClickableCard from "@/components/ui/clickable-card";
import EmptyState from "@/components/ui/empty-state";
import { gql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import { Suspense, useState } from "react";
import AbsenceReportList from "../../../../absences/(list)/list";
import EventDetailDrawer from "../../../event-detail-drawer";
import styles from "./Day.module.css";

const CalendarDayQuery = gql(`
  query CalendarDay($clubId: UUID!, $date: Date!, $startDate: Datetime!, $endDate: Datetime!) {
    calendarEventsCollection(
      filter: {
        clubId: { eq: $clubId }
        startTime: { gte: $startDate }
        endTime: { lte: $endDate }
      }
      orderBy: {
        startTime: AscNullsLast
      }
    ) {
      edges {
        node {
          id
          title
          startTime
          endTime
          description
          location
          ...EventDetailDrawer
        }
      }
    }

    absenceReportsCollection(
      filter: {
        clubId: { eq: $clubId }
        date: { eq: $date }
      }
    ) {
      edges {
        node {
          id
          ...AbsenceReportCard
        }
      }
    }
  }
`);

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
  createEvent,
  clubId,
  canReadAllReports,
  canWrite = false,
}: DayCalendarProps) {
  const { t } = useLingui();

  const { data, refetch } = useSuspenseQuery(CalendarDayQuery, {
    variables: {
      clubId,
      date,
      startDate: new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString(),
      endDate: new Date(new Date(date).setHours(23, 59, 59, 999)).toISOString(),
    },
  });

  const events =
    data?.calendarEventsCollection?.edges.map((edge) => edge.node) ?? [];
  const reports =
    data?.absenceReportsCollection?.edges.map((edge) => ({
      id: edge.node.id,
      fragment: edge.node,
    })) ?? [];

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventDrawerOpen, setEventDrawerOpen] = useState(false);

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
                    {new Date(event.startTime).toLocaleTimeString()} -{" "}
                    {new Date(event.endTime).toLocaleTimeString()}
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
                      reports={reports}
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

      {selectedEventId &&
        events &&
        selectedEventId !== null &&
        events.find((e) => e.id === selectedEventId) !== undefined && (
          <EventDetailDrawer
            open={eventDrawerOpen}
            onOpenChange={(open) => {
              setEventDrawerOpen(open);
            }}
            event={events.find((e) => e.id === selectedEventId)!}
            clubId={clubId}
            canWrite={canWrite}
            onDelete={() => {
              setEventDrawerOpen(false);
              refetch();
            }}
            onUpdate={() => {
              refetch();
            }}
          />
        )}
    </div>
  );
}

export function DayCalendarSkeleton({ date }: { date?: string }) {
  return (
    <Flex direction="column" className={styles.container}>
      <Flex direction="column" align="center" gap="2" className={styles.header}>
        <Heading size="5" as="h3" align="center">
          {date ? (
            new Date(date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          ) : (
            <Skeleton>Loading...</Skeleton>
          )}
        </Heading>
        <Separator />
      </Flex>
      <Box width="100%" p="4">
        <ListLoading withHeading={false} />
      </Box>
    </Flex>
  );
}
