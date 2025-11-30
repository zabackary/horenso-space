import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { AbsencesTabNav } from "../layout";
import AbsenceReportList from "../list";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/all">) {
  const { id } = await params;

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  if (!permissions.includes("canReadAllReports")) {
    notFound();
  }

  // fetch this:
  // interface AbsenceReportReview {
  //   id: string;
  //   reviewer: {
  //     userId: string;
  //     fullName: string;
  //   };
  //   comments: string | null;
  //   accepted: boolean;
  //   createdAt: string;
  // }

  // interface AbsenceReport {
  //   id: string;
  //   userName: string;
  //   reviews: AbsenceReportReview[];
  //   event: {
  //     id: string;
  //     name: string;
  //     startTime: Date;
  //     endTime: Date;
  //   };
  //   assignedTo: {
  //     userId: string;
  //     fullName: string;
  //   } | null;
  // }
  const reports = supabase
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
    .order("created_at", { referencedTable: "event", ascending: false })
    .then(async ({ data: reportsRes, error: reportsError }) => {
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
        profilesMap.set(
          profile.id!,
          profile as { id: string; full_name: string }
        );
      });
      const reports = reportsRes.map((report) => {
        return {
          id: report.id,
          userName: profilesMap.get(report.user_id!)?.full_name || "Unknown",
          event: report.event
            ? {
                id: report.event.id,
                name: report.event.title,
                startTime: new Date(report.event.start_time),
                endTime: new Date(report.event.end_time),
              }
            : null,
          assignedTo: report.assigned_to
            ? {
                userId: report.assigned_to,
                fullName:
                  profilesMap.get(report.assigned_to)?.full_name || "Unknown",
              }
            : null,
          reviews: report.reviews.map((review) => ({
            id: review.id,
            comments: review.comments,
            accepted: review.accepted,
            createdAt: review.created_at,
            reviewer: {
              userId: review.reviewer_id!,
              fullName:
                profilesMap.get(review.reviewer_id!)?.full_name || "Unknown",
            },
          })),
        };
      });
      return reports;
    });

  return (
    <>
      <AbsencesTabNav active="all" clubId={id} permissions={permissions} />
      <AbsenceReportList reports={reports} />
    </>
  );
}
