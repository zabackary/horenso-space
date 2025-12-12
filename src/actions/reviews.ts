"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitReview(
  clubId: string,
  reportId: string,
  accepted: boolean,
  comments: string | null
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

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
