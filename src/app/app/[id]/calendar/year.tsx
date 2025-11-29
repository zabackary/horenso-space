"use client";

import { memo, useEffect, useMemo, useRef } from "react";

import { A11y, Virtual } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import "swiper/css";
import "swiper/css/virtual";

import clsx from "clsx";
import styles from "./year.module.css";

export interface YearCalendarProps {
  grid: boolean;
  year: number;
  onYearChange?: (year: number) => void;
  onSelectMonth?: (month: number) => void;
  onSelectDate?: (date: string) => void;
}

export default function YearCalendar({
  grid,
  year,
  onYearChange,
  onSelectMonth,
  onSelectDate,
}: YearCalendarProps) {
  const ref = useRef<SwiperRef>(null);
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 200 }, (_, i) => currentYear - 100 + i);
  }, []);
  useEffect(() => {
    if (ref.current && ref.current.swiper) {
      const index = years.indexOf(year);
      if (index !== -1) {
        ref.current.swiper.slideTo(index);
      }
    }
  }, [year, years]);

  return (
    <Swiper
      virtual
      slidesPerView={1}
      modules={[Virtual, A11y]}
      initialSlide={years.indexOf(year) ?? 0}
      onSlideChange={(swiper) => {
        if (onYearChange) {
          onYearChange(years[swiper.activeIndex]);
        }
      }}
      direction="vertical"
      className={styles.swiper}
      ref={ref}
    >
      {years.map((year, index) => (
        <SwiperSlide key={year} virtualIndex={index} className={styles.slide}>
          <MemorizedYearCard
            key={year}
            year={year}
            grid={grid}
            onSelectMonth={onSelectMonth}
            onSelectDate={onSelectDate}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const MemorizedYearCard = memo(YearCard);

function YearCard({
  year,
  grid,
  onSelectMonth,
  onSelectDate,
}: {
  year: number;
  grid: boolean;
  onSelectMonth?: (month: number) => void;
  onSelectDate?: (date: string) => void;
}) {
  return (
    <Flex p="4" className={styles.yearCard}>
      <Heading size="4">{year}</Heading>
      {grid ? (
        <Grid columns="4" gap="4" mt="4" width="100%" flexGrow="1">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
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
                <Heading size="2" mb="2">
                  {new Date(year, month - 1).toLocaleDateString(undefined, {
                    month: "long",
                  })}
                </Heading>
                <MemorizedMonthPreview
                  year={year}
                  month={month}
                  onSelectDate={onSelectDate}
                />
              </Flex>
            </Box>
          ))}
        </Grid>
      ) : (
        " (list view to be implemented)"
      )}
    </Flex>
  );
}

const MemorizedMonthPreview = memo(MonthPreview);

function MonthPreview({
  year,
  month,
  onSelectDate,
}: {
  year: number;
  month: number;
  onSelectDate?: (date: string) => void;
}) {
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
            <Box
              key={day}
              className={styles.dayCell}
              onClick={(e) => {
                console.log(onSelectDate);
                if (onSelectDate) {
                  e.stopPropagation();
                  const monthStr = month.toString().padStart(2, "0");
                  const dayStr = day.toString().padStart(2, "0");
                  onSelectDate(`${year}-${monthStr}-${dayStr}`);
                }
              }}
            >
              {day}
            </Box>
          );
        }
      })}
    </Grid>
  );
}
