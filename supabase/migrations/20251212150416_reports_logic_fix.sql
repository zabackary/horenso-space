drop function if exists "public"."is_review_approved"(p_review_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_report_approved(p_report_id uuid)
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


