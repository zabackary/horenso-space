create table "roles" (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references "clubs"(id) on delete cascade,
  name text not null,
  description text,
  permissions jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,

  check (
    extensions.json_matches_schema(
      '{
        "$schema": "https://json-schema.org/draft-07/schema",
        "$comment": "Permissions schema for roles; please keep in sync with supabase/schemas/roles.sql",
        "type": "object",
        "properties": {
          "canWriteFiles": {
            "type": "boolean",
            "description": "Determines if the user can upload and modify files"
          },
          "canReadFiles": {
            "type": "boolean",
            "description": "Determines if the user can view files"
          },
          "canWriteOwnReport": {
            "type": "boolean",
            "description": "Determines if the user can create and edit their own reports"
          },
          "canReadAllReports": {
            "type": "boolean",
            "description": "Determines if the user can view all reports"
          },
          "canWriteReportReview": {
            "type": "boolean",
            "description": "Determines if the user can create and edit their own report reviews for others"
          },
          "canWriteCalendar": {
            "type": "boolean",
            "description": "Determines if the user can create and edit calendar events"
          },
          "canReadCalendar": {
            "type": "boolean",
            "description": "Determines if the user can view calendar events"
          },
          "canManageClub": {
            "type": "boolean",
            "description": "Determines if the user can manage club settings and invite members"
          }
        },
        "required": [
          "canWriteFiles",
          "canReadFiles",
          "canWriteOwnReport",
          "canReadAllReports",
          "canWriteCalendar",
          "canReadCalendar",
          "canManageClub"
        ]
      }'::jsonb,
      permissions
    )
  )
);

create index on "roles" (club_id);

create trigger set_updated_at
  before update on "roles"
  for each row
  execute function extensions.moddatetime("updated_at");

alter table "roles"
  enable row level security;