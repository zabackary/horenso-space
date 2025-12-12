set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_invitations(club_id uuid)
 RETURNS TABLE(id uuid, invited_by_name text, role_name text, created_at timestamp with time zone, usage_count integer, expires_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
begin
  if not public.user_has_club_permission($1, 'canManageClub') then
    raise exception 'Permission denied'
      using hint = 'You do not have permission to view invitations for this club.';
    end if;
    return query
    select
      invitations.id,
      profiles.full_name,
      roles.name,
      invitations.created_at,
      invitations.expires_at,
      invitations.usage_count
    from
      private.invitations
      join private.profiles on invitations.invited_by = profiles.id
      join public.roles on invitations.role_id = roles.id
    where
      invitations.club_id = $1;
end;
$function$
;


