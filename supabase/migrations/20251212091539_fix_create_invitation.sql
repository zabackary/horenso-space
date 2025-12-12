set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_invitation(club_id uuid, role_id uuid, expires_at timestamp with time zone)
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
    if not exists (
      select
        1
      from
        public.club_members
      where
        club_members.club_id = club_id
        and club_members.user_id = auth.uid()
        and club_members.role_id in (
          select
            id
          from
            public.roles
          where
            roles.club_id = club_id
            and permissions -> 'can_manage_club' = 'true')) then
      raise exception 'Permission denied to create invitation for this club'
      using hint = 'You do not have the necessary permissions to create an invitation for this club.';
    end if;
    insert into private.invitations(invited_by, club_id, role_id, expires_at)
      values (auth.uid(), club_id, role_id, expires_at)
    returning
      id into v_invitation_id;
    return v_invitation_id;
end;
$function$
;


