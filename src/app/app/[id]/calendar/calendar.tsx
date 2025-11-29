"use client";

import { Drawer } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ListBulletIcon,
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
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/virtual";
import { A11y } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import styles from "./calendar.module.css";
import CreateEventCard from "./create-event-card";
import YearCalendar from "./year";

interface ModePickerProps {
  mode: "year" | "month" | "day";
  setMode: (mode: "year" | "month" | "day") => void;
}

export function ModePicker({ mode, setMode }: ModePickerProps) {
  return (
    <Select.Root
      value={mode}
      onValueChange={(value) => setMode(value as "year" | "month" | "day")}
      size="3"
    >
      <Select.Trigger />
      <Select.Content position="popper">
        <Select.Item value="year">Year</Select.Item>
        <Select.Item value="month">Month</Select.Item>
        <Select.Item value="day">Day</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export interface CalendarProps {
  initialMode: "year" | "month" | "day";
  initialDate: string;
  clubId: string;
}

export default function Calendar({
  initialMode,
  initialDate,
  clubId,
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
  const [displayMode, setDisplayMode] = useState<"list" | "grid">("list");

  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);

  const modeSwiperRef = useRef<SwiperRef>(null);

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
      }`
    );
  }, [date, mode]);

  const handleModeChange = (newMode: "year" | "month" | "day") => {
    setMode(newMode);
  };

  useEffect(() => {
    if (modeSwiperRef.current && modeSwiperRef.current.swiper) {
      const targetIndex =
        mode === "year" ? 0 : mode === "month" ? 1 : mode === "day" ? 2 : 0;
      modeSwiperRef.current.swiper.enable();
      modeSwiperRef.current.swiper.slideTo(targetIndex);
      modeSwiperRef.current.swiper.disable();
    }
  }, [mode]);

  const isSmall = useMediaQuery("(max-width: 600px)");

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
            variant={displayMode === "list" ? "soft" : "outline"}
            size="3"
            aria-label="Switch display mode"
            onClick={() => {
              setDisplayMode(displayMode === "list" ? "grid" : "list");
            }}
          >
            <ListBulletIcon />
          </IconButton>
          <IconButton
            variant={
              date === new Date().toISOString().split("T")[0]
                ? "soft"
                : "outline"
            }
            size="3"
            aria-label="Go to today"
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
          {!isSmall && (
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
        <Swiper
          spaceBetween={50}
          initialSlide={
            mode === "year" ? 0 : mode === "month" ? 1 : mode === "day" ? 2 : 0
          }
          ref={modeSwiperRef}
          modules={[A11y]}
          enabled={false}
          className={styles.swiper}
          onSlideChange={(swiper) => {
            const newMode =
              swiper.activeIndex === 0
                ? "year"
                : swiper.activeIndex === 1
                ? "month"
                : swiper.activeIndex === 2
                ? "day"
                : "year";
            setMode(newMode);
          }}
        >
          <SwiperSlide>
            <YearCalendar
              grid={displayMode === "grid"}
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
            />
          </SwiperSlide>
          <SwiperSlide>Month</SwiperSlide>
          <SwiperSlide>
            {/* <Swiper virtual slidesPerView={1} modules={[Virtual]}>
              <SwiperSlide virtualIndex={0}>test 0 </SwiperSlide>
              <SwiperSlide virtualIndex={1}>test 1 </SwiperSlide>
              <SwiperSlide virtualIndex={2}>test 2 </SwiperSlide>
              <SwiperSlide virtualIndex={3}>test 3 </SwiperSlide>
              <SwiperSlide virtualIndex={4}>test 4 </SwiperSlide>
            </Swiper>
            <Flex direction="row" align="center" gap="2">
              <Flex direction="column" align="center" gap="1">
                <Heading size="7" as="h2">
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Heading>
                <Badge size="2" variant="soft">
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: "long",
                  })}
                </Badge>
              </Flex>
            </Flex> */}
          </SwiperSlide>
        </Swiper>
        <IconButton
          variant="solid"
          size="4"
          aria-label="Create event"
          className={styles.createEventFAB}
          onClick={() => setCreateDrawerOpen(true)}
        >
          <PlusIcon />
        </IconButton>
      </Flex>
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
              <Drawer.Title>Create event</Drawer.Title>
            </VisuallyHidden>
            <VisuallyHidden>
              <Drawer.Description>
                Create a new event for your club.
              </Drawer.Description>
            </VisuallyHidden>
            <CreateEventCard
              clubId={clubId}
              onCancel={() => {
                setCreateDrawerOpen(false);
              }}
              initialStartDate={() => {
                return date;
              }}
            />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
