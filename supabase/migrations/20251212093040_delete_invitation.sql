alter table "private"."invitations" add column "usage_count" integer not null default 0;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_invitation(invitation_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not public.user_has_club_permission((
    select
      club_id
    from private.invitations
    where
      id = invitation_id), 'canManageClub') then
    raise exception 'Permission denied to delete this invitation'
      using hint = 'You do not have the necessary permissions to delete this invitation.';
    end if;
    delete from private.invitations
    where id = invitation_id;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.accept_invitation(invitation_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_club_id uuid;
  v_role_id uuid;
begin
  select
    club_id,
    role_id into v_club_id,
    v_role_id
  from
    private.invitations
  where
    id = invitation_id;
  if not found then
    raise exception 'Invitation not found'
      using hint = 'The invitation ID provided does not exist.';
    end if;
    if (
      select
        now() > expires_at
      from
        private.invitations
      where
        id = invitation_id) then
      raise exception 'Invitation expired'
        using hint = 'The invitation has expired and can no longer be accepted.';
      end if;
      insert into public.club_members(club_id, user_id, role_id, accepted)
        values (v_club_id, auth.uid(), v_role_id, true);
      update
        private.invitations
      set
        usage_count = usage_count + 1
      where
        id = invitation_id;
end;
$function$
;


