alter table "public"."absence_report_reviews" drop constraint "absence_report_reviews_reviewer_id_fkey";

alter table "public"."absence_reports" drop constraint "absence_reports_user_id_fkey";

alter table "public"."calendar_events" drop constraint "calendar_events_created_by_fkey";

alter table "public"."club_members" drop constraint "club_members_user_id_fkey";

alter table "public"."clubs" drop constraint "clubs_absence_report_required_reviewer_fkey";

alter table "public"."clubs" drop constraint "clubs_created_by_fkey";

alter table "public"."feedback_submissions" drop constraint "feedback_submissions_user_id_fkey";

alter table "public"."files" drop constraint "files_user_id_fkey";

alter table "public"."notifications" drop constraint "notifications_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."absence_report_reviews" add constraint "absence_report_reviews_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."absence_report_reviews" validate constraint "absence_report_reviews_reviewer_id_fkey";

alter table "public"."absence_reports" add constraint "absence_reports_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_user_id_fkey";

alter table "public"."calendar_events" add constraint "calendar_events_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."calendar_events" validate constraint "calendar_events_created_by_fkey";

alter table "public"."club_members" add constraint "club_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."club_members" validate constraint "club_members_user_id_fkey";

alter table "public"."clubs" add constraint "clubs_absence_report_required_reviewer_fkey" FOREIGN KEY (absence_report_required_reviewer) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."clubs" validate constraint "clubs_absence_report_required_reviewer_fkey";

alter table "public"."clubs" add constraint "clubs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."clubs" validate constraint "clubs_created_by_fkey";

alter table "public"."feedback_submissions" add constraint "feedback_submissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL not valid;

alter table "public"."feedback_submissions" validate constraint "feedback_submissions_user_id_fkey";

alter table "public"."files" add constraint "files_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."files" validate constraint "files_user_id_fkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";


