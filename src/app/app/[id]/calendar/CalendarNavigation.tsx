"use client";

import { useLingui } from "@lingui/react/macro";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Box, Flex, Heading, IconButton, Separator } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./CalendarNavigation.module.css";
import { ModePicker } from "./ModePicker";
import { YearCalendarSkeleton } from "./[year]/Year";
import { MonthCalendarSkeleton } from "./[year]/[month]/Month";
import { DayCalendarSkeleton } from "./[year]/[month]/[day]/Day";
import useNavigateToDate, { buildCalendarPath } from "./useNavigateToDate";

const SWIPE_NAVIGATION_TRANSITION_DURATION = 200;
const SWIPE_VELOCITY_SAMPLE_DURATION = 100; // ms
const SWIPE_VELOCITY_THRESHOLD = 500; // pixels per second

const AddEventDrawers = dynamic(() => import("./AddEventDrawers"));

export default function CalendarNavigation({
  children,
  clubId,
  canWrite = false,
}: PropsWithChildren<{
  clubId: string;
  canWrite?: boolean;
}>) {
  const { t } = useLingui();

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;
  const todayDay = new Date().getDate();

  const path = usePathname();
  // Extract the year/month/day from the path
  const segments = path.split("/");
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

  // MARK: Navigation
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
  const previousNavigateTarget: [number, number?, number?] = useMemo(() => {
    if (mode === "year") {
      return [(clientYear ?? todayYear) - 1];
    } else if (mode === "month") {
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      if (month === 1) {
        return [year - 1, 12];
      } else {
        return [year, month - 1];
      }
    } else if (mode === "day") {
      const day = clientDay ?? todayDay;
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      if (day === 1) {
        if (month === 1) {
          return [year - 1, 12, 31];
        } else {
          const lastDayOfPreviousMonth = new Date(year, month - 1, 0).getDate();
          return [year, month - 1, lastDayOfPreviousMonth];
        }
      } else {
        return [year, month, day - 1];
      }
    }
    return [todayYear];
  }, [
    mode,
    clientYear,
    clientMonth,
    clientDay,
    todayYear,
    todayMonth,
    todayDay,
  ]);
  const nextNavigateTarget: [number, number?, number?] = useMemo(() => {
    if (mode === "year") {
      return [(clientYear ?? todayYear) + 1];
    } else if (mode === "month") {
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      if (month === 12) {
        return [year + 1, 1];
      } else {
        return [year, month + 1];
      }
    } else if (mode === "day") {
      const day = clientDay ?? todayDay;
      const month = clientMonth ?? todayMonth;
      const year = clientYear ?? todayYear;
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      if (day === lastDayOfMonth) {
        if (month === 12) {
          return [year + 1, 1, 1];
        } else {
          return [year, month + 1, 1];
        }
      } else {
        return [year, month, day + 1];
      }
    }
    return [todayYear];
  }, [
    mode,
    clientYear,
    clientMonth,
    clientDay,
    todayYear,
    todayMonth,
    todayDay,
  ]);
  const handleNavigatePrevious = () => {
    navigateToDate(...previousNavigateTarget);
  };
  const handleNavigateNext = () => {
    navigateToDate(...nextNavigateTarget);
  };

  // MARK: Swipe navigation for mobile
  const router = useRouter();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<
    "next" | "previous" | null
  >(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextContentPreviewRef = useRef<HTMLDivElement>(null);
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };
  const touchXHistoryRef = useRef<{ x: number; timestamp: number }[]>([]);
  const handleTouchMove = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const touchCurrentX = e.touches[0].clientX;
    const deltaX = touchCurrentX - touchStartX;
    const touchCurrentY = e.touches[0].clientY;
    const deltaY = touchCurrentY - (touchStartY ?? 0);

    // If the user is scrolling vertically more than they are swiping horizontally
    // and we haven't already determined the swipe direction, don't do anything
    // this allows users to scroll the page without triggering the swipe navigation
    if (
      Math.abs(deltaY) * 2 > Math.abs(deltaX) && // we really want to make sure it's a vertical scroll, so we use a multiplier
      swipeDirection === null
    ) {
      return;
    }

    touchXHistoryRef.current.push({
      x: touchCurrentX,
      timestamp: performance.now(),
    });
    touchXHistoryRef.current = touchXHistoryRef.current.filter(
      (entry) =>
        performance.now() - entry.timestamp < SWIPE_VELOCITY_SAMPLE_DURATION,
    );

    e.preventDefault(); // Prevent vertical scrolling while swiping horizontally

    document.body.style.setProperty("overscroll-behavior", "none");

    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${deltaX}px, 0, 0)`;
    }
    if (nextContentPreviewRef.current) {
      // Move the preview into view
      const direction = deltaX > 0 ? -1 : 1;
      nextContentPreviewRef.current.style.transform = `translate3d(${deltaX + direction * window.innerWidth}px, 0, 0)`;
    }
    // Set swipe direction for preview (opposite of the swipe direction)
    if (deltaX > 0) {
      if (swipeDirection !== "previous") {
        setSwipeDirection("previous");
        router.prefetch(buildCalendarPath(path, ...previousNavigateTarget));
      }
    } else if (deltaX < 0) {
      if (swipeDirection !== "next") {
        setSwipeDirection("next");
        router.prefetch(buildCalendarPath(path, ...nextNavigateTarget));
      }
    }
  };
  const targetSwipeNavigateData = useRef<
    | {
        path: string;
        startTime: number;
      }
    | undefined
  >(undefined);
  const tryFinishSwipeNavigation = useCallback(() => {
    if (targetSwipeNavigateData.current?.path !== path) return;
    if (
      Date.now() - (targetSwipeNavigateData.current.startTime ?? 0) <
      SWIPE_NAVIGATION_TRANSITION_DURATION
    ) {
      // If the route has changed but the transition hasn't finished, wait the remaining transition duration before finishing
      setTimeout(
        () => {
          tryFinishSwipeNavigation();
        },
        SWIPE_NAVIGATION_TRANSITION_DURATION -
          (Date.now() - (targetSwipeNavigateData.current.startTime ?? 0)),
      );
      return;
    }
    if (contentRef.current) {
      contentRef.current.style.transform = "translateX(0)";
    }
    if (nextContentPreviewRef.current) {
      // Get it off the screen.
      // Probably not needed since the component will unmount, but just in case
      nextContentPreviewRef.current.style.transform = `translateX(${window.innerWidth}px)`;
    }
    setSwipeDirection(null);
  }, [path]);
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    setTouchStartX(null);

    // Approximate velocity by looking at the last touch movement
    let touchXVelocity = 0;
    if (touchXHistoryRef.current.length > 1) {
      const firstEntry = touchXHistoryRef.current[0];
      const lastEntry =
        touchXHistoryRef.current[touchXHistoryRef.current.length - 1];
      const deltaXForVelocity = lastEntry.x - firstEntry.x;
      const deltaTimeForVelocity =
        (lastEntry.timestamp - firstEntry.timestamp) / 1000; // convert to seconds
      touchXVelocity = deltaXForVelocity / deltaTimeForVelocity; // pixels per second
    }

    document.body.style.setProperty("overscroll-behavior", "auto");

    const threshold = window.innerWidth / 2; // Minimum distance for a swipe
    if (
      (Math.abs(deltaX) > threshold ||
        Math.abs(touchXVelocity) > SWIPE_VELOCITY_THRESHOLD) &&
      swipeDirection !== null
    ) {
      if (deltaX > 0) {
        handleNavigatePrevious();
      } else if (deltaX < 0) {
        handleNavigateNext();
      }
      // Animate the content sliding out and preview sliding in before the route changes
      if (contentRef.current && nextContentPreviewRef.current) {
        const direction = deltaX > 0 ? 1 : -1;
        contentRef.current.animate(
          [
            { transform: `translate3d(${deltaX}px, 0, 0)` },
            {
              transform: `translate3d(${direction * window.innerWidth}px, 0, 0)`,
            },
          ],
          { duration: 200, easing: "ease-out" },
        );
        nextContentPreviewRef.current.animate(
          [
            {
              transform: `translate3d(${deltaX + -direction * window.innerWidth}px, 0, 0)`,
            },
            { transform: "translate3d(0, 0, 0)" },
          ],
          { duration: 200, easing: "ease-out" },
        );
        contentRef.current.style.transform = `translate3d(${direction * window.innerWidth}px, 0, 0)`;
        nextContentPreviewRef.current.style.transform = "translate3d(0, 0, 0)";

        targetSwipeNavigateData.current = {
          path: buildCalendarPath(
            path,
            ...(deltaX > 0 ? previousNavigateTarget : nextNavigateTarget),
          ),
          startTime: Date.now(),
        };
      }
    } else if (swipeDirection !== null) {
      // We cancel the swipe navigation and animate everything back to the original position
      if (contentRef.current) {
        // Animate back to the original position
        contentRef.current.animate(
          [
            { transform: `translate3d(${deltaX}px, 0, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          { duration: 200, easing: "ease-out" },
        );
        contentRef.current.style.transform = "translate3d(0, 0, 0)";
      }
      if (nextContentPreviewRef.current) {
        // Move the preview back off-screen
        const direction = deltaX > 0 ? -1 : 1;
        nextContentPreviewRef.current.animate(
          [
            {
              transform: `translate3d(${deltaX + direction * window.innerWidth}px, 0, 0)`,
            },
            {
              transform: `translate3d(${direction * window.innerWidth}px, 0, 0)`,
            },
          ],
          { duration: 200, easing: "ease-out" },
        );
        nextContentPreviewRef.current.style.transform = `translate3d(${direction * window.innerWidth}px, 0, 0)`;
        setTimeout(() => {
          // Remove the preview after the animation
          setSwipeDirection(null);
        }, 200);
      }
    }
  };
  const setContentWrapperRef = (el: HTMLDivElement | null) => {
    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchmove", handleTouchMove, { passive: false });
      el.addEventListener("touchend", handleTouchEnd, { passive: true });
      return () => {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      };
    }
  };
  useEffect(() => {
    tryFinishSwipeNavigation();
  }, [path, tryFinishSwipeNavigation]);

  const searchParams = useSearchParams();
  const [createDrawerOpen, setCreateDrawerOpen] = useState(
    () => searchParams.get("create") === "true",
  );

  // MARK: Render
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
      <Box
        className={styles.contentWrapper}
        style={{
          touchAction: swipeDirection !== null ? "none" : "auto",
        }}
        ref={setContentWrapperRef}
      >
        <Box flexGrow="1" className={styles.content} ref={contentRef}>
          {children}
        </Box>
        {swipeDirection !== null && (
          <Box
            className={styles.nextContentPreview}
            ref={nextContentPreviewRef}
          >
            {mode === "year" ? (
              <YearCalendarSkeleton
                date={
                  swipeDirection === "next"
                    ? String(nextNavigateTarget[0]).padStart(4, "0")
                    : String(previousNavigateTarget[0]).padStart(4, "0")
                }
              />
            ) : mode === "month" ? (
              <MonthCalendarSkeleton
                date={
                  swipeDirection === "next"
                    ? `${String(nextNavigateTarget[0]).padStart(4, "0")}-${String(nextNavigateTarget[1] ?? todayMonth).padStart(2, "0")}`
                    : `${String(previousNavigateTarget[0]).padStart(4, "0")}-${String(previousNavigateTarget[1] ?? todayMonth).padStart(2, "0")}`
                }
              />
            ) : (
              <DayCalendarSkeleton
                date={
                  swipeDirection === "next"
                    ? `${String(nextNavigateTarget[0]).padStart(4, "0")}-${String(nextNavigateTarget[1] ?? todayMonth).padStart(2, "0")}-${String(nextNavigateTarget[2] ?? todayDay).padStart(2, "0")}`
                    : `${String(previousNavigateTarget[0]).padStart(4, "0")}-${String(previousNavigateTarget[1] ?? todayMonth).padStart(2, "0")}-${String(previousNavigateTarget[2] ?? todayDay).padStart(2, "0")}`
                }
              />
            )}
          </Box>
        )}
      </Box>
      {canWrite && (
        <>
          <IconButton
            className={styles.createEventFAB}
            aria-label={t`Create event`}
            onClick={() => setCreateDrawerOpen(true)}
          >
            <PlusIcon width="28" height="28" />
          </IconButton>
          <AddEventDrawers
            clubId={clubId}
            createDrawerOpen={createDrawerOpen}
            setCreateDrawerOpen={setCreateDrawerOpen}
          />
        </>
      )}
    </Flex>
  );
}
