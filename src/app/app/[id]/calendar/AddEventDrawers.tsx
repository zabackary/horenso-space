import { Drawer } from "@/components/ui/drawer";
import { Trans } from "@lingui/react/macro";
import { VisuallyHidden } from "@radix-ui/themes";
import { useState } from "react";
import CalendarCsvImportSheet from "./calendar-csv-import-sheet";
import CreateEventCard from "./create-event-card";

export default function AddEventDrawers({
  createDrawerOpen,
  setCreateDrawerOpen,
  clubId,
}: {
  createDrawerOpen: boolean;
  setCreateDrawerOpen: (open: boolean) => void;
  clubId: string;
}) {
  const [csvImportDrawerOpen, setCSVImportDrawerOpen] = useState(false);
  return (
    <>
      <Drawer.Root
        open={createDrawerOpen}
        onOpenChange={setCreateDrawerOpen}
        snapPoints={[420, "100%"]}
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
                <Trans>Create a new event</Trans>
              </Drawer.Description>
            </VisuallyHidden>
            <CreateEventCard
              onCancel={() => {
                setCreateDrawerOpen(false);
              }}
              onCreate={() => {
                setCreateDrawerOpen(false);
                // TODO: navigate to the created event
              }}
              onCSVImport={() => {
                setCSVImportDrawerOpen(true);
              }}
              clubId={clubId}
            />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <CalendarCsvImportSheet
        clubId={clubId}
        open={csvImportDrawerOpen}
        onOpenChange={setCSVImportDrawerOpen}
        onImported={() => {
          setCSVImportDrawerOpen(false);
          setCreateDrawerOpen(false);
        }}
      />
    </>
  );
}
