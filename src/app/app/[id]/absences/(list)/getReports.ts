import { Database } from "@/@types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function getReports(
  supabase: SupabaseClient<Database>,
  id: string,
  userId?: string
) {
  const query = supabase
    .from("absence_reports")
    .select(
      `
      id,
      user_id,
      event:calendar_events(
        id,
        title,
        start_time,
        end_time
      ),
      assigned_to,
      reviews:absence_report_reviews(
        id,
        comments,
        accepted,
        created_at,
        reviewer_id
      )
    `
    )
    .eq("club_id", id)
    .order("created_at", { referencedTable: "event", ascending: false });
  if (userId) {
    query.eq("user_id", userId);
  }
  const { data: reportsRes, error: reportsError } = await query;
  if (reportsError) {
    throw reportsError;
  }
  // fetch the profiles for user_id and reviewer_id
  // and map them into the reports structure
  const userIds = new Set<string>();
  reportsRes.forEach((report) => {
    if (report.user_id) {
      userIds.add(report.user_id);
    }
    if (report.assigned_to) {
      userIds.add(report.assigned_to);
    }
    report.reviews.forEach((review) => {
      if (review.reviewer_id) {
        userIds.add(review.reviewer_id);
      }
    });
  });
  const { data: profilesRes, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", Array.from(userIds));
  if (profilesError) {
    throw profilesError;
  }
  const profilesMap = new Map<string, { id: string; full_name: string }>();
  profilesRes.forEach((profile) => {
    profilesMap.set(profile.id!, profile as { id: string; full_name: string });
  });
  const reports = reportsRes.map((report_1) => {
    return {
      id: report_1.id,
      userName: profilesMap.get(report_1.user_id!)?.full_name || "Unknown",
      event: report_1.event
        ? {
            id: report_1.event.id,
            name: report_1.event.title,
            startTime: new Date(report_1.event.start_time),
            endTime: new Date(report_1.event.end_time),
          }
        : null,
      assignedTo: report_1.assigned_to
        ? {
            userId: report_1.assigned_to,
            fullName:
              profilesMap.get(report_1.assigned_to)?.full_name || "Unknown",
          }
        : null,
      reviews: report_1.reviews.map((review_1) => ({
        id: review_1.id,
        comments: review_1.comments,
        accepted: review_1.accepted,
        createdAt: review_1.created_at,
        reviewer: {
          userId: review_1.reviewer_id!,
          fullName:
            profilesMap.get(review_1.reviewer_id!)?.full_name || "Unknown",
        },
      })),
    };
  });
  return reports;
}
