set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_report_creation()
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

CREATE OR REPLACE FUNCTION public.handle_review_creation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if(new.accepted) then
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
  end if;
  return new;
end;
$function$
;

CREATE TRIGGER handle_report_creation BEFORE INSERT ON public.absence_reports FOR EACH ROW EXECUTE FUNCTION public.handle_report_creation();


