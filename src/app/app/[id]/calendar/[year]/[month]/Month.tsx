"use client";

import { gql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Box, Button, Flex, Grid, Heading } from "@radix-ui/themes";
import clsx from "clsx";
import { useMemo } from "react";
import useNavigateToDate from "../../useNavigateToDate";
import styles from "./Month.module.css";

const CalendarMonthQuery = gql(`
  query CalendarMonth($clubId: UUID!, $startDate: Datetime!, $endDate: Datetime!) {
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
        }
      }
    }
  }
`);

export default function MonthCalendar({
  date,
  onCreateEvent,
  clubId,
  canCreateEvent,
}: {
  date: string;
  onCreateEvent?: (date: string) => void;
  clubId: string;
  canCreateEvent?: boolean;
  refreshKey?: string;
}) {
  const today = useMemo(() => {
    return (new Date().toISOString().split("T")[0]);
  }, []);

  const { data } = useSuspenseQuery(CalendarMonthQuery, {
    variables: {
      clubId,
      startDate: new Date(new Date(date).setDate(1)).toISOString(),
      endDate: new Date(
        new Date(date).getFullYear(),
        new Date(date).getMonth() + 1,
        0,
      ).toISOString(),
    },
  });

  // Map days to events
  const dateMap = useMemo(() => {
    const dateMap: Record<
      number,
      { title: string; id: string; startTime: string; endTime: string }[]
    > = {};
    (data?.calendarEventsCollection?.edges ?? []).forEach(({ node }) => {
      const startDate = new Date(node.startTime).getDate();
      const endDate = new Date(node.endTime).getDate();
      for (let d = startDate; d <= endDate; d++) {
        const key = new Date(node.startTime).getDate();
        if (!dateMap[key]) {
          dateMap[key] = [];
        }
        dateMap[key].push(node);
      }
    });
    return dateMap;
  }, [data]);

  // Render a grid of dates for the month
  const daysInMonth = useMemo(() => {
    const [year, month] = date.split("-").map((x) => Number.parseInt(x, 10));
    return new Date(year, month, 0).getDate();
  }, [date]);
  const firstWeekdayOfMonth = useMemo(() => {
    const [year, month] = date.split("-").map((x) => Number.parseInt(x, 10));
    return new Date(year, month - 1, 1).getDay();
  }, [date]);
  const totalCells = useMemo(() => {
    const lastDayOfMonth = (firstWeekdayOfMonth + daysInMonth) % 7;
    return lastDayOfMonth === 0
      ? daysInMonth + firstWeekdayOfMonth
      : daysInMonth + firstWeekdayOfMonth + (7 - lastDayOfMonth);
  }, [firstWeekdayOfMonth, daysInMonth]);

  const navigateToDate = useNavigateToDate();

  return (
    <Flex direction="column" className={styles.monthCard}>
      <Heading size="5" as="h3" align="center">
        {new Date(date).toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        })}
      </Heading>
      <Grid
        columns="7"
        rows="5"
        gap="1"
        p="2"
        width="100%"
        className={styles.monthGrid}
      >
        {Array.from({ length: totalCells }, (_, i) => {
          if (i < firstWeekdayOfMonth) {
            return (
              <Box
                key={`dimmed-start-${i}`}
                className={clsx(styles.dayCell, styles.dayCellDimmed)}
              />
            );
          } else if (i >= firstWeekdayOfMonth + daysInMonth) {
            return (
              <Box
                key={`dimmed-end-${i}`}
                className={clsx(styles.dayCell, styles.dayCellDimmed)}
              />
            );
          } else {
            const day = i - firstWeekdayOfMonth + 1;
            const events = dateMap[day] ?? [];
            return (
              <Box
                key={day}
                className={clsx(
                  styles.dayCell,
                  events.length > 0 && styles.dayCellHighlight,
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToDate(
                    date.split("-").map((x) => Number.parseInt(x, 10))[0],
                    date.split("-").map((x) => Number.parseInt(x, 10))[1],
                    day,
                  );
                }}
              >
                <Heading size="5" as="h4" className={today === `${date}-${day.toString().padStart(2, "0")}` ? styles.today : ""}>
                  {day}
                </Heading>
                {events.length > 0 ? (
                  events.map(({ title, id }) => (
                    <Box key={id} className={styles.dayCellEvent}>
                      {title}
                    </Box>
                  ))
                ) : canCreateEvent ? (
                  <Button
                    className={styles.dayCellCreate}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onCreateEvent) {
                        onCreateEvent(
                          `${date}-${day.toString().padStart(2, "0")}`,
                        );
                      }
                    }}
                  >
                    Create event
                  </Button>
                ) : null}
              </Box>
            );
          }
        })}
      </Grid>
    </Flex>
  );
}
