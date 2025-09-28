create table profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  full_name text not null,
  nickname text,
  avatar_url text,
  bio text,
  school text,
  notifications_enabled boolean default true not null,
  notification_device_tokens text[] default array[] ::text[] not null
);

create index on profiles(full_name);

create trigger set_updated_at
  before update on profiles for each row
  execute function extensions.moddatetime("updated_at");

alter table profiles enable row level security;

-- RLS Policies for profiles table
-- Users can view and edit their own profile
create policy "Users can view their own profile" on profiles
  for select
    using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update
    using (auth.uid() = id);

create policy "Users can insert their own profile" on profiles
  for insert
    with check (auth.uid() = id);

-- Club members can view profiles of other members in their clubs
create policy "Club members can view other member profiles" on profiles
  for select
    using (exists (
      select
        1
      from
        club_members cm1
        inner join club_members cm2 on cm1.club_id = cm2.club_id
      where
        cm1.user_id = auth.uid() and cm2.user_id = profiles.id and cm1.accepted = true and cm2.accepted = true));

