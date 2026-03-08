SET ROLE "postgres";
SET check_function_bodies = false;
ALTER TABLE public.roles DROP CONSTRAINT roles_permissions_check;
CREATE OR REPLACE FUNCTION public.add_creator_as_club_member()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  new_role_id uuid;
begin
  if new.created_by is not null then
    -- Create a new role with all permissions
    insert into public.roles(club_id, name, permissions)
      values (new.id, 'Default role', '{
      "canWriteFiles": true,
      "canReadFiles": true,
      "canWriteOwnReport": true,
      "canReadAllReports": true,
      "canWriteReportReview": true,
      "canWriteCalendar": true,
      "canReadCalendar": true,
      "canManageClub": true,
      "canDeleteOwnReport": true,
      "canDeleteAllReports": true
    }'::jsonb)
    returning
      id into new_role_id;
    -- Add the creator as a member with the new role
    insert into public.club_members(club_id, user_id, role_id, accepted)
      values (new.id, new.created_by, new_role_id, true);
  end if;
  return new;
end;
$function$;
CREATE POLICY "Authorized users can delete any club report" ON public.absence_reports FOR DELETE USING (public.user_has_club_permission(club_id, 'canDeleteAllReports'::text));
CREATE POLICY "Users can delete their own absence reports" ON public.absence_reports FOR DELETE USING (((user_id = auth.uid()) AND public.user_has_club_permission(club_id, 'canDeleteOwnReport'::text)));
GRANT UPDATE (read) ON public.notifications TO authenticated;
ALTER TABLE public.roles ADD CONSTRAINT roles_permissions_check CHECK (extensions.jsonb_matches_schema('{
  "$schema": "https://json-schema.org/draft-07/schema",
  "$comment": "Permissions schema for roles; please keep in sync with supabase/schemas/public/clubs.sql and supabase/schemas/roles.sql",
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
    "canDeleteOwnReport": {
      "type": "boolean",
      "description": "Determines if the user can delete their own reports"
    },
    "canDeleteAllReports": {
      "type": "boolean",
      "description": "Determines if the user can delete all reports"
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
  }
}'::json, permissions));
