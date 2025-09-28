create extension if not exists "moddatetime" with schema "extensions";

create extension if not exists "pg_jsonschema" with schema "extensions";


create table "public"."absence_report_reviews" (
    "id" uuid not null default gen_random_uuid(),
    "absence_report_id" uuid not null,
    "reviewer_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "accepted" boolean not null,
    "comments" text
);


alter table "public"."absence_report_reviews" enable row level security;

create table "public"."absence_reports" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "club_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "event_id" uuid,
    "data" jsonb not null,
    "assigned_to" uuid
);


alter table "public"."absence_reports" enable row level security;

create table "public"."calendar_events" (
    "id" uuid not null default gen_random_uuid(),
    "club_id" uuid not null,
    "title" text not null,
    "description" text,
    "start_time" timestamp with time zone not null,
    "end_time" timestamp with time zone not null,
    "location" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by" uuid
);


alter table "public"."calendar_events" enable row level security;

create table "public"."club_members" (
    "club_id" uuid not null,
    "user_id" uuid not null,
    "role_id" uuid not null,
    "joined_at" timestamp with time zone not null default now(),
    "accepted" boolean not null default false
);


alter table "public"."club_members" enable row level security;

create table "public"."clubs" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "name" text not null,
    "description" text,
    "school" text,
    "website" text,
    "active" boolean not null default true,
    "public" boolean not null default true,
    "absence_report_schema" jsonb not null,
    "absence_report_required_reviewer" uuid
);


alter table "public"."clubs" enable row level security;

create table "public"."files" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "file_name" text not null,
    "file_size" bigint not null,
    "file_type" text not null,
    "description" text,
    "url" text not null,
    "club_id" uuid
);


alter table "public"."files" enable row level security;

create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "club_id" uuid,
    "read" boolean not null default false,
    "content" text not null
);


alter table "public"."notifications" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "full_name" text not null,
    "nickname" text,
    "avatar_url" text,
    "bio" text,
    "school" text,
    "notifications_enabled" boolean not null default true,
    "notification_device_tokens" text[] not null default ARRAY[]::text[]
);


alter table "public"."profiles" enable row level security;

create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "club_id" uuid,
    "name" text not null,
    "description" text,
    "permissions" jsonb not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."roles" enable row level security;

CREATE INDEX absence_report_reviews_absence_report_id_idx ON public.absence_report_reviews USING btree (absence_report_id);

CREATE UNIQUE INDEX absence_report_reviews_pkey ON public.absence_report_reviews USING btree (id);

CREATE INDEX absence_report_reviews_reviewer_id_idx ON public.absence_report_reviews USING btree (reviewer_id);

CREATE INDEX absence_reports_assigned_to_idx ON public.absence_reports USING btree (assigned_to);

CREATE INDEX absence_reports_club_id_idx ON public.absence_reports USING btree (club_id);

CREATE UNIQUE INDEX absence_reports_pkey ON public.absence_reports USING btree (id);

CREATE INDEX absence_reports_user_id_idx ON public.absence_reports USING btree (user_id);

CREATE INDEX calendar_events_club_id_idx ON public.calendar_events USING btree (club_id);

CREATE UNIQUE INDEX calendar_events_pkey ON public.calendar_events USING btree (id);

CREATE UNIQUE INDEX club_members_pkey ON public.club_members USING btree (club_id, user_id);

CREATE INDEX clubs_name_idx ON public.clubs USING btree (name);

CREATE UNIQUE INDEX clubs_pkey ON public.clubs USING btree (id);

CREATE INDEX files_club_id_idx ON public.files USING btree (club_id);

CREATE INDEX files_created_at_idx ON public.files USING btree (created_at);

CREATE UNIQUE INDEX files_pkey ON public.files USING btree (id);

CREATE INDEX files_user_id_idx ON public.files USING btree (user_id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE INDEX profiles_full_name_idx ON public.profiles USING btree (full_name);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE INDEX roles_club_id_idx ON public.roles USING btree (club_id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

alter table "public"."absence_report_reviews" add constraint "absence_report_reviews_pkey" PRIMARY KEY using index "absence_report_reviews_pkey";

alter table "public"."absence_reports" add constraint "absence_reports_pkey" PRIMARY KEY using index "absence_reports_pkey";

alter table "public"."calendar_events" add constraint "calendar_events_pkey" PRIMARY KEY using index "calendar_events_pkey";

alter table "public"."club_members" add constraint "club_members_pkey" PRIMARY KEY using index "club_members_pkey";

alter table "public"."clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

alter table "public"."files" add constraint "files_pkey" PRIMARY KEY using index "files_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."absence_report_reviews" add constraint "absence_report_reviews_absence_report_id_fkey" FOREIGN KEY (absence_report_id) REFERENCES absence_reports(id) ON DELETE CASCADE not valid;

alter table "public"."absence_report_reviews" validate constraint "absence_report_reviews_absence_report_id_fkey";

alter table "public"."absence_report_reviews" add constraint "absence_report_reviews_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."absence_report_reviews" validate constraint "absence_report_reviews_reviewer_id_fkey";

alter table "public"."absence_reports" add constraint "absence_reports_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_assigned_to_fkey";

alter table "public"."absence_reports" add constraint "absence_reports_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_club_id_fkey";

alter table "public"."absence_reports" add constraint "absence_reports_event_id_fkey" FOREIGN KEY (event_id) REFERENCES calendar_events(id) ON DELETE SET NULL not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_event_id_fkey";

alter table "public"."absence_reports" add constraint "absence_reports_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_user_id_fkey";

alter table "public"."calendar_events" add constraint "calendar_events_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE not valid;

alter table "public"."calendar_events" validate constraint "calendar_events_club_id_fkey";

alter table "public"."calendar_events" add constraint "calendar_events_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."calendar_events" validate constraint "calendar_events_created_by_fkey";

alter table "public"."club_members" add constraint "club_members_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE not valid;

alter table "public"."club_members" validate constraint "club_members_club_id_fkey";

alter table "public"."club_members" add constraint "club_members_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) not valid;

alter table "public"."club_members" validate constraint "club_members_role_id_fkey";

alter table "public"."club_members" add constraint "club_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."club_members" validate constraint "club_members_user_id_fkey";

alter table "public"."clubs" add constraint "clubs_absence_report_required_reviewer_fkey" FOREIGN KEY (absence_report_required_reviewer) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."clubs" validate constraint "clubs_absence_report_required_reviewer_fkey";

alter table "public"."clubs" add constraint "clubs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."clubs" validate constraint "clubs_created_by_fkey";

alter table "public"."files" add constraint "files_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE SET NULL not valid;

alter table "public"."files" validate constraint "files_club_id_fkey";

alter table "public"."files" add constraint "files_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."files" validate constraint "files_user_id_fkey";

alter table "public"."notifications" add constraint "notifications_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_club_id_fkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."roles" add constraint "roles_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE not valid;

alter table "public"."roles" validate constraint "roles_club_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_creator_as_club_member()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
  new_role_id uuid;
begin
  if new.created_by is not null then
    -- Create a new role with all permissions
    insert into roles(club_id, name, permissions)
      values (new.id, 'Default role', '{
      "canWriteFiles": true,
      "canReadFiles": true,
      "canWriteOwnReport": true,
      "canReadAllReports": true,
      "canWriteReportReview": true,
      "canWriteCalendar": true,
      "canReadCalendar": true,
      "canManageClub": true
    }'::jsonb)
    returning
      id into new_role_id;
    -- Add the creator as a member with the new role
    insert into club_members(club_id, user_id, role_id, accepted)
      values (new.id, new.created_by, new_role_id, true);
  end if;
  return new;
end;
$function$
;

create or replace view "public"."public_clubs" as  SELECT id,
    created_at,
    name,
        CASE
            WHEN public THEN description
            ELSE NULL::text
        END AS description,
        CASE
            WHEN public THEN school
            ELSE NULL::text
        END AS school,
        CASE
            WHEN public THEN website
            ELSE NULL::text
        END AS website,
    active,
    public
   FROM clubs;


CREATE OR REPLACE FUNCTION public.user_has_club_permission(p_club_id uuid, p_permission text)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  select
    exists(
      select
        1
      from
        "club_members" cm
        inner join "roles" r on cm.role_id = r.id
      where
        cm.club_id = p_club_id
        and cm.user_id = auth.uid()
        and cm.accepted = true
        and(r.permissions ->> p_permission)::boolean = true);
$function$
;

grant delete on table "public"."absence_report_reviews" to "anon";

grant insert on table "public"."absence_report_reviews" to "anon";

grant references on table "public"."absence_report_reviews" to "anon";

grant select on table "public"."absence_report_reviews" to "anon";

grant trigger on table "public"."absence_report_reviews" to "anon";

grant truncate on table "public"."absence_report_reviews" to "anon";

grant update on table "public"."absence_report_reviews" to "anon";

grant delete on table "public"."absence_report_reviews" to "authenticated";

grant insert on table "public"."absence_report_reviews" to "authenticated";

grant references on table "public"."absence_report_reviews" to "authenticated";

grant select on table "public"."absence_report_reviews" to "authenticated";

grant trigger on table "public"."absence_report_reviews" to "authenticated";

grant truncate on table "public"."absence_report_reviews" to "authenticated";

grant update on table "public"."absence_report_reviews" to "authenticated";

grant delete on table "public"."absence_report_reviews" to "service_role";

grant insert on table "public"."absence_report_reviews" to "service_role";

grant references on table "public"."absence_report_reviews" to "service_role";

grant select on table "public"."absence_report_reviews" to "service_role";

grant trigger on table "public"."absence_report_reviews" to "service_role";

grant truncate on table "public"."absence_report_reviews" to "service_role";

grant update on table "public"."absence_report_reviews" to "service_role";

grant delete on table "public"."absence_reports" to "anon";

grant insert on table "public"."absence_reports" to "anon";

grant references on table "public"."absence_reports" to "anon";

grant select on table "public"."absence_reports" to "anon";

grant trigger on table "public"."absence_reports" to "anon";

grant truncate on table "public"."absence_reports" to "anon";

grant update on table "public"."absence_reports" to "anon";

grant delete on table "public"."absence_reports" to "authenticated";

grant insert on table "public"."absence_reports" to "authenticated";

grant references on table "public"."absence_reports" to "authenticated";

grant select on table "public"."absence_reports" to "authenticated";

grant trigger on table "public"."absence_reports" to "authenticated";

grant truncate on table "public"."absence_reports" to "authenticated";

grant update on table "public"."absence_reports" to "authenticated";

grant delete on table "public"."absence_reports" to "service_role";

grant insert on table "public"."absence_reports" to "service_role";

grant references on table "public"."absence_reports" to "service_role";

grant select on table "public"."absence_reports" to "service_role";

grant trigger on table "public"."absence_reports" to "service_role";

grant truncate on table "public"."absence_reports" to "service_role";

grant update on table "public"."absence_reports" to "service_role";

grant delete on table "public"."calendar_events" to "anon";

grant insert on table "public"."calendar_events" to "anon";

grant references on table "public"."calendar_events" to "anon";

grant select on table "public"."calendar_events" to "anon";

grant trigger on table "public"."calendar_events" to "anon";

grant truncate on table "public"."calendar_events" to "anon";

grant update on table "public"."calendar_events" to "anon";

grant delete on table "public"."calendar_events" to "authenticated";

grant insert on table "public"."calendar_events" to "authenticated";

grant references on table "public"."calendar_events" to "authenticated";

grant select on table "public"."calendar_events" to "authenticated";

grant trigger on table "public"."calendar_events" to "authenticated";

grant truncate on table "public"."calendar_events" to "authenticated";

grant update on table "public"."calendar_events" to "authenticated";

grant delete on table "public"."calendar_events" to "service_role";

grant insert on table "public"."calendar_events" to "service_role";

grant references on table "public"."calendar_events" to "service_role";

grant select on table "public"."calendar_events" to "service_role";

grant trigger on table "public"."calendar_events" to "service_role";

grant truncate on table "public"."calendar_events" to "service_role";

grant update on table "public"."calendar_events" to "service_role";

grant delete on table "public"."club_members" to "anon";

grant insert on table "public"."club_members" to "anon";

grant references on table "public"."club_members" to "anon";

grant select on table "public"."club_members" to "anon";

grant trigger on table "public"."club_members" to "anon";

grant truncate on table "public"."club_members" to "anon";

grant update on table "public"."club_members" to "anon";

grant delete on table "public"."club_members" to "authenticated";

grant insert on table "public"."club_members" to "authenticated";

grant references on table "public"."club_members" to "authenticated";

grant select on table "public"."club_members" to "authenticated";

grant trigger on table "public"."club_members" to "authenticated";

grant truncate on table "public"."club_members" to "authenticated";

grant update on table "public"."club_members" to "authenticated";

grant delete on table "public"."club_members" to "service_role";

grant insert on table "public"."club_members" to "service_role";

grant references on table "public"."club_members" to "service_role";

grant select on table "public"."club_members" to "service_role";

grant trigger on table "public"."club_members" to "service_role";

grant truncate on table "public"."club_members" to "service_role";

grant update on table "public"."club_members" to "service_role";

grant delete on table "public"."clubs" to "anon";

grant insert on table "public"."clubs" to "anon";

grant references on table "public"."clubs" to "anon";

grant select on table "public"."clubs" to "anon";

grant trigger on table "public"."clubs" to "anon";

grant truncate on table "public"."clubs" to "anon";

grant update on table "public"."clubs" to "anon";

grant delete on table "public"."clubs" to "authenticated";

grant insert on table "public"."clubs" to "authenticated";

grant references on table "public"."clubs" to "authenticated";

grant select on table "public"."clubs" to "authenticated";

grant trigger on table "public"."clubs" to "authenticated";

grant truncate on table "public"."clubs" to "authenticated";

grant update on table "public"."clubs" to "authenticated";

grant delete on table "public"."clubs" to "service_role";

grant insert on table "public"."clubs" to "service_role";

grant references on table "public"."clubs" to "service_role";

grant select on table "public"."clubs" to "service_role";

grant trigger on table "public"."clubs" to "service_role";

grant truncate on table "public"."clubs" to "service_role";

grant update on table "public"."clubs" to "service_role";

grant delete on table "public"."files" to "anon";

grant insert on table "public"."files" to "anon";

grant references on table "public"."files" to "anon";

grant select on table "public"."files" to "anon";

grant trigger on table "public"."files" to "anon";

grant truncate on table "public"."files" to "anon";

grant update on table "public"."files" to "anon";

grant delete on table "public"."files" to "authenticated";

grant insert on table "public"."files" to "authenticated";

grant references on table "public"."files" to "authenticated";

grant select on table "public"."files" to "authenticated";

grant trigger on table "public"."files" to "authenticated";

grant truncate on table "public"."files" to "authenticated";

grant update on table "public"."files" to "authenticated";

grant delete on table "public"."files" to "service_role";

grant insert on table "public"."files" to "service_role";

grant references on table "public"."files" to "service_role";

grant select on table "public"."files" to "service_role";

grant trigger on table "public"."files" to "service_role";

grant truncate on table "public"."files" to "service_role";

grant update on table "public"."files" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

create policy "Authorized users can create report reviews"
on "public"."absence_report_reviews"
as permissive
for insert
to public
with check (((reviewer_id = auth.uid()) AND user_has_club_permission(( SELECT ar.club_id
   FROM absence_reports ar
  WHERE (ar.id = absence_report_reviews.absence_report_id)), 'canWriteReportReview'::text)));


create policy "Authorized users can view all club reviews"
on "public"."absence_report_reviews"
as permissive
for select
to public
using (user_has_club_permission(( SELECT ar.club_id
   FROM absence_reports ar
  WHERE (ar.id = absence_report_reviews.absence_report_id)), 'canReadAllReports'::text));


create policy "Report authors can view reviews of their reports"
on "public"."absence_report_reviews"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM absence_reports
  WHERE ((absence_reports.id = absence_report_reviews.absence_report_id) AND (absence_reports.user_id = auth.uid())))));


create policy "Reviewers can manage their own reviews"
on "public"."absence_report_reviews"
as permissive
for all
to public
using ((reviewer_id = auth.uid()))
with check ((reviewer_id = auth.uid()));


create policy "Users can create reviews for reports assigned to them"
on "public"."absence_report_reviews"
as permissive
for insert
to public
with check (((reviewer_id = auth.uid()) AND (EXISTS ( SELECT 1
   FROM ((absence_reports
     JOIN club_members ON ((absence_reports.club_id = club_members.club_id)))
     JOIN roles ON ((club_members.role_id = roles.id)))
  WHERE ((absence_reports.id = absence_report_reviews.absence_report_id) AND (club_members.user_id = auth.uid()) AND (club_members.accepted = true) AND (absence_reports.assigned_to = auth.uid()))))));


create policy "Assigned reviewers can view reports"
on "public"."absence_reports"
as permissive
for select
to public
using ((assigned_to = auth.uid()));


create policy "Authorized users can view all club reports"
on "public"."absence_reports"
as permissive
for select
to public
using (user_has_club_permission(club_id, 'canReadAllReports'::text));


create policy "Users can create their own absence reports"
on "public"."absence_reports"
as permissive
for insert
to public
with check (((user_id = auth.uid()) AND user_has_club_permission(club_id, 'canWriteOwnReport'::text)));


create policy "Users can view their own absence reports"
on "public"."absence_reports"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Authorized users can create calendar events"
on "public"."calendar_events"
as permissive
for insert
to public
with check (((created_by = auth.uid()) AND user_has_club_permission(club_id, 'canWriteCalendar'::text)));


create policy "Authorized users can delete calendar events"
on "public"."calendar_events"
as permissive
for delete
to public
using (user_has_club_permission(club_id, 'canWriteCalendar'::text));


create policy "Authorized users can update calendar events"
on "public"."calendar_events"
as permissive
for update
to public
using (user_has_club_permission(club_id, 'canWriteCalendar'::text));


create policy "Authorized users can view club calendar events"
on "public"."calendar_events"
as permissive
for select
to public
using (user_has_club_permission(club_id, 'canReadCalendar'::text));


create policy "Users can accept their own invitations"
on "public"."club_members"
as permissive
for update
to public
using (((user_id = auth.uid()) AND (accepted = false)))
with check (((user_id = auth.uid()) AND (accepted = true)));


create policy "Users can leave clubs"
on "public"."club_members"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "Users can view their own membership records"
on "public"."club_members"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Authenticated users can create clubs"
on "public"."clubs"
as permissive
for insert
to public
with check (((auth.uid() IS NOT NULL) AND (created_by = auth.uid())));


create policy "Authorized users can delete club files"
on "public"."files"
as permissive
for delete
to public
using (user_has_club_permission(club_id, 'canWriteFiles'::text));


create policy "Authorized users can update club files"
on "public"."files"
as permissive
for update
to public
using (user_has_club_permission(club_id, 'canWriteFiles'::text));


create policy "Authorized users can upload files"
on "public"."files"
as permissive
for insert
to public
with check ((user_has_club_permission(club_id, 'canWriteFiles'::text) AND (user_id = auth.uid()) AND (club_id IS NOT NULL)));


create policy "Authorized users can view club files"
on "public"."files"
as permissive
for select
to public
using (((club_id IS NOT NULL) AND user_has_club_permission(club_id, 'canReadFiles'::text)));


create policy "Users can view their own files"
on "public"."files"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Users can delete their own notifications"
on "public"."notifications"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "Users can view their own notifications"
on "public"."notifications"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Users can insert their own profile"
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update their own profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view their own profile"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));


CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.absence_report_reviews FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.absence_reports FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.calendar_events FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER set_joined_at BEFORE UPDATE ON public.club_members FOR EACH ROW WHEN (((old.accepted = false) AND (new.accepted = true))) EXECUTE FUNCTION extensions.moddatetime('joined_at');

CREATE TRIGGER add_creator_as_club_member AFTER INSERT ON public.clubs FOR EACH ROW EXECUTE FUNCTION add_creator_as_club_member();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.files FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');


