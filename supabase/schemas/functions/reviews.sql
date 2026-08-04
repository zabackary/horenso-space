-- When an absence report is created, assign it to the appropriate role if
-- the creator's role has an absence_report_reviewer_role set
create function public.assign_new_report()
  returns trigger
  language plpgsql
  security definer -- runs with max privileges, so we need to validate inputs
  set search_path to ''
  as $$
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
$$;

create trigger assign_new_report
  before insert on absence_reports for each row
  execute function public.assign_new_report();

-- When an absence report review is created and is accepted, if the person creating the review's
-- role has an absence_report_reviewer_role and absence_report_approval_required
-- is true, then set the absence report's assigned_to_role to that role.
create function public.handle_review_creation()
  returns trigger
  language plpgsql
  security definer -- runs with max privileges, so we need to validate inputs
  set search_path to ''
  as $$
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
$$;

create trigger handle_review_creation
  after insert on absence_report_reviews for each row
  execute function public.handle_review_creation();

-- checks whether a report is approved.
-- that means starting from the report creator's role, we recurse up the reviewer hierarchy
-- checking that each role that requires approval has an accepted review from their reviewer role
-- repeating until a role with absence_report_approval_required = false is found
-- or a reviewer role has already been checked (to prevent recursion loops)
create function public.absence_reports_is_approved(p_report_id uuid)
  returns boolean
  language plpgsql
  security definer stable
  set search_path to ''
  as $$
declare
  v_checked_roles uuid[] := array[]::uuid[];
  v_current_role_id uuid;
  v_current_approved boolean;
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
    -- Check if someone with the reviewer role has a review for this report
    select
      cm.role_id,
      arr.accepted into v_current_role_id,
      v_current_approved
    from
      public.absence_report_reviews arr
      join public.club_members cm on cm.user_id = arr.reviewer_id
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
$$;

