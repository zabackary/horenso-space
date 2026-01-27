"use client";

import { Drawer } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Trans, useLingui } from "@lingui/react/macro";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Flex,
  Heading,
  IconButton,
  Select,
  Separator,
  VisuallyHidden,
} from "@radix-ui/themes";
import { memo, useEffect, useState } from "react";
import styles from "./calendar.module.css";
import CreateEventCard from "./create-event-card";
import DayCalendar from "./day";
import MonthCalendarRaw from "./month";
import YearCalendarRaw from "./year";

const YearCalendar = memo(YearCalendarRaw);
const MonthCalendar = memo(MonthCalendarRaw);

interface ModePickerProps {
  mode: "year" | "month" | "day";
  setMode: (mode: "year" | "month" | "day") => void;
}

export function ModePicker({ mode, setMode }: ModePickerProps) {
  const { t } = useLingui();
  return (
    <Select.Root
      value={mode}
      onValueChange={(value) => setMode(value as "year" | "month" | "day")}
      size="3"
    >
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="year">
          <Trans>Year</Trans>
        </Select.Item>
        <Select.Item value="month">
          <Trans>Month</Trans>
        </Select.Item>
        <Select.Item value="day">
          <Trans>Day</Trans>
        </Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export interface CalendarProps {
  initialMode: "year" | "month" | "day";
  initialDate: string;
  clubId: string;
  canWrite?: boolean;
}

export default function Calendar({
  initialMode,
  initialDate,
  clubId,
  canWrite = false,
}: CalendarProps) {
  const [mode, setMode] = useState<"year" | "month" | "day">(initialMode);
  const [date, setDate] = useState(() => {
    // Normalize date format, using today's date's less significant parts if missing
    const today = new Date();
    const [year, month, day] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];
    const [initialYear, initialMonth, initialDay] = initialDate.split("-");
    return `${(initialYear || year).toString().padStart(4, "0")}-${(
      initialMonth || month
    )
      .toString()
      .padStart(2, "0")}-${(initialDay || day).toString().padStart(2, "0")}`;
  });

  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    history.replaceState(
      null,
      "",
      `/app/${clubId}/calendar/${
        mode === "year"
          ? date.split("-")[0]
          : mode === "month"
            ? date.split("-").slice(0, 2).join("/")
            : mode === "day"
              ? date.split("-").join("/")
              : ""
      }`,
    );
  }, [date, mode]);

  const handleModeChange = (newMode: "year" | "month" | "day") => {
    setMode(newMode);
  };

  const isSmall = useMediaQuery("(max-width: 600px)");

  const { t } = useLingui();

  return (
    <>
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
          <ModePicker mode={mode} setMode={handleModeChange} />
          <IconButton
            variant={
              date === new Date().toISOString().split("T")[0]
                ? "soft"
                : "outline"
            }
            size="3"
            aria-label={t`Go to today`}
            onClick={() => {
              const today = new Date();
              const year = today.getFullYear().toString().padStart(4, "0");
              const month = (today.getMonth() + 1).toString().padStart(2, "0");
              const day = today.getDate().toString().padStart(2, "0");
              setDate(`${year}-${month}-${day}`);
            }}
          >
            <CalendarIcon />
          </IconButton>
          {(!isSmall || mode === "day") && (
            <>
              <IconButton
                variant="surface"
                size="3"
                onClick={() => {
                  if (mode === "year") {
                    // decrement the year
                    setDate((date) => {
                      const parts = date.split("-");
                      const newYear = (parseInt(parts[0], 10) - 1)
                        .toString()
                        .padStart(4, "0");
                      return `${newYear}-${parts[1]}-${parts[2]}`;
                    });
                  } else if (mode === "month") {
                    // decrement the month
                    setDate((date) => {
                      const parts = date.split("-");
                      let year = parseInt(parts[0], 10);
                      let month = parseInt(parts[1], 10) - 1;
                      if (month < 1) {
                        month = 12;
                        year -= 1;
                      }
                      return `${year.toString().padStart(4, "0")}-${month
                        .toString()
                        .padStart(2, "0")}-${parts[2]}`;
                    });
                  } else if (mode === "day") {
                    // decrement the day
                    setDate((date) => {
                      const currentDate = new Date(date);
                      currentDate.setDate(currentDate.getDate() - 1);
                      const year = currentDate
                        .getFullYear()
                        .toString()
                        .padStart(4, "0");
                      const month = (currentDate.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const day = currentDate
                        .getDate()
                        .toString()
                        .padStart(2, "0");
                      return `${year}-${month}-${day}`;
                    });
                  }
                }}
              >
                <ArrowLeftIcon />
              </IconButton>
              <IconButton
                variant="surface"
                size="3"
                onClick={() => {
                  if (mode === "year") {
                    // increment the year
                    setDate((date) => {
                      const parts = date.split("-");
                      const newYear = (parseInt(parts[0], 10) + 1)
                        .toString()
                        .padStart(4, "0");
                      return `${newYear}-${parts[1]}-${parts[2]}`;
                    });
                  } else if (mode === "month") {
                    // increment the month
                    setDate((date) => {
                      const parts = date.split("-");
                      let year = parseInt(parts[0], 10);
                      let month = parseInt(parts[1], 10) + 1;
                      if (month > 12) {
                        month = 1;
                        year += 1;
                      }
                      return `${year.toString().padStart(4, "0")}-${month
                        .toString()
                        .padStart(2, "0")}-${parts[2]}`;
                    });
                  } else if (mode === "day") {
                    // increment the day
                    setDate((date) => {
                      const currentDate = new Date(date);
                      currentDate.setDate(currentDate.getDate() + 1);
                      const year = currentDate
                        .getFullYear()
                        .toString()
                        .padStart(4, "0");
                      const month = (currentDate.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const day = currentDate
                        .getDate()
                        .toString()
                        .padStart(2, "0");
                      return `${year}-${month}-${day}`;
                    });
                  }
                }}
              >
                <ArrowRightIcon />
              </IconButton>
            </>
          )}
        </Flex>
        <Separator className={styles.divider} />
        {mode === "year" && (
          <YearCalendar
            year={parseInt(date.split("-")[0], 10)}
            onYearChange={(newYear) => {
              setDate((date) => {
                const parts = date.split("-");
                return `${newYear.toString().padStart(4, "0")}-${parts[1]}-${
                  parts[2]
                }`;
              });
            }}
            onSelectMonth={(month) => {
              setMode("month");
              setDate((date) => {
                const parts = date.split("-");
                return `${parts[0]}-${month.toString().padStart(2, "0")}-${
                  parts[2]
                }`;
              });
            }}
            onSelectDate={(date) => {
              setMode("day");
              setDate(date);
            }}
            clubId={clubId}
          />
        )}
        {mode === "month" && (
          <MonthCalendar
            month={date.substring(0, 7)}
            onMonthChange={(month) => {
              setDate((date) => {
                const parts = date.split("-");
                return `${month}-${parts[2]}`;
              });
            }}
            onSelectDate={(date) => {
              setMode("day");
              setDate(date);
            }}
            clubId={clubId}
            onCreateEvent={(date) => {
              setDate(date);
              setCreateDrawerOpen(true);
            }}
            canCreateEvent={canWrite}
            refreshKey={refreshKey.toString()}
          />
        )}
        {mode === "day" && (
          <DayCalendar
            date={date}
            onDateChange={setDate}
            clubId={clubId}
            refreshKey={refreshKey.toString()}
          />
        )}
        {canWrite && (
          <IconButton
            variant="solid"
            size="4"
            aria-label={t`Create event`}
            className={styles.createEventFAB}
            onClick={() => setCreateDrawerOpen(true)}
          >
            <PlusIcon width={36} height={36} />
          </IconButton>
        )}
      </Flex>
      {canWrite && (
        <Drawer.Root
          snapPoints={[420, "100%"]}
          modal={false}
          open={createDrawerOpen}
          onOpenChange={setCreateDrawerOpen}
        >
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content>
              <VisuallyHidden>
                <Drawer.Title>
                  <Trans>Create event</Trans>
                </Drawer.Title>
              </VisuallyHidden>
              <VisuallyHidden>
                <Drawer.Description>
                  <Trans>Create a new event for your club.</Trans>
                </Drawer.Description>
              </VisuallyHidden>
              <CreateEventCard
                clubId={clubId}
                onCancel={() => {
                  setCreateDrawerOpen(false);
                }}
                onCreate={() => {
                  setCreateDrawerOpen(false);
                  setRefreshKey((key) => key + 1);
                }}
              />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </>
  );
}
