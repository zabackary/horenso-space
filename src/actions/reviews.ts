"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/requireUser";
import { createClient } from "@/lib/supabase/server";

export async function submitReview(
  clubId: string,
  reportId: string,
  accepted: boolean,
  comments: string | null,
) {
  const supabase = await createClient();
  const user = await requireUser(supabase);

  const { error } = await supabase.from("absence_report_reviews").insert({
    absence_report_id: reportId,
    reviewer_id: user.id,
    accepted,
    comments,
  });

  if (error) {
    throw error;
  }

  revalidatePath(`/app/${clubId}/absences/assigned`);
  return { success: true };
}
