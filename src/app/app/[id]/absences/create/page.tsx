import { FullscreenCard } from "@/components/ui/fullscreen-card";
import { createClient } from "@/lib/supabase/server";
import { Heading } from "@radix-ui/themes";
import Form from "./form";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/create">) {
  const { id } = await params;

  const supabase = await createClient();

  const events = supabase
    .from("calendar_events")
    .select("id, title, start_time, end_time")
    .eq("club_id", id)
    .lt("start_time", new Date().toISOString())
    .order("start_time", { ascending: false })
    .limit(100)
    .then(
      (res) =>
        res.data?.map((event) => ({
          id: event.id,
          title: event.title,
          startTime: new Date(event.start_time),
          endTime: new Date(event.end_time),
        })) || []
    );

  return (
    <FullscreenCard>
      <Heading size="5" as="h2" mb="4">
        Report an absence
      </Heading>
      <Form clubId={id} events={events} />
    </FullscreenCard>
  );
}
