drop policy "Club admins can modify absence report forms for their clubs" on "public"."absence_report_forms";

alter table "public"."absence_reports" add column "date" date;


  create policy "Club admins can modify absence report forms for their clubs"
  on "public"."absence_report_forms"
  as permissive
  for update
  to public
using (public.user_has_club_permission(club_id, 'canManageClub'::text));



