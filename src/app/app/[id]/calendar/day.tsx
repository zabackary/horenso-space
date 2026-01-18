import { createClient } from "@/lib/supabase/client";
import { Trans } from "@lingui/react/macro";
import { GlobeIcon, TextIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";

export interface DayCalendarProps {
  date: string;
  onDateChange?: (date: string) => void;
  clubId: string;
  canCreateEvent?: boolean;
  refreshKey?: string;
}

export default function DayCalendar({
  date,
  onDateChange,
  clubId,
  refreshKey,
}: DayCalendarProps) {
  const supabase = useMemo(() => {
    return createClient();
  }, []);

  const [events, setEvents] = useState<
    {
      id: string;
      title: string;
      startDate: string;
      endDate: string;
      description?: string;
      location?: string;
    }[]
  >([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchEvents() {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("club_id", clubId)
        .gte("start_time", startOfDay.toISOString())
        .lte("end_time", endOfDay.toISOString())
        .order("start_time", { ascending: true })
        .abortSignal(abortController.signal);

      if (error) {
        if (!error.message.includes("AbortError"))
          console.error("Error fetching events:", error);
      } else {
        setEvents(
          data.map((event) => ({
            id: event.id,
            title: event.title,
            startDate: event.start_time,
            endDate: event.end_time,
            description: event.description || undefined,
            location: event.location || undefined,
          })),
        );
      }
    }

    fetchEvents();

    return () => {
      abortController.abort();
    };
  }, [date, clubId, supabase, refreshKey]);

  return (
    <Flex direction="column" p="4" gap="4">
      <Heading size="5" as="h3">
        {new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Heading>
      <Separator />
      <Box>
        {events.length === 0 ? (
          <Text>
            <Trans>No events for today.</Trans>
          </Text>
        ) : (
          events.map((event) => (
            <Card key={event.id} mb="2">
              <Heading size="5">{event.title}</Heading>
              <Text>
                {new Date(event.startDate).toLocaleTimeString()} -{" "}
                {new Date(event.endDate).toLocaleTimeString()}
              </Text>
              {event.description && (
                <Flex direction="row" mt="2" gap="1" align="center">
                  <TextIcon />
                  <Text>{event.description}</Text>
                </Flex>
              )}
              {event.location && (
                <Flex direction="row" mt="2" gap="1" align="center">
                  <GlobeIcon />
                  <Text>{event.location}</Text>
                </Flex>
              )}
            </Card>
          ))
        )}
      </Box>
    </Flex>
  );
}
