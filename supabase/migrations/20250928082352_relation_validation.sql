create or replace view "public"."joined_clubs" as  SELECT id,
    created_at,
    created_by,
    name,
    description,
    school,
    website,
    active,
    public,
    absence_report_schema,
    absence_report_required_reviewer
   FROM clubs
  WHERE (EXISTS ( SELECT 1
           FROM club_members
          WHERE ((club_members.club_id = clubs.id) AND (club_members.user_id = auth.uid()) AND (club_members.accepted = true))));


create policy "Users can update their own absence reports if no reviews"
on "public"."absence_reports"
as permissive
for update
to public
using (((user_id = auth.uid()) AND user_has_club_permission(club_id, 'canWriteOwnReport'::text) AND (NOT (EXISTS ( SELECT 1
   FROM absence_report_reviews arr
  WHERE (arr.absence_report_id = absence_reports.id))))));


create policy "Club managers can invite new members"
on "public"."club_members"
as permissive
for insert
to public
with check ((user_has_club_permission(club_id, 'canManageClub'::text) AND (accepted = false)));


create policy "Club managers can manage memberships"
on "public"."club_members"
as permissive
for update
to public
using (user_has_club_permission(club_id, 'canManageClub'::text));


create policy "Club managers can remove members"
on "public"."club_members"
as permissive
for delete
to public
using (user_has_club_permission(club_id, 'canManageClub'::text));


create policy "Club members can view other members"
on "public"."club_members"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM joined_clubs
  WHERE (joined_clubs.id = club_members.club_id))));


create policy "Club managers can update clubs"
on "public"."clubs"
as permissive
for update
to public
using (user_has_club_permission(id, 'canManageClub'::text));


create policy "Club members can view their clubs"
on "public"."clubs"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM club_members
  WHERE ((club_members.club_id = clubs.id) AND (club_members.user_id = auth.uid()) AND (club_members.accepted = true)))));


create policy "Club members can view other member profiles"
on "public"."profiles"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (club_members cm1
     JOIN club_members cm2 ON ((cm1.club_id = cm2.club_id)))
  WHERE ((cm1.user_id = auth.uid()) AND (cm2.user_id = profiles.id) AND (cm1.accepted = true) AND (cm2.accepted = true)))));


create policy "Club managers can manage roles"
on "public"."roles"
as permissive
for all
to public
using (user_has_club_permission(club_id, 'canManageClub'::text))
with check ((user_has_club_permission(club_id, 'canManageClub'::text) AND (NOT ((EXISTS ( SELECT 1
   FROM club_members
  WHERE ((club_members.role_id = roles.id) AND (club_members.user_id = auth.uid()) AND (club_members.accepted = true)))) AND (((permissions ->> 'canManageClub'::text))::boolean = false)))));


create policy "Club members can view club roles"
on "public"."roles"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM joined_clubs
  WHERE (joined_clubs.id = roles.club_id))));



