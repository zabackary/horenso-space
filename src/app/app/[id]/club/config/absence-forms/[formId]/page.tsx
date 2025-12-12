import { notFound } from "next/navigation";
import AbsenceFormDetail from "@/components/club-config/absence-form-detail";
import { createClient } from "@/lib/supabase/server";

export default async function AbsenceFormDetailPage({
  params,
}: PageProps<"/app/[id]/club/config/absence-forms/[formId]">) {
  const { id, formId } = await params;
  const supabase = await createClient();

  const res = await supabase
    .from("absence_report_forms")
    .select("id, name, questions, updated_at, club_id, created_at")
    .eq("id", formId)
    .eq("club_id", id)
    .single();
  if (res.error || !res.data) notFound();

  return <AbsenceFormDetail initial={res.data} clubId={id} />;
}
