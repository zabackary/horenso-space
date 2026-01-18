"use client";

import type { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { useLingui } from "@lingui/react/macro";
import { Box, Button, Flex, Grid, Heading, Link } from "@radix-ui/themes";
import type { SupabaseClient } from "@supabase/supabase-js";
import clsx from "clsx";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import styles from "./year.module.css";

export interface YearCalendarProps {
  year: number;
  clubId: string;
  onYearChange?: (year: number) => void;
  onSelectMonth?: (month: number) => void;
  onSelectDate?: (date: string) => void;
}

export default function YearCalendar({
  year,
  onYearChange,
  onSelectMonth,
  onSelectDate,
  clubId,
}: YearCalendarProps) {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 200 }, (_, i) => currentYear - 100 + i);
  }, []);
  const ref = useRef<VirtuosoHandle>(null);
  const scrollingFromCallback = useRef(false);
  const currentlyAutoScrolling = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const index = years.indexOf(year);
      if (index !== -1 && !scrollingFromCallback.current) {
        setIsScrolling(true);
        setTimeout(() => {
          ref.current?.scrollToIndex({
            index,
            align: "start",
            behavior: "smooth",
          });
        }, 0);
      }
    }
  }, [year, years, ref]);
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  return (
    <Virtuoso
      className={clsx(styles.yearCalendar, { [styles.scrolling]: isScrolling })}
      data={years}
      initialTopMostItemIndex={years.indexOf(year)}
      horizontalDirection
      ref={ref}
      itemContent={(_, itemYear) => (
        <MemorizedYearCard
          year={itemYear}
          onSelectMonth={onSelectMonth}
          onSelectDate={onSelectDate}
          supabase={supabase}
          clubId={clubId}
        />
      )}
      rangeChanged={(range) => {
        const firstYear = years[range.startIndex];
        if (
          firstYear !== undefined &&
          firstYear !== year &&
          !currentlyAutoScrolling.current
        ) {
          scrollingFromCallback.current = true;
          onYearChange?.(firstYear);
          setTimeout(() => {
            scrollingFromCallback.current = false;
          }, 0);
        }
      }}
      isScrolling={(scrolling) => {
        if (!scrolling && isScrolling) {
          if (!currentlyAutoScrolling.current) {
            currentlyAutoScrolling.current = true;
          } else {
            currentlyAutoScrolling.current = false;
            setIsScrolling(false);
          }
        }
      }}
    />
  );
}

const MemorizedYearCard = memo(YearCard);

function YearCard({
  year,
  onSelectMonth,
  onSelectDate,
  supabase,
  clubId,
}: {
  year: number;
  onSelectMonth?: (month: number) => void;
  onSelectDate?: (date: string) => void;
  supabase: SupabaseClient<Database>;
  clubId: string;
}) {
  const [highlightDates, setHighlightDates] = useState<string[]>([]);
  useEffect(() => {
    const abortController = new AbortController();
    supabase
      .from("calendar_events")
      .select("start_time, end_time")
      .eq("club_id", clubId)
      .gte("start_time", new Date(year, 0, 0).toISOString())
      .lt("end_time", new Date(year + 1, 0, 0).toISOString())
      .abortSignal(abortController.signal)
      .then(({ data, error }) => {
        if (error) {
          if (!error.message.includes("AbortError"))
            console.error("failed to fetch events to highlight:", error);
          return;
        }
        const dateToISO = (date: Date) => date.toISOString().substring(0, 10);
        setHighlightDates([
          ...new Set(
            (data ?? []).flatMap(({ start_time, end_time }) => {
              const start = new Date(start_time);
              const end = new Date(end_time);
              if (end.getTime() - start.getTime() >= 0) {
                const result = [];
                while (end.getTime() - start.getTime() >= 0) {
                  result.push(dateToISO(start));
                  start.setDate(start.getDate() + 1);
                }
                return result;
              }
              return [];
            }),
          ),
        ]);
      });

    return () => {
      abortController.abort();
    };
  }, [year, supabase]);

  return (
    <Flex p="4" className={styles.yearCard}>
      <Heading size="4">{year}</Heading>
      <Grid
        columns={{
          xs: "2",
          sm: "3",
          md: "4",
        }}
        gap="4"
        mt="4"
        width="100%"
        flexGrow="1"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month, i) => (
          <Box
            key={month}
            className={styles.monthCard}
            onClick={() => {
              if (onSelectMonth) {
                onSelectMonth(month);
              }
            }}
          >
            <Flex direction="column" align="center" justify="center">
              <Heading size="2" mb="2" asChild>
                <Link
                  href={`${year}/${month.toString().padStart(2, "0")}`}
                  onClick={(e) => e.preventDefault()}
                >
                  {new Date(year, month - 1).toLocaleDateString(undefined, {
                    month: "long",
                  })}
                </Link>
              </Heading>
              <MemorizedMonthPreview
                year={year}
                month={month}
                onSelectDate={onSelectDate}
                highlightDates={highlightDates
                  .filter((x) =>
                    x.startsWith(
                      `${year.toString().padStart(4, "0")}-${month
                        .toString()
                        .padStart(2, "0")}`,
                    ),
                  )
                  .map((x) => Number.parseInt(x.substring(8), 10))}
              />
            </Flex>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

const MemorizedMonthPreview = memo(MonthPreview);

function MonthPreview({
  year,
  month,
  highlightDates = [],
  onSelectDate,
}: {
  year: number;
  month: number;
  highlightDates?: number[];
  onSelectDate?: (date: string) => void;
}) {
  // Render a grid of dates for the month
  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [year, month],
  );

  const firstDayOfMonth = useMemo(
    () => new Date(year, month - 1, 1).getDay(),
    [year, month],
  );

  const totalCells = useMemo(() => {
    const lastDayOfMonth = (firstDayOfMonth + daysInMonth) % 7;
    return lastDayOfMonth === 0
      ? daysInMonth + firstDayOfMonth
      : daysInMonth + firstDayOfMonth + (7 - lastDayOfMonth);
  }, [firstDayOfMonth, daysInMonth]);

  const { t } = useLingui();

  return (
    <Grid columns="7" gap="1" width="100%">
      {Array.from({ length: totalCells }, (_, i) => {
        if (i < firstDayOfMonth) {
          return (
            <Box
              key={`dimmed-start-${i}`}
              className={clsx(styles.dayCell, styles.dayCellDimmed)}
            />
          );
        } else if (i >= firstDayOfMonth + daysInMonth) {
          return (
            <Box
              key={`dimmed-end-${i}`}
              className={clsx(styles.dayCell, styles.dayCellDimmed)}
            />
          );
        } else {
          const day = i - firstDayOfMonth + 1;
          return (
            <Button
              variant="ghost"
              className={styles.dayButton}
              title={
                highlightDates.includes(day)
                  ? t`An event is scheduled on this day.`
                  : undefined
              }
              onClick={(e) => {
                if (onSelectDate) {
                  e.stopPropagation();
                  const monthStr = month.toString().padStart(2, "0");
                  const dayStr = day.toString().padStart(2, "0");
                  onSelectDate(`${year}-${monthStr}-${dayStr}`);
                }
              }}
              key={day}
            >
              <Box
                className={clsx(
                  styles.dayCell,
                  highlightDates.includes(day) && styles.dayCellHighlight,
                )}
              >
                {day}
              </Box>
            </Button>
          );
        }
      })}
    </Grid>
  );
}
