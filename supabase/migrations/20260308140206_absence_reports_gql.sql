set role "postgres";

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

