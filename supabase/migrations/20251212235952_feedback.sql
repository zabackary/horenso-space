
  create table "public"."feedback_submissions" (
    "id" uuid not null default extensions.gen_random_uuid(),
    "club_id" uuid,
    "user_id" uuid,
    "feedback" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."feedback_submissions" enable row level security;

CREATE UNIQUE INDEX feedback_submissions_pkey ON public.feedback_submissions USING btree (id);

alter table "public"."feedback_submissions" add constraint "feedback_submissions_pkey" PRIMARY KEY using index "feedback_submissions_pkey";

alter table "public"."feedback_submissions" add constraint "feedback_submissions_club_id_fkey" FOREIGN KEY (club_id) REFERENCES public.clubs(id) ON DELETE SET NULL not valid;

alter table "public"."feedback_submissions" validate constraint "feedback_submissions_club_id_fkey";

alter table "public"."feedback_submissions" add constraint "feedback_submissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."feedback_submissions" validate constraint "feedback_submissions_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_absence_reports(p_club_id uuid, p_user_id uuid DEFAULT NULL::uuid)
 RETURNS TABLE(id uuid, user_id uuid, user_name text, report_date date, event_id uuid, event_name text, event_start_time timestamp with time zone, event_end_time timestamp with time zone, assigned_to_role_id uuid, assigned_to_role_name text, reviews jsonb)
 LANGUAGE sql
 STABLE
AS $function$
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
      order by arr.created_at) filter(where arr.id is not null), '[]'::jsonb) as reviews
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
  r.name
order by
  ar.date desc nulls last;
$function$
;

CREATE OR REPLACE FUNCTION public.get_assigned_absence_reports(p_club_id uuid)
 RETURNS TABLE(id uuid, user_id uuid, user_name text, report_date date, event_id uuid, event_name text, event_start_time timestamp with time zone, event_end_time timestamp with time zone, assigned_to_role_id uuid, assigned_to_role_name text, reviews jsonb, data jsonb, form_id uuid)
 LANGUAGE sql
 STABLE
AS $function$
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
$function$
;

grant delete on table "public"."feedback_submissions" to "anon";

grant insert on table "public"."feedback_submissions" to "anon";

grant references on table "public"."feedback_submissions" to "anon";

grant select on table "public"."feedback_submissions" to "anon";

grant trigger on table "public"."feedback_submissions" to "anon";

grant truncate on table "public"."feedback_submissions" to "anon";

grant update on table "public"."feedback_submissions" to "anon";

grant delete on table "public"."feedback_submissions" to "authenticated";

grant insert on table "public"."feedback_submissions" to "authenticated";

grant references on table "public"."feedback_submissions" to "authenticated";

grant select on table "public"."feedback_submissions" to "authenticated";

grant trigger on table "public"."feedback_submissions" to "authenticated";

grant truncate on table "public"."feedback_submissions" to "authenticated";

grant update on table "public"."feedback_submissions" to "authenticated";

grant delete on table "public"."feedback_submissions" to "service_role";

grant insert on table "public"."feedback_submissions" to "service_role";

grant references on table "public"."feedback_submissions" to "service_role";

grant select on table "public"."feedback_submissions" to "service_role";

grant trigger on table "public"."feedback_submissions" to "service_role";

grant truncate on table "public"."feedback_submissions" to "service_role";

grant update on table "public"."feedback_submissions" to "service_role";


  create policy "Users can create feedback submissions for their clubs"
  on "public"."feedback_submissions"
  as permissive
  for insert
  to public
with check (((user_id = auth.uid()) AND ((club_id IS NULL) OR (EXISTS ( SELECT 1
   FROM public.club_members
  WHERE ((club_members.club_id = feedback_submissions.club_id) AND (club_members.user_id = auth.uid()) AND (club_members.accepted = true)))))));



