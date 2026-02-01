"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Import calendar events from a CSV content
 *
 * title,start_time,end_time,location,description
 * Club meeting,2024-07-01T10:00:00Z,2024-07-01T11:00:00Z,Optional room,Optional description
 *
 * @param clubId The club
 * @param csvContent The content
 * @returns A success/error
 */
export async function importCalendarEventsFromCSV(
  clubId: string,
  csvContent: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const rows = csvContent.split("\n").slice(1); // Skip header row
  const { error } = await supabase.from("calendar_events").insert(
    rows.map((row) => {
      const [title, startTime, endTime, location, description] = row.split(",");
      return {
        title,
        club_id: clubId,
        start_time: startTime,
        end_time: endTime,
        created_by: user.id,
        location: location || undefined,
        description: description || undefined,
      };
    }),
  );

  if (error) {
    throw error;
  }

  revalidatePath(`/app/${clubId}/calendar`);
  return { success: true };
}
