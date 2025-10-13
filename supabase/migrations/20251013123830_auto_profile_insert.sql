create or replace function public.add_creator_as_club_member()
  returns trigger
  language plpgsql
  security definer
  set search_path = ''
  as $$
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
      "canManageClub": true
    }'::jsonb)
    returning
      id into new_role_id;
    -- Add the creator as a member with the new role
    insert into public.club_members(club_id, user_id, role_id, accepted)
      values (new.id, new.created_by, new_role_id, true);
  end if;
  return new;
end;
$$;

create or replace function public.user_has_club_permission(p_club_id uuid, p_permission text)
  returns boolean
  language sql
  security definer stable
  set search_path = ''
  as $$
  select
    exists(
      select
        1
      from
        public.club_members cm
        inner join public.roles r on cm.role_id = r.id
      where
        cm.club_id = p_club_id
        and cm.user_id = auth.uid()
        and cm.accepted = true
        and(r.permissions ->> p_permission)::boolean = true);
$$;

create or replace function private.create_user_profile()
  returns trigger
  language plpgsql
  set search_path = ''
  security definer
  as $$
begin
  insert into private.profiles(id, full_name)
    values(new.id, '');
  return new;
end;
$$;

create trigger create_user_profile
  after insert on auth.users for each row
  execute function private.create_user_profile();

