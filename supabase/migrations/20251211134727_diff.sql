drop policy "Users can create reviews for reports assigned to them" on "public"."absence_report_reviews";

alter table "public"."absence_reports"
  drop constraint "absence_reports_assigned_to_fkey";

drop trigger if exists "create_user_profile" on "auth"."users";

drop function if exists "private"."create_user_profile"();

alter table "public"."roles"
  add column "absence_report_approval_required" boolean not null default true;

alter table "public"."roles"
  add column "absence_report_reviewer_role" uuid;

alter table "public"."absence_reports"
  add constraint "absence_reports_assigned_to_role_fkey" foreign key (assigned_to_role) references public.roles(id) on delete set null not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_assigned_to_role_fkey";

alter table "public"."roles"
  add constraint "roles_absence_report_reviewer_role_fkey" foreign key (absence_report_reviewer_role) references public.roles(id) on delete set null not valid;

alter table "public"."roles" validate constraint "roles_absence_report_reviewer_role_fkey";

set check_function_bodies = off;

create or replace function public.create_user_profile()
  returns trigger
  language plpgsql
  security definer
  set search_path to ''
  as $function$
begin
  insert into private.profiles(id, full_name)
    values(new.id, '');
  return new;
end;
$function$;

create policy "Users can create reviews for reports assigned to them" on "public"."absence_report_reviews" as permissive
  for insert to public
    with check (((reviewer_id = auth.uid()) and (exists (
      select
        1
      from ((public.absence_reports
      join public.club_members on (absence_reports.club_id = club_members.club_id))
      join public.roles on (club_members.role_id = roles.id))
    where ((absence_reports.id = absence_report_reviews.absence_report_id) and (club_members.user_id = auth.uid()) and (club_members.accepted = true) and (absence_reports.assigned_to_role = club_members.role_id))))));

create trigger create_user_profile
  after insert on auth.users
  for each row
  execute function public.create_user_profile();

