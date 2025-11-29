"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";

import { A11y, Virtual } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { Box, Button, Flex, Grid, Heading } from "@radix-ui/themes";
import "swiper/css";
import "swiper/css/virtual";

import { Database } from "@/@types/database.types";
import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import clsx from "clsx";
import styles from "./month.module.css";

export interface MonthCalendarProps {
  grid: boolean;
  month: string;
  clubId: string;
  onMonthChange?: (month: string) => void;
  onSelectDate?: (date: string) => void;
  onCreateEvent?: (date: string) => void;
  canCreateEvent?: boolean;

  refreshKey?: string;
}

export default function MonthCalendar({
  grid: _grid,
  month,
  onMonthChange,
  onSelectDate,
  onCreateEvent,
  canCreateEvent,
  clubId,

  refreshKey,
}: MonthCalendarProps) {
  const ref = useRef<SwiperRef>(null);
  const months = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 200 }, (_, i) => {
      const year = currentYear - 100 + i;
      return Array.from(
        { length: 12 },
        (_, i) =>
          `${year.toString().padStart(4, "0")}-${(i + 1)
            .toString()
            .padStart(2, "0")}`
      );
    }).flat();
  }, []);
  useEffect(() => {
    if (ref.current && ref.current.swiper) {
      const index = months.indexOf(month);
      if (index !== -1) {
        ref.current.swiper.slideTo(index);
      }
    }
  }, [month, months]);
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  return (
    <Swiper
      virtual
      slidesPerView={1}
      modules={[Virtual, A11y]}
      initialSlide={months.indexOf(month) ?? 0}
      onSlideChange={(swiper) => {
        if (onMonthChange) {
          onMonthChange(months[swiper.activeIndex]);
        }
      }}
      direction="horizontal"
      className={styles.swiper}
      ref={ref}
    >
      {months.map((month, index) => (
        <SwiperSlide key={month} virtualIndex={index} className={styles.slide}>
          <MemorizedMonthCard
            key={month}
            year={Number.parseInt(month.substring(0, 4), 10)}
            month={Number.parseInt(month.substring(5, 7), 10)}
            onSelectDate={onSelectDate}
            supabase={supabase}
            clubId={clubId}
            onCreateEvent={onCreateEvent}
            canCreateEvent={canCreateEvent}
            refreshKey={refreshKey}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const MemorizedMonthCard = memo(MonthCard);

function MonthCard({
  year,
  month,
  onSelectDate,
  onCreateEvent,
  supabase,
  clubId,
  canCreateEvent,
  refreshKey,
}: {
  year: number;
  month: number;
  highlightDates?: number[];
  onSelectDate?: (date: string) => void;
  onCreateEvent?: (date: string) => void;
  supabase: SupabaseClient<Database>;
  clubId: string;
  canCreateEvent?: boolean;
  refreshKey?: string;
}) {
  const [highlightDates, setHighlightDates] = useState<
    { date: number; title: string; id: string }[]
  >([]);
  useEffect(() => {
    const abortController = new AbortController();
    supabase
      .from("calendar_events")
      .select("start_time, end_time, title, id")
      .eq("club_id", clubId)
      .gte("start_time", new Date(year, month - 1, 0).toISOString())
      .lt("end_time", new Date(year, month, 0).toISOString())
      .abortSignal(abortController.signal)
      .then(({ data, error }) => {
        if (error) {
          if (!error.message.includes("AbortError"))
            console.error("failed to fetch events:", error);
          return;
        }
        setHighlightDates([
          ...new Set(
            (data ?? []).flatMap(({ start_time, end_time, title, id }) => {
              const start = new Date(start_time);
              const end = new Date(end_time);
              if (end.getTime() - start.getTime() >= 0) {
                const result = [];
                while (end.getTime() - start.getTime() >= 0) {
                  result.push({
                    date: start.getDate(),
                    title,
                    id,
                  });
                  start.setDate(start.getDate() + 1);
                }
                return result;
              }
              return [];
            })
          ),
        ]);
      });

    return () => {
      abortController.abort();
    };
  }, [year, supabase, refreshKey]);

  // Render a grid of dates for the month
  const daysInMonth = useMemo(
    () => new Date(year, month, 0).getDate(),
    [year, month]
  );

  const firstDayOfMonth = useMemo(
    () => new Date(year, month - 1, 1).getDay(),
    [year, month]
  );

  const totalCells = useMemo(() => {
    const lastDayOfMonth = (firstDayOfMonth + daysInMonth) % 7;
    return lastDayOfMonth === 0
      ? daysInMonth + firstDayOfMonth
      : daysInMonth + firstDayOfMonth + (7 - lastDayOfMonth);
  }, [firstDayOfMonth, daysInMonth]);

  return (
    <Flex direction="column" className={styles.monthCard}>
      <Heading size="5" as="h3">
        {new Date(year, month - 1).toLocaleDateString(undefined, {
          month: "long",
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
            const highlights = highlightDates.filter((x) => x.date === day);
            return (
              <Box
                key={day}
                className={clsx(
                  styles.dayCell,
                  highlights.length > 0 && styles.dayCellHighlight
                )}
                onClick={(e) => {
                  if (onSelectDate) {
                    e.stopPropagation();
                    const monthStr = month.toString().padStart(2, "0");
                    const dayStr = day.toString().padStart(2, "0");
                    onSelectDate(`${year}-${monthStr}-${dayStr}`);
                  }
                }}
              >
                <Heading size="5" as="h4">
                  {day}
                </Heading>
                {highlights.length > 0 ? (
                  highlights.map(({ title, id }) => (
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
                          `${year.toString().padStart(4, "0")}-${month
                            .toString()
                            .padStart(2, "0")}-${day
                            .toString()
                            .padStart(2, "0")}`
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
