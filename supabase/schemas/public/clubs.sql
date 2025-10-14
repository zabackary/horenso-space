create table clubs(
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now() not null,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  name text not null,
  description text,
  school text,
  website text,
  active boolean default true not null,
  public boolean default true not null,
  absence_report_schema jsonb not null,
  absence_report_required_reviewer uuid references auth.users(id) on delete set null
);

create index on clubs(name);

-- When a club is created, the creator is automatically added as a member and
-- given a new role with all permissions
create function add_creator_as_club_member()
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

create trigger add_creator_as_club_member
  after insert on clubs for each row
  execute function add_creator_as_club_member();

alter table clubs enable row level security;

create view public_clubs as
select
  id,
  created_at,
  name,
  case when public then
    description
  else
    null
  end as description,
  case when public then
    school
  else
    null
  end as school,
  case when public then
    website
  else
    null
  end as website,
  active,
  public
from
  clubs;

-- No RLS on public_clubs view by default
-- RLS Policies for clubs table
-- Users with canManageClub permission can create new clubs
create policy "Authenticated users can create clubs" on clubs
  for insert
    with check (auth.uid() is not null
    and clubs.created_by = auth.uid());

