create schema if not exists "private";

create table "private"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "club_id" uuid,
    "read" boolean not null default false,
    "content" text not null
);


alter table "private"."notifications" enable row level security;

create table "private"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "full_name" text not null,
    "nickname" text,
    "avatar_url" text,
    "bio" text,
    "school" text,
    "notifications_enabled" boolean not null default true,
    "notification_device_tokens" text[] not null default ARRAY[]::text[],
    "is_banned" boolean not null default false,
    "private_profile" boolean not null default false
);


alter table "private"."profiles" enable row level security;

CREATE UNIQUE INDEX notifications_pkey ON private.notifications USING btree (id);

CREATE INDEX profiles_full_name_idx ON private.profiles USING btree (full_name);

CREATE UNIQUE INDEX profiles_pkey ON private.profiles USING btree (id);

alter table "private"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "private"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "private"."notifications" add constraint "notifications_club_id_fkey" FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE not valid;

alter table "private"."notifications" validate constraint "notifications_club_id_fkey";

alter table "private"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "private"."notifications" validate constraint "notifications_user_id_fkey";

alter table "private"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "private"."profiles" validate constraint "profiles_id_fkey";

create policy "Users can delete their own notifications"
on "private"."notifications"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "Users can view their own notifications"
on "private"."notifications"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Club members can view other member profiles"
on "private"."profiles"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM (club_members cm1
     JOIN club_members cm2 ON ((cm1.club_id = cm2.club_id)))
  WHERE ((cm1.user_id = auth.uid()) AND (cm2.user_id = profiles.id) AND (cm1.accepted = true) AND (cm2.accepted = true)))));


create policy "Users can insert their own profile"
on "private"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update their own profile"
on "private"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view their own profile"
on "private"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));


CREATE TRIGGER set_updated_at BEFORE UPDATE ON private.profiles FOR EACH ROW EXECUTE FUNCTION moddatetime('updated_at');


drop trigger if exists "set_updated_at" on "public"."profiles";

drop policy "Users can delete their own notifications" on "public"."notifications";

drop policy "Users can view their own notifications" on "public"."notifications";

drop policy "Club members can view other member profiles" on "public"."profiles";

drop policy "Users can insert their own profile" on "public"."profiles";

drop policy "Users can update their own profile" on "public"."profiles";

drop policy "Users can view their own profile" on "public"."profiles";

revoke delete on table "public"."notifications" from "anon";

revoke insert on table "public"."notifications" from "anon";

revoke references on table "public"."notifications" from "anon";

revoke select on table "public"."notifications" from "anon";

revoke trigger on table "public"."notifications" from "anon";

revoke truncate on table "public"."notifications" from "anon";

revoke update on table "public"."notifications" from "anon";

revoke delete on table "public"."notifications" from "authenticated";

revoke insert on table "public"."notifications" from "authenticated";

revoke references on table "public"."notifications" from "authenticated";

revoke select on table "public"."notifications" from "authenticated";

revoke trigger on table "public"."notifications" from "authenticated";

revoke truncate on table "public"."notifications" from "authenticated";

revoke update on table "public"."notifications" from "authenticated";

revoke delete on table "public"."notifications" from "service_role";

revoke insert on table "public"."notifications" from "service_role";

revoke references on table "public"."notifications" from "service_role";

revoke select on table "public"."notifications" from "service_role";

revoke trigger on table "public"."notifications" from "service_role";

revoke truncate on table "public"."notifications" from "service_role";

revoke update on table "public"."notifications" from "service_role";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke select on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke select on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."profiles" from "service_role";

revoke insert on table "public"."profiles" from "service_role";

revoke references on table "public"."profiles" from "service_role";

revoke select on table "public"."profiles" from "service_role";

revoke trigger on table "public"."profiles" from "service_role";

revoke truncate on table "public"."profiles" from "service_role";

revoke update on table "public"."profiles" from "service_role";

alter table "public"."notifications" drop constraint "notifications_club_id_fkey";

alter table "public"."notifications" drop constraint "notifications_user_id_fkey";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."notifications" drop constraint "notifications_pkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."notifications_pkey";

drop index if exists "public"."profiles_full_name_idx";

drop index if exists "public"."profiles_pkey";

drop table "public"."notifications";

drop table "public"."profiles";

create or replace view "public"."notifications" as  SELECT id,
    user_id,
    created_at,
    club_id,
    read,
    content
   FROM private.notifications n
  WHERE (user_id = auth.uid());


create or replace view "public"."profiles" as  SELECT id,
    created_at,
        CASE
            WHEN private_profile THEN NULL::text
            ELSE full_name
        END AS full_name,
        CASE
            WHEN private_profile THEN NULL::text
            ELSE nickname
        END AS nickname,
        CASE
            WHEN private_profile THEN NULL::text
            ELSE avatar_url
        END AS avatar_url,
        CASE
            WHEN private_profile THEN NULL::text
            ELSE bio
        END AS bio,
        CASE
            WHEN private_profile THEN NULL::text
            ELSE school
        END AS school,
    notifications_enabled
   FROM private.profiles p;



