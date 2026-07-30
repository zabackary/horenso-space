"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/requireUser";
import { createClient } from "@/lib/supabase/server";

/**
 * Delete a calendar event
 * @param clubId The club ID
 * @param eventId The event ID to delete
 */
export async function deleteCalendarEvent(clubId: string, eventId: string) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase
    .from("calendar_events")
    .delete()
    .eq("id", eventId)
    .eq("club_id", clubId);

  if (error) {
    throw error;
  }

  revalidatePath(`/app/${clubId}/calendar`);
  return { success: true };
}

/**
 * Update a calendar event
 * @param clubId The club ID
 * @param eventId The event ID to update
 * @param data The updated event data
 */
export async function updateCalendarEvent(
  clubId: string,
  eventId: string,
  data: {
    title?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    description?: string;
  },
) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase
    .from("calendar_events")
    .update(data)
    .eq("id", eventId)
    .eq("club_id", clubId);

  if (error) {
    throw error;
  }

  revalidatePath(`/app/${clubId}/calendar`);
  return { success: true };
}
