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
