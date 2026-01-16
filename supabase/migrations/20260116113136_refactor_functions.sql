drop trigger if exists "handle_report_creation" on "public"."absence_reports";

drop function if exists "public"."accept_invitation"(invitation_id uuid);

drop function if exists "public"."create_invitation"(new_club_id uuid, role_id uuid, expires_at timestamp with time zone);

drop function if exists "public"."current_locale"();

drop function if exists "public"."delete_invitation"(invitation_id uuid);

drop function if exists "public"."get_absence_reports"(p_club_id uuid, p_user_id uuid);

drop function if exists "public"."get_assigned_absence_reports"(p_club_id uuid);

drop function if exists "public"."get_invitations"(club_id uuid);

drop function if exists "public"."handle_report_creation"();

drop function if exists "public"."is_report_approved"(p_report_id uuid);

drop function if exists "public"."set_current_locale"(new_locale text);

drop function if exists "public"."verify_invitation"(invitation_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.absence_reports_assigned_get(p_club_id uuid)
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
$function$
;

CREATE OR REPLACE FUNCTION public.absence_reports_get(p_club_id uuid, p_user_id uuid DEFAULT NULL::uuid)
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
    -- If approval is required but there's no reviewer role set, cannot be approved
    if v_reviewer_role_id is null then
      return false;
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

CREATE OR REPLACE FUNCTION public.assign_new_report()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_reviewer_role uuid;
begin
  select
    r.absence_report_reviewer_role into v_reviewer_role
  from
    public.roles r
  where
    r.id =(
      select
        cm.role_id
      from
        public.club_members cm
      where
        cm.user_id = new.user_id
        and cm.club_id = new.club_id
        and cm.accepted = true);
  if v_reviewer_role is not null then
    new.assigned_to_role := v_reviewer_role;
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.invintations_accept(invitation_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_club_id uuid;
  v_role_id uuid;
begin
  select
    club_id,
    role_id into v_club_id,
    v_role_id
  from
    private.invitations
  where
    id = invitation_id;
  if not found then
    raise exception 'Invitation not found'
      using hint = 'The invitation ID provided does not exist.';
    end if;
    if (
      select
        now() > expires_at
      from
        private.invitations
      where
        id = invitation_id) then
      raise exception 'Invitation expired'
        using hint = 'The invitation has expired and can no longer be accepted.';
      end if;
      insert into public.club_members(club_id, user_id, role_id, accepted)
        values (v_club_id, auth.uid(), v_role_id, true);
      update
        private.invitations
      set
        usage_count = usage_count + 1
      where
        id = invitation_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.invintations_create(new_club_id uuid, role_id uuid, expires_at timestamp with time zone)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_invitation_id uuid;
begin
  if expires_at <= now() then
    raise exception 'Expiration time must be in the future'
      using hint = 'Please provide a valid expiration time that is later than the current time.';
    end if;
    if not public.user_has_club_permission(new_club_id, 'canManageClub') then
      raise exception 'Permission denied to create invitation for this club'
        using hint = 'You do not have the necessary permissions to create an invitation for this club.';
      end if;
      insert into private.invitations(invited_by, club_id, role_id, expires_at)
        values (auth.uid(), new_club_id, role_id, expires_at)
      returning
        id into v_invitation_id;
      return v_invitation_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.invintations_delete(invitation_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not public.user_has_club_permission((
    select
      club_id
    from private.invitations
    where
      id = invitation_id), 'canManageClub') then
    raise exception 'Permission denied to delete this invitation'
      using hint = 'You do not have the necessary permissions to delete this invitation.';
    end if;
    delete from private.invitations
    where id = invitation_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.invintations_get(club_id uuid)
 RETURNS TABLE(id uuid, invited_by_name text, role_name text, created_at timestamp with time zone, expires_at timestamp with time zone, usage_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
      join private.profiles on invitations.invited_by = profiles.id
      join public.roles on invitations.role_id = roles.id
    where
      invitations.club_id = $1;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.invintations_verify(invitation_id uuid)
 RETURNS TABLE(club_name text, role_name text, invited_by_name text, expires_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    clubs.name,
    roles.name,
    profiles.full_name,
    invitations.expires_at
  from
    private.invitations
    join public.clubs on invitations.club_id = clubs.id
    join public.roles on invitations.role_id = roles.id
    join private.profiles on invitations.invited_by = profiles.id
  where
    invitations.id = $1
    and invitations.expires_at > now();
$function$
;

CREATE OR REPLACE FUNCTION public.profiles_locale_get()
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    locale
  from
    private.profiles
  where
    id = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.profiles_locale_set(new_locale text)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  update
    private.profiles
  set
    locale = new_locale
  where
    id = auth.uid();
$function$
;

CREATE TRIGGER assign_new_report BEFORE INSERT ON public.absence_reports FOR EACH ROW EXECUTE FUNCTION public.assign_new_report();


