create function "public"."invitations_accept"(invitation_id uuid)
  returns void
  language plpgsql
  security definer
  set search_path to ''
  as $function$
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
$function$;

create function "public"."invitations_verify"(invitation_id uuid)
  returns table(
    club_name text,
    role_name text,
    invited_by_name text,
    expires_at timestamptz)
  language sql
  security definer
  set search_path to ''
  as $function$
  select
    clubs.name,
    roles.name,
    profiles.full_name,
    invitations.expires_at
  from
    private.invitations
    join public.clubs on invitations.club_id = clubs.id
    join public.roles on invitations.role_id = roles.id
    join public.profiles on invitations.invited_by = profiles.id
  where
    invitations.id = $1
    and invitations.expires_at > now();
$function$;

create function "public"."invitations_create"(new_club_id uuid, role_id uuid, expires_at timestamptz)
  returns uuid
  language plpgsql
  security definer
  set search_path to ''
  as $function$
declare
  v_invitation_id uuid;
begin
  if expires_at <= now() then
    raise exception 'Expiration time must be in the future'
      using hint = 'Please provide a valid expiration time that is later than the current time.';
    end if;
    if not public.user_has_club_permission(new_club_id, 'canManageClub') then
      raise exception 'Permission denied to create invitation for this club'
        using hint = 'You do not have the necessary permissions to create an invitation for this club.';
      end if;
      insert into private.invitations(invited_by, club_id, role_id, expires_at)
        values (auth.uid(), new_club_id, role_id, expires_at)
      returning
        id into v_invitation_id;
      return v_invitation_id;
end;
$function$;

create function "public"."invitations_delete"(invitation_id uuid)
  returns void
  language plpgsql
  security definer
  set search_path to ''
  as $function$
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
$function$;

create function "public"."invitations_get"(club_id uuid)
  returns table(
    id uuid,
    invited_by_name text,
    role_name text,
    created_at timestamptz,
    expires_at timestamptz,
    usage_count int)
  language plpgsql
  security definer
  set search_path to ''
  as $function$
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
      join public.profiles on invitations.invited_by = profiles.id
      join public.roles on invitations.role_id = roles.id
    where
      invitations.club_id = $1;
end;
$function$;

