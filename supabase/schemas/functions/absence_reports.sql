-- Helper function to fetch absence reports with user profiles and assigned role
-- Returns absence reports for a club with associated event and review data
create function public.absence_reports_get(p_club_id uuid, p_user_id uuid default null, p_date date default null, p_report_id uuid default null, p_limit int default null, p_offset int default 0)
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
  as $$
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
  -- pgt-ignore typecheck Seems to work fine
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
$$;

-- Helper function to fetch absence reports assigned to current user's roles
-- Returns reports where the current user has a role matching the assigned_to_role
create function public.absence_reports_assigned_get(p_club_id uuid)
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
  as $$
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
$$;

