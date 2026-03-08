create view public.absence_reports_status with ( security_invoker = on,
security_barrier = on
) as
select
  ar.id as report_id,
  ar.user_id as report_user_id,
  ar.club_id,
  public.absence_reports_is_approved(
    ar.id
) as is_approved
from
  absence_reports ar;

