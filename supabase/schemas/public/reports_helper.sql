-- Helper function to fetch absence reports with user profiles and assigned role
-- Returns absence reports for a club with associated event and review data
create or replace function public.get_absence_reports(
  p_club_id uuid,
  p_user_id uuid DEFAULT NULL
)
returns table (
  id uuid,
  user_id uuid,
  user_name text,
  event_id uuid,
  event_name text,
  event_start_time timestamp with time zone,
  event_end_time timestamp with time zone,
  assigned_to_role_id uuid,
  assigned_to_role_name text,
  reviews jsonb
)
language sql
stable
as $$
  select
    ar.id,
    ar.user_id,
    coalesce(p_user.full_name, 'Unknown') as user_name,
    ce.id as event_id,
    ce.title as event_name,
    ce.start_time as event_start_time,
    ce.end_time as event_end_time,
    ar.assigned_to_role as assigned_to_role_id,
    coalesce(r.name, 'Unknown') as assigned_to_role_name,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', arr.id,
          'comments', arr.comments,
          'accepted', arr.accepted,
          'created_at', arr.created_at,
          'reviewer_id', arr.reviewer_id,
          'reviewer_name', coalesce(p_reviewer.full_name, 'Unknown')
        )
        order by arr.created_at
      ) filter (where arr.id is not null),
      '[]'::jsonb
    ) as reviews
  from
    public.absence_reports ar
    left join public.calendar_events ce on ar.event_id = ce.id
    left join public.profiles p_user on ar.user_id = p_user.id
    left join public.roles r on ar.assigned_to_role = r.id
    left join public.absence_report_reviews arr on ar.id = arr.absence_report_id
    left join public.profiles p_reviewer on arr.reviewer_id = p_reviewer.id
  where
    ar.club_id = p_club_id
    and (p_user_id is null or ar.user_id = p_user_id)
  group by
    ar.id,
    ar.user_id,
    p_user.full_name,
    ce.id,
    ce.title,
    ce.start_time,
    ce.end_time,
    ar.assigned_to_role,
    r.name
  order by
    ce.start_time desc nulls last;
$$;

grant execute on function public.get_absence_reports(uuid, uuid) to authenticated;
