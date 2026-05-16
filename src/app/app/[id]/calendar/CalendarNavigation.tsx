"use client";

import { useLingui } from "@lingui/react/macro";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Separator } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import styles from "./CalendarNavigation.module.css";
import { ModePicker } from "./ModePicker";
import useNavigateToDate from "./useNavigateToDate";

export default function CalendarNavigation({ children }: PropsWithChildren) {
  const { t } = useLingui();

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();

  const path = usePathname();
  // Extract the year/month/day from the path
  const segments = path.split("/");
  const pathPrefix = segments
    .slice(0, segments.indexOf("calendar") + 1)
    .join("/");
  const [yearString, monthString, dayString] = segments.slice(
    segments.indexOf("calendar") + 1,
  );

  // The pathname-provided year/month/day
  const year = yearString ? parseInt(yearString) : undefined;
  const month = monthString ? parseInt(monthString) : undefined;
  const day = dayString ? parseInt(dayString) : undefined;
  const mode = day ? "day" : month ? "month" : "year";
  const isToday =
    mode === "year"
      ? year === todayYear
      : mode === "month"
        ? year === todayYear && month === todayMonth
        : year === todayYear && month === todayMonth && day === todayDay;

  // The date we keep on the client, so when we go from a specific view -->
  // general view --> specific view, we can keep the same date
  const [clientYear, setClientYear] = useState(() => year);
  const [clientMonth, setClientMonth] = useState(() => month);
  const [clientDay, setClientDay] = useState(() => day);

  useEffect(() => {
    if (year !== clientYear && year !== undefined) setClientYear(year);
    if (month !== clientMonth && month !== undefined) setClientMonth(month);
    if (day !== clientDay && day !== undefined) setClientDay(day);
  }, [year, month, day]);

  // Navigation
  const navigateToDate = useNavigateToDate();
  const handleModeChange = (newMode: "year" | "month" | "day") => {
    if (newMode === "year") {
      navigateToDate(clientYear ?? todayYear);
    } else if (newMode === "month") {
      navigateToDate(clientYear ?? todayYear, clientMonth ?? todayMonth);
    } else if (newMode === "day") {
      // Check whether the day exists in said month, otherwise fallback to the last day of the month
      let dayToUse = clientDay ?? todayDay;
      const monthToUse = clientMonth ?? todayMonth;
      const yearToUse = clientYear ?? todayYear;
      const lastDayOfMonth = new Date(yearToUse, monthToUse, 0).getDate();
      if (dayToUse > lastDayOfMonth) {
        dayToUse = lastDayOfMonth;
      }
      navigateToDate(
        clientYear ?? todayYear,
        clientMonth ?? todayMonth,
        dayToUse,
      );
    }
  };
  const handleNavigateToday = () => {
    if (mode === "year") {
      navigateToDate(todayYear);
    } else if (mode === "month") {
      navigateToDate(todayYear, todayMonth);
    } else if (mode === "day") {
      navigateToDate(todayYear, todayMonth, todayDay);
    }
  };
  const handleNavigatePrevious = () => {
    if (mode === "year") {
      navigateToDate((clientYear ?? todayYear) - 1);
    } else if (mode === "month") {
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      if (month === 1) {
        navigateToDate(year - 1, 12);
      } else {
        navigateToDate(year, month - 1);
      }
    } else if (mode === "day") {
      const day = clientDay ?? todayDay;
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      if (day === 1) {
        if (month === 1) {
          navigateToDate(year - 1, 12, 31);
        } else {
          const lastDayOfPreviousMonth = new Date(year, month - 1, 0).getDate();
          navigateToDate(year, month - 1, lastDayOfPreviousMonth);
        }
      } else {
        navigateToDate(year, month, day - 1);
      }
    }
  };
  const handleNavigateNext = () => {
    if (mode === "year") {
      navigateToDate((clientYear ?? todayYear) + 1);
    } else if (mode === "month") {
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      if (month === 12) {
        navigateToDate(year + 1, 1);
      } else {
        navigateToDate(year, month + 1);
      }
    } else if (mode === "day") {
      const day = clientDay ?? todayDay;
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      if (day === lastDayOfMonth) {
        if (month === 12) {
          navigateToDate(year + 1, 1, 1);
        } else {
          navigateToDate(year, month + 1, 1);
        }
      } else {
        navigateToDate(year, month, day + 1);
      }
    }
  };

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      height="100%"
      className={styles.container}
    >
      <Flex direction="row" align="center" width="100%" p="4" gap="2">
        <Heading size="6" as="h1" className={styles.header}>
          Calendar
        </Heading>
        <ModePicker
          mode={day ? "day" : month ? "month" : "year"}
          setMode={handleModeChange}
        />
        <IconButton
          variant={isToday ? "soft" : "outline"}
          size="3"
          aria-label={t`Go to today`}
          onClick={handleNavigateToday}
        >
          <CalendarIcon />
        </IconButton>
        <IconButton variant="surface" size="3" onClick={handleNavigatePrevious}>
          <ArrowLeftIcon />
        </IconButton>
        <IconButton variant="surface" size="3" onClick={handleNavigateNext}>
          <ArrowRightIcon />
        </IconButton>
      </Flex>
      <Separator className={styles.divider} />
      {children}
    </Flex>
  );
}
