SET ROLE "postgres";
SET check_function_bodies = false;

-- Scope the reviewer's role lookup in handle_review_creation() to the
-- report's club. Previously it looked up club_members by reviewer_id and
-- accepted = true only, with no club_id filter; if the reviewer belongs to
-- more than one club (multiple accepted club_members rows), the scalar
-- subquery returned more than one row and raised
-- "more than one row returned by a subquery used as an expression" on
-- INSERT into absence_report_reviews.
CREATE OR REPLACE FUNCTION public.handle_review_creation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_club_id uuid;
  v_reviewer_role_id uuid;
  v_approval_required boolean;
  v_reviewer_role uuid;
begin
  if(new.accepted) then
    select
      club_id into v_club_id
    from
      public.absence_reports
    where
      id = new.absence_report_id;
    -- Scope the reviewer's role lookup to the report's club, since a
    -- reviewer may belong to more than one club (and hence have more than
    -- one club_members row)
    select
      cm.role_id into v_reviewer_role_id
    from
      public.club_members cm
    where
      cm.user_id = new.reviewer_id
      and cm.club_id = v_club_id
      and cm.accepted = true;
    if v_reviewer_role_id is not null then
      select
        r.absence_report_approval_required,
        r.absence_report_reviewer_role into v_approval_required,
        v_reviewer_role
      from
        public.roles r
      where
        r.id = v_reviewer_role_id;
      if v_approval_required then
        update
          public.absence_reports
        set
          assigned_to_role = v_reviewer_role
        where
          id = new.absence_report_id;
      end if;
    end if;
  end if;
  return new;
end;
$function$;

-- Same class of bug in absence_reports_is_approved(): the reviewer role
-- lookup joined club_members by reviewer_id and accepted = true without a
-- club_id filter, relying on the (app-enforced only, not DB-enforced)
-- invariant that a role's club always matches the membership row it's
-- attached to. Scope it explicitly to the report's club for defense in
-- depth; the existing "limit 1" is kept since more than one member can
-- hold the reviewer role and have reviewed the same report.
CREATE OR REPLACE FUNCTION public.absence_reports_is_approved(p_report_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_checked_roles uuid[] := array[]::uuid[];
  v_current_role_id uuid;
  v_current_approved boolean;
  v_approval_required boolean;
  v_reviewer_role_id uuid;
  v_club_id uuid;
begin
  -- Get the report creator's role and club
  select
    cm.role_id,
    ar.club_id into v_current_role_id,
    v_club_id
  from
    public.absence_reports ar
    join public.club_members cm on cm.user_id = ar.user_id
      and cm.club_id = ar.club_id
      and cm.accepted = true
  where
    ar.id = p_report_id;
  -- If no role found for report creator, report cannot be approved
  if v_current_role_id is null then
    return null;
  end if;
  loop
    -- Check if we've already checked this role (prevent recursion loops)
    if v_current_role_id = any (v_checked_roles) then
      return null;
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
    -- Check if someone with the reviewer role has a review for this report.
    -- Scope the reviewer lookup to the report's club, since a reviewer may
    -- belong to more than one club (and hence have more than one
    -- club_members row); limit 1 because more than one member may hold the
    -- reviewer role and have reviewed the report.
    select
      cm.role_id,
      arr.accepted into v_current_role_id,
      v_current_approved
    from
      public.absence_report_reviews arr
      join public.club_members cm on cm.user_id = arr.reviewer_id
        and cm.club_id = v_club_id
        and cm.accepted = true
    where
      arr.absence_report_id = p_report_id
      and cm.role_id = v_reviewer_role_id
    limit 1;
    -- If the review is not accepted, report is not approved
    if v_current_role_id is not null and not v_current_approved then
      return false;
    end if;
    -- If no review for this role yet, report is pending, return null
    if v_current_role_id is null then
      return null;
    end if;
    -- Move up to the reviewer role for next iteration
    v_current_role_id := v_reviewer_role_id;
  end loop;
end;
$function$;
