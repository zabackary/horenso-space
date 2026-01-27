set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.absence_reports_get(p_club_id uuid, p_user_id uuid DEFAULT NULL::uuid, p_date date DEFAULT NULL::date, p_report_id uuid DEFAULT NULL::uuid, p_limit integer DEFAULT NULL::integer, p_offset integer DEFAULT 0)
 RETURNS TABLE(id uuid, user_id uuid, user_name text, report_date date, event_id uuid, event_name text, event_start_time timestamp with time zone, event_end_time timestamp with time zone, assigned_to_role_id uuid, assigned_to_role_name text, reviews jsonb, approved boolean)
 LANGUAGE sql
 STABLE
AS $function$
  select
    ar.id,
    ar.user_id,
    p_user.full_name,
    ar.date as report_date,
    ce.id as event_id,
    ce.title as event_name,
    ce.start_time as event_start_time,
    ce.end_time as event_end_time,
    ar.assigned_to_role as assigned_to_role_id,
    r.name as assigned_to_role_name,
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
$function$
;

CREATE OR REPLACE FUNCTION public.absence_reports_is_approved(p_report_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_checked_roles uuid[] := array[]::uuid[];
  v_current_role_id uuid;
  v_approval_required boolean;
  v_reviewer_role_id uuid;
begin
  -- Get the report creator's role
  select
    cm.role_id into v_current_role_id
  from
    public.absence_reports ar
    join public.club_members cm on cm.user_id = ar.user_id
      and cm.club_id = ar.club_id
      and cm.accepted = true
  where
    ar.id = p_report_id;
  -- If no role found for report creator, report cannot be approved
  if v_current_role_id is null then
    return false;
  end if;
  loop
    -- Check if we've already checked this role (prevent recursion loops)
    if v_current_role_id = any (v_checked_roles) then
      return false;
    end if;
    v_checked_roles := array_append(v_checked_roles, v_current_role_id);
    -- Check if this role requires approval and get the reviewer role
    select
      absence_report_approval_required,
      absence_report_reviewer_role into v_approval_required,
      v_reviewer_role_id
    from
      public.roles
    where
      id = v_current_role_id;
    -- If approval not required, the chain is complete - return true
    if not v_approval_required then
      return true;
    end if;
    -- If approval is required but there's no reviewer role set, it is treated as approved
    if v_reviewer_role_id is null then
      return true;
    end if;
    -- Check if someone with the reviewer role has accepted a review for this report
    select
      cm.role_id into v_current_role_id
    from
      public.absence_report_reviews arr
      join public.club_members cm on cm.user_id = arr.reviewer_id
        and cm.accepted = true
    where
      arr.absence_report_id = p_report_id
      and cm.role_id = v_reviewer_role_id
      and arr.accepted = true
    limit 1;
    -- If no review found from the next role, not fully approved
    if v_current_role_id is null then
      return false;
    end if;
    -- Move up to the reviewer role for next iteration
    v_current_role_id := v_reviewer_role_id;
  end loop;
end;
$function$
;


