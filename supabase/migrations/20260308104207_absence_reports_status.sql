create or replace view "public"."absence_reports_status" with ( security_invoker = on,
security_barrier = on
) as
select
    id as report_id,
    user_id as report_user_id,
    club_id,
    public.absence_reports_is_approved(
        id
) as is_approved
from
    public.absence_reports ar;

