drop trigger if exists "set_updated_at" on "private"."profiles";

drop policy "Club members can view other member profiles" on "private"."profiles";

drop policy "Users can insert their own profile" on "private"."profiles";

drop policy "Users can update their own profile" on "private"."profiles";

drop policy "Users can view their own profile" on "private"."profiles";

alter table "private"."profiles"
  drop constraint "profiles_id_fkey";

drop function if exists "public"."profiles_locale_get"();

drop function if exists "public"."profiles_locale_set"(new_locale text);

drop function if exists "public"."profiles_update_self"(p_full_name text, p_nickname text, p_avatar_url text, p_bio text, p_school text, p_notifications_enabled boolean, p_private_profile boolean);

drop function if exists "public"."profiles_get"(p_user_id uuid);

alter table "private"."profiles"
  drop constraint "profiles_pkey";

drop index if exists "private"."profiles_full_name_idx";

drop index if exists "private"."profiles_pkey";

create table "public"."profiles"(
  "id" uuid not null,
  "created_at" timestamp with time zone not null default now(),
  "updated_at" timestamp with time zone not null default now(),
  "full_name" text not null,
  "nickname" text,
  "avatar_url" text,
  "bio" text,
  "school" text,
  "private_profile" boolean not null default false,
  "locale" text,
  "push_notifications_preference" jsonb not null default '{}'::jsonb
);

alter table "public"."profiles" enable row level security;

create index profiles_full_name_idx on public.profiles using btree(full_name);

create unique index profiles_pkey on public.profiles using btree(id);

alter table "public"."profiles"
  add constraint "profiles_pkey" primary key using index "profiles_pkey";

alter table "public"."profiles"
  add constraint "profiles_id_fkey" foreign key (id) references auth.users(id) on delete cascade not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

create or replace function public.absence_reports_assigned_get(p_club_id uuid)
  returns table(
    id uuid,
    user_id uuid,
    user_name text,
    report_date date,
    event_id uuid,
    event_name text,
    event_start_time timestamp with time zone,
    event_end_time timestamp with time zone,
    assigned_to_role_id uuid,
    assigned_to_role_name text,
    reviews jsonb,
    data jsonb,
    form_id uuid)
  language sql
  stable
  set search_path to ''
  as $function$
  select
    ar.id,
    ar.user_id,
    coalesce(p_user.full_name, 'Unknown') as user_name,
    ar.date as report_date,
    ce.id as event_id,
    ce.title as event_name,
    ce.start_time as event_start_time,
    ce.end_time as event_end_time,
    ar.assigned_to_role as assigned_to_role_id,
    coalesce(r.name, 'Unknown') as assigned_to_role_name,
    coalesce(jsonb_agg(jsonb_build_object('id', arr.id, 'comments', arr.comments, 'accepted', arr.accepted, 'created_at', arr.created_at, 'reviewer_id', arr.reviewer_id, 'reviewer_name', coalesce(p_reviewer.full_name, 'Unknown'))
      order by arr.created_at) filter(where arr.id is not null), '[]'::jsonb) as reviews,
    ar.data,
    ar.form_id
  from
    public.absence_reports ar
  left join public.calendar_events ce on ar.event_id = ce.id
  left join public.profiles p_user on ar.user_id = p_user.id
  left join public.roles r on ar.assigned_to_role = r.id
  left join public.absence_report_reviews arr on ar.id = arr.absence_report_id
  left join public.profiles p_reviewer on arr.reviewer_id = p_reviewer.id
  inner join public.club_members cm on cm.role_id = ar.assigned_to_role
    and cm.user_id = auth.uid()
    and cm.accepted = true
where
  ar.club_id = p_club_id
  and not exists(
    select
      1
    from
      public.absence_report_reviews arr_reviewer
    where
      arr_reviewer.absence_report_id = ar.id
      and arr_reviewer.reviewer_id = auth.uid())
group by
  -- pgt-ignore typecheck Seems to work fine
  ar.id,
  ar.user_id,
  p_user.full_name,
  ar.date,
  ce.id,
  ce.title,
  ce.start_time,
  ce.end_time,
  ar.assigned_to_role,
  r.name,
  ar.data,
  ar.form_id
order by
  ar.date desc nulls last;
$function$;

create or replace function public.absence_reports_get(p_club_id uuid, p_user_id uuid default null::uuid, p_date date default null::date, p_report_id uuid default null::uuid, p_limit integer default null::integer, p_offset integer default 0)
  returns table(
    id uuid,
    user_id uuid,
    user_full_name text,
    user_avatar_url text,
    report_date date,
    event_id uuid,
    event_name text,
    event_start_time timestamp with time zone,
    event_end_time timestamp with time zone,
    assigned_to_role_id uuid,
    assigned_to_role_name text,
    submitted_at timestamp with time zone,
    reviews jsonb,
    approved boolean)
  language sql
  stable
  set search_path to ''
  as $function$
  select
    ar.id,
    ar.user_id,
    p_user.full_name,
    p_user.avatar_url,
    ar.date as report_date,
    ce.id as event_id,
    ce.title as event_name,
    ce.start_time as event_start_time,
    ce.end_time as event_end_time,
    ar.assigned_to_role as assigned_to_role_id,
    r.name as assigned_to_role_name,
    ar.created_at as submitted_at,
    coalesce(jsonb_agg(jsonb_build_object('id', arr.id, 'comments', arr.comments, 'accepted', arr.accepted, 'created_at', arr.created_at, 'reviewer_id', arr.reviewer_id, 'reviewer_name', p_reviewer.full_name)
      order by arr.created_at) filter(where arr.id is not null), '[]'::jsonb) as reviews,
    public.absence_reports_is_approved(ar.id) as approved
  from
    public.absence_reports ar
  left join public.calendar_events ce on ar.event_id = ce.id
  left join public.profiles p_user on ar.user_id = p_user.id
  left join public.roles r on ar.assigned_to_role = r.id
  left join public.absence_report_reviews arr on ar.id = arr.absence_report_id
  left join public.profiles p_reviewer on arr.reviewer_id = p_reviewer.id
where
  ar.club_id = p_club_id
  and(p_user_id is null
    or ar.user_id = p_user_id)
  and(p_date is null
    or ar.date = p_date)
  and(p_report_id is null
    or ar.id = p_report_id)
group by
  ar.id,
  ar.user_id,
  p_user.full_name,
  p_user.avatar_url,
  ar.date,
  ce.id,
  ce.title,
  ce.start_time,
  ce.end_time,
  ar.assigned_to_role,
  r.name
order by
  ar.date desc nulls last
limit p_limit offset p_offset;
$function$;

create or replace function public.create_user_profile()
  returns trigger
  language plpgsql
  security definer
  set search_path to ''
  as $function$
begin
  insert into public.profiles(id, full_name, avatar_url)
    values(new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.raw_user_meta_data ->> 'picture');
  return new;
end;
$function$;

create or replace function public.invitations_get(club_id uuid)
  returns table(
    id uuid,
    invited_by_name text,
    role_name text,
    created_at timestamp with time zone,
    expires_at timestamp with time zone,
    usage_count integer)
  language plpgsql
  security definer
  set search_path to ''
  as $function$
declare
begin
  if not public.user_has_club_permission($1, 'canManageClub') then
    raise exception 'Permission denied'
      using hint = 'You do not have permission to view invitations for this club.';
    end if;
    return query
    select
      invitations.id,
      profiles.full_name,
      roles.name,
      invitations.created_at,
      invitations.expires_at,
      invitations.usage_count
    from
      private.invitations
      join public.profiles on invitations.invited_by = profiles.id
      join public.roles on invitations.role_id = roles.id
    where
      invitations.club_id = $1;
end;
$function$;

create or replace function public.invitations_verify(invitation_id uuid)
  returns table(
    club_name text,
    role_name text,
    invited_by_name text,
    expires_at timestamp with time zone)
  language sql
  security definer
  set search_path to ''
  as $function$
  select
    clubs.name,
    roles.name,
    profiles.full_name,
    invitations.expires_at
  from
    private.invitations
    join public.clubs on invitations.club_id = clubs.id
    join public.roles on invitations.role_id = roles.id
    join public.profiles on invitations.invited_by = profiles.id
  where
    invitations.id = $1
    and invitations.expires_at > now();
$function$;

create or replace function public.profiles_get(p_user_id uuid)
  returns table(
    id uuid,
    created_at timestamp with time zone,
    full_name text,
    nickname text,
    avatar_url text,
    bio text,
    school text,
    private_profile boolean)
  language sql
  security definer
  set search_path to ''
  as $function$
  select
    id,
    created_at,
    full_name,
    nickname,
    avatar_url,
    bio,
    school,
    private_profile
  from
    public.profiles
  where
    id = p_user_id
    and(private_profile = false
      or id = auth.uid());
$function$;

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

create policy "Users can update their own profile" on "public"."profiles" as permissive
  for update to authenticated
    using ((id = auth.uid()))
    with check ((id = auth.uid()));

create policy "Users can view profiles in their clubs" on "public"."profiles" as permissive
  for select to authenticated
    using ((exists (
      select
        1
      from (public.club_members viewer
      join public.club_members target on (target.club_id = viewer.club_id))
    where ((viewer.user_id = auth.uid()) and (target.user_id = profiles.id)))));

create policy "Users can view their own profile" on "public"."profiles" as permissive
  for select to authenticated
    using ((id = auth.uid()));

create trigger set_updated_at
  before update on public.profiles
  for each row
  execute function extensions.moddatetime('updated_at');

insert into public.profiles
select
  id,
  created_at,
  updated_at,
  full_name,
  nickname,
  avatar_url,
  bio,
  school,
  private_profile,
  locale
from
  private.profiles;

drop table "private"."profiles";

