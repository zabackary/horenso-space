set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_review_creation()
 RETURNS trigger
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if(
    select
      r.absence_report_approval_required
    from
      public.roles r
    where
      r.id =(
      select
        cm.role_id
      from
        public.club_members cm
      where
        cm.user_id = new.reviewer_id and cm.accepted = true)) then
    update
      public.absence_reports
    set
      assigned_to_role =(
        select
          r.absence_report_reviewer_role
        from
          public.roles r
        where
          r.id =(
            select
              cm.role_id
            from
              public.club_members cm
            where
              cm.user_id = new.reviewer_id
              and cm.accepted = true))
      where
        id = new.absence_report_id;
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_review_approved(p_review_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_checked_roles uuid[] := array[]::uuid[];
  v_current_report_id uuid;
  v_current_role_id uuid;
  v_approval_required boolean;
  v_reviewer_role_id uuid;
begin
  -- Get the initial absence report and reviewer's role
  select
    arr.absence_report_id,
    cm.role_id into v_current_report_id,
    v_current_role_id
  from
    absence_report_reviews arr
    join public.club_members cm on cm.user_id = arr.reviewer_id
      and cm.accepted = true
  where
    arr.id = p_review_id;
  loop
    -- Check if we've already checked this role (prevent recursion loops)
    if v_current_role_id = any (v_checked_roles) then
      return false;
    end if;
    v_checked_roles := array_append(v_checked_roles, v_current_role_id);
    -- Check if this role requires approval
    select
      absence_report_approval_required into v_approval_required
    from
      public.roles
    where
      id = v_current_role_id;
    -- If approval not required, the chain is complete - return true
    if not v_approval_required then
      return true;
    end if;
    -- Get the reviewer role that should approve next
    select
      absence_report_reviewer_role into v_reviewer_role_id
    from
      public.roles
    where
      id = v_current_role_id;
    -- Check if someone with the reviewer role has accepted a review for this report
    select
      cm.role_id into v_current_role_id
    from
      absence_report_reviews arr
      join public.club_members cm on cm.user_id = arr.reviewer_id
        and cm.accepted = true
    where
      arr.absence_report_id = v_current_report_id
      and cm.role_id = v_reviewer_role_id
      and arr.accepted = true;
    -- If no review found from the next role, not fully approved
    if v_current_role_id is null then
      return false;
    end if;
  end loop;
end;
$function$
;

CREATE TRIGGER handle_review_creation AFTER INSERT ON public.absence_report_reviews FOR EACH ROW EXECUTE FUNCTION public.handle_review_creation();


