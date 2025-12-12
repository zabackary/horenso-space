import type { Database } from "@/@types/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface AbsenceReport {
  id: string;
  userName: string;
  date: Date | null;
  event: {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
  } | null;
  assignedToRole: {
    roleId: string;
    roleName: string;
  } | null;
  reviews: {
    id: string;
    comments: string | null;
    accepted: boolean;
    createdAt: string;
    reviewer: {
      userId: string;
      fullName: string;
    };
  }[];
}

export default async function getReports(
  supabase: SupabaseClient<Database>,
  id: string,
  userId?: string
): Promise<AbsenceReport[]> {
  const { data: reportsRes, error: reportsError } = await supabase.rpc(
    "get_absence_reports",
    {
      p_club_id: id,
      p_user_id: userId,
    }
  );
  if (reportsError) {
    throw reportsError;
  }

  const reports = (reportsRes || []).map((report) => {
    return {
      id: report.id,
      userName: report.user_name || "Unknown",
      event: report.event_id
        ? {
            id: report.event_id,
            name: report.event_name,
            startTime: new Date(report.event_start_time),
            endTime: new Date(report.event_end_time),
          }
        : null,
      date: report.report_date ? new Date(report.report_date) : null,
      assignedToRole: report.assigned_to_role_id
        ? {
            roleId: report.assigned_to_role_id,
            roleName: report.assigned_to_role_name || "Unknown",
          }
        : null,
      reviews: ((report.reviews || []) as any[]).map((review: any) => ({
        id: review.id,
        comments: review.comments,
        accepted: review.accepted,
        createdAt: review.created_at,
        reviewer: {
          userId: review.reviewer_id,
          fullName: review.reviewer_name || "Unknown",
        },
      })),
    };
  });
  return reports;
}
