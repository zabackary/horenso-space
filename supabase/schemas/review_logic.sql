-- When an absence report review is created and is accepted, if the person creating the review's
-- role has an absence_report_reviewer_role and absence_report_approval_required
-- is true, then set the absence report's assigned_to_role to that role.
create or replace function public.handle_review_creation()
returns trigger
language plpgsql
security definer -- runs with max privileges, so we need to validate inputs
set search_path to ''
as $$
begin
  if new.accepted then
    if (
      select
        r.absence_report_approval_required
      from
        public.roles r
      where
        r.id = (
          select
            cm.role_id
          from
            public.club_members cm
          where
            cm.user_id = new.reviewer_id
            and cm.accepted = true
        )
    ) then
      update public.absence_reports
      set assigned_to_role = (
        select
          r.absence_report_reviewer_role
        from
          public.roles r
        where
          r.id = (
            select
              cm.role_id
            from
              public.club_members cm
            where
              cm.user_id = new.reviewer_id
              and cm.accepted = true
          )
      )
      where id = new.absence_report_id;
    end if;
  end if;
  return new;
end;
$$;

create trigger handle_review_creation
  after insert on absence_report_reviews
  for each row
  execute function public.handle_review_creation();

-- checks whether a review is approved.
-- that means that the review's creator's role's absence_report_approval_required is true
-- and their reviewer role has approved the review, repeating until a role with absence_report_approval_required = false is found
-- or a reviewer role has already been checked (to prevent recursion loops)
create or replace function public.is_review_approved(p_review_id uuid)
returns boolean
language plpgsql
security definer stable
set search_path to ''
as $$
declare
  v_checked_roles uuid[] := array[]::uuid[];
  v_current_report_id uuid;
  v_current_role_id uuid;
  v_approval_required boolean;
  v_reviewer_role_id uuid;
begin
  -- Get the initial absence report and reviewer's role
  select arr.absence_report_id, cm.role_id
  into v_current_report_id, v_current_role_id
  from absence_report_reviews arr
  join public.club_members cm on cm.user_id = arr.reviewer_id and cm.accepted = true
  where arr.id = p_review_id;

  loop
    -- Check if we've already checked this role (prevent recursion loops)
    if v_current_role_id = any(v_checked_roles) then
      return false;
    end if;

    v_checked_roles := array_append(v_checked_roles, v_current_role_id);

    -- Check if this role requires approval
    select absence_report_approval_required into v_approval_required
    from public.roles where id = v_current_role_id;

    -- If approval not required, the chain is complete - return true
    if not v_approval_required then
      return true;
    end if;

    -- Get the reviewer role that should approve next
    select absence_report_reviewer_role into v_reviewer_role_id
    from public.roles where id = v_current_role_id;

    -- Check if someone with the reviewer role has accepted a review for this report
    select cm.role_id
    into v_current_role_id
    from absence_report_reviews arr
    join public.club_members cm on cm.user_id = arr.reviewer_id and cm.accepted = true
    where arr.absence_report_id = v_current_report_id 
      and cm.role_id = v_reviewer_role_id 
      and arr.accepted = true;

    -- If no review found from the next role, not fully approved
    if v_current_role_id is null then
      return false;
    end if;
  end loop;
end;
$$;