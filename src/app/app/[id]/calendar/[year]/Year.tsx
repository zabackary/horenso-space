"use client";

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link as RadixLink,
  Skeleton,
} from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { memo, useMemo } from "react";
import useNavigateToDate from "../useNavigateToDate";
import styles from "./Year.module.css";

export function YearCalendar({ date }: { date: string }) {
  const year = Number.parseInt(date, 10);
  const navigateToDate = useNavigateToDate();
  return (
    <Flex p="4" className={styles.yearCard}>
      <Heading size="5" as="h3" align="center">
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
        })}
      </Heading>
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
              navigateToDate(year, month);
            }}
          >
            <Flex direction="column" align="center" justify="center">
              <Heading size="2" mb="2" asChild>
                <RadixLink asChild>
                  <Link
                    href={`${date}/${month.toString().padStart(2, "0")}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {new Date(year, month - 1).toLocaleDateString(undefined, {
                      month: "long",
                    })}
                  </Link>
                </RadixLink>
              </Heading>
              <MemorizedMonthPreview year={year} month={month} />
            </Flex>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

export function YearCalendarSkeleton({ date }: { date?: string }) {
  return (
    <Flex p="4" className={styles.yearCard}>
      <Heading size="5" as="h3" align="center">
        {date ? (
          new Date(date).toLocaleDateString(undefined, {
            year: "numeric",
          })
        ) : (
          <Skeleton>Loading...</Skeleton>
        )}
      </Heading>
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
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <Box key={month} className={styles.monthCard}>
            <Flex direction="column" align="center" justify="center">
              <Skeleton>
                <Heading size="2" mb="2" asChild>
                  <RadixLink asChild>
                    <span>
                      {new Date(0, month - 1).toLocaleDateString(undefined, {
                        month: "long",
                      })}
                    </span>
                  </RadixLink>
                </Heading>
              </Skeleton>
              <Skeleton height="80px" width="100%" />
            </Flex>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

const MemorizedMonthPreview = memo(MonthPreview);

function MonthPreview({ year, month }: { year: number; month: number }) {
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

  const navigateToDate = useNavigateToDate();

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
              onClick={(e) => {
                e.stopPropagation();
                navigateToDate(year, month, day);
              }}
              key={day}
            >
              <Box className={styles.dayCell}>{day}</Box>
            </Button>
          );
        }
      })}
    </Grid>
  );
}
