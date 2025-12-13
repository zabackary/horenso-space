import { AbsenceForm } from "@/@types/AbsenceForm";
import { FullscreenCard } from "@/components/ui/fullscreen-card";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { Callout, Heading } from "@radix-ui/themes";
import Form from "./form";

export default async function Page({
  params,
}: PageProps<"/[lang]/app/[id]/absences/create">) {
  const { id } = await params;

  const supabase = await createClient();

  const profile = (await getProfile(supabase))!;

  const { data: templateRawData, error: templateError } = await supabase
    .from("club_members")
    .select("roles (absence_report_forms (id, questions))")
    .eq("user_id", profile.id)
    .eq("club_id", id)
    .single();
  const templateData = templateRawData?.roles?.absence_report_forms ?? null;

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
      {templateError || !templateData ? (
        <Callout.Root variant="outline">
          <Callout.Text>
            You do not have a configured absence report form. Please contact a
            club manager.
          </Callout.Text>
        </Callout.Root>
      ) : (
        <Form
          clubId={id}
          events={events}
          template={{
            id: templateData.id,
            questions: templateData.questions as unknown as AbsenceForm,
          }}
        />
      )}
    </FullscreenCard>
  );
}
