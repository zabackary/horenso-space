"use client";

import { Drawer } from "@/components/ui/drawer";
import { PlusIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, VisuallyHidden } from "@radix-ui/themes";
import { useState } from "react";
import styles from "./calendar.module.css";
import CreateEventCard from "./create-event-card";

export interface CalendarProps {
  mode: "year" | "month" | "week" | "day";
  date: string;
  clubId: string;
}

export default function Calendar({ mode, date, clubId }: CalendarProps) {
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  return (
    <>
      <Flex direction="column" align="center" justify="center" height="100%">
        <Heading size="4">
          Calendar - {mode} view for {date}
        </Heading>
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
            />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
