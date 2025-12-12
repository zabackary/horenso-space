drop function if exists "public"."create_invitation"(club_id uuid, role_id uuid, expires_at timestamp with time zone);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_invitation(id uuid, role_id uuid, expires_at timestamp with time zone)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_invitation_id uuid;
begin
  if expires_at <= now() then
    raise exception 'Expiration time must be in the future'
      using hint = 'Please provide a valid expiration time that is later than the current time.';
    end if;
    if not public.user_has_club_permission(id, 'canManageClub') then
      raise exception 'Permission denied to create invitation for this club'
        using hint = 'You do not have the necessary permissions to create an invitation for this club.';
      end if;
      insert into private.invitations(invited_by, club_id, role_id, expires_at)
        values (auth.uid(), id, role_id, expires_at)
      returning
        id into v_invitation_id;
      return v_invitation_id;
end;
$function$
;


