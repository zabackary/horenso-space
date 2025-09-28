alter table "public"."roles" add constraint "roles_permissions_check" CHECK (jsonb_matches_schema('{
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
      }'::json, permissions)) not valid;

alter table "public"."roles" validate constraint "roles_permissions_check";


