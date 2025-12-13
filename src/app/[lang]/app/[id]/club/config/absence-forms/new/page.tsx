import { DEFAULT_ABSENCE_FORM } from "@/@types/AbsenceForm";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewAbsenceFormPage({
  params,
}: PageProps<"/[lang]/app/[id]/club/config/absence-forms/new">) {
  const { id, lang } = await params;
  initLingui(lang);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("absence_report_forms")
    .insert({
      club_id: id,
      name: "New Template",
      questions: DEFAULT_ABSENCE_FORM as any,
    })
    .select()
    .single();

  if (!error && data) {
    redirect(`/app/${id}/club/config/absence-forms/${data.id}`);
  }

  redirect(`/app/${id}/club/config/absence-forms`);
}
