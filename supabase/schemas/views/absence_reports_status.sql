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

comment on view public.absence_reports_status is '
  @graphql({
    "primary_key_columns": ["report_id"],
    "foreign_keys": [
      {
        "local_columns": ["report_id"],
        "foreign_schema": "public",
        "foreign_table": "absence_reports",
        "foreign_columns": ["id"]
      },
      {
        "local_columns": ["report_user_id"],
        "foreign_schema": "public",
        "foreign_table": "profiles",
        "foreign_columns": ["id"]
      },
      {
        "local_columns": ["club_id"],
        "foreign_schema": "public",
        "foreign_table": "clubs",
        "foreign_columns": ["id"]
      }
    ]
  })
';

