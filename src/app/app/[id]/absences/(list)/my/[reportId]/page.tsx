import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Card, Flex, Heading, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportDetail from "../../report-detail";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/my/[reportId]">) {
  const { id, reportId } = await params;

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);
  const profile = await getProfile(supabase);

  // Fetch the report with all related data
  const { data: report, error: reportError } = await supabase
    .from("absence_reports")
    .select(
      `
      id,
      user_id,
      club_id,
      event_id,
      assigned_to_role,
      data,
      form_id,
      calendar_events (id, title, start_time, end_time),
      absence_report_reviews (
        id,
        comments,
        accepted,
        created_at,
        reviewer_id
      ),
      roles (id, name)
    `
    )
    .eq("id", reportId)
    .eq("user_id", profile!.id)
    .eq("club_id", id)
    .single();

  if (reportError || !report) {
    notFound();
  }

  // Fetch the user profile data
  const { data: userProfile } = report.user_id
    ? await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", report.user_id)
        .single()
    : { data: null };

  // Fetch reviewer profiles for all reviews
  const reviewerIds = (report.absence_report_reviews || []).map(
    (r: any) => r.reviewer_id
  );
  const { data: reviewerProfiles } =
    reviewerIds.length > 0
      ? await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", reviewerIds)
      : { data: [] };

  const reviewerMap = (reviewerProfiles || []).reduce((acc: any, p: any) => {
    acc[p.id] = p.full_name;
    return acc;
  }, {});

  // Transform the data to match the Report type expected by ReportDetail
  const transformedReport = {
    id: report.id,
    user_id: report.user_id,
    user_name: userProfile?.full_name || "Unknown",
    event_id: report.calendar_events?.id || null,
    event_name: report.calendar_events?.title || null,
    event_start_time: report.calendar_events?.start_time || null,
    event_end_time: report.calendar_events?.end_time || null,
    assigned_to_role_id: report.assigned_to_role,
    assigned_to_role_name: report.roles?.name || null,
    reviews: (report.absence_report_reviews || []).map((review: any) => ({
      id: review.id,
      comments: review.comments,
      accepted: review.accepted,
      created_at: review.created_at,
      reviewer_id: review.reviewer_id,
      reviewer_name: reviewerMap[review.reviewer_id] || "Unknown",
    })),
    data: report.data,
    form_id: report.form_id,
  };

  return (
    <Flex direction="column" gap="4" p="4" width="100%">
      <Flex direction="row" align="center" gap="2">
        <IconButton variant="soft" asChild>
          <Link href={`/app/${id}/absences/my`}>
            <ArrowLeftIcon />
          </Link>
        </IconButton>
        <Heading size="4" as="h2">
          My Report Details
        </Heading>
      </Flex>
      <Card>
        <ReportDetail report={transformedReport} clubId={id} />
      </Card>
    </Flex>
  );
}
