drop function if exists "public"."invintations_verify"(invitation_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.invitations_verify(invitation_id uuid)
 RETURNS TABLE(club_name text, role_name text, invited_by_name text, expires_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    clubs.name,
    roles.name,
    profiles.full_name,
    invitations.expires_at
  from
    private.invitations
    join public.clubs on invitations.club_id = clubs.id
    join public.roles on invitations.role_id = roles.id
    join private.profiles on invitations.invited_by = profiles.id
  where
    invitations.id = $1
    and invitations.expires_at > now();
$function$
;


