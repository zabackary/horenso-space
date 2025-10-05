create table private.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  full_name text not null,
  nickname text,
  avatar_url text,
  bio text,
  school text,
  notifications_enabled boolean default true not null,
  notification_device_tokens text[] default array[] ::text[] not null,
  is_banned boolean default false not null,
  private_profile boolean default false not null
);

create index on private.profiles(full_name);

create trigger set_updated_at
  before update on private.profiles for each row
  execute function extensions.moddatetime("updated_at");

alter table private.profiles enable row level security;

-- RLS Policies for profiles table
-- Users can view and edit their own profile
create policy "Users can view their own profile" on private.profiles
  for select
    using (auth.uid() = id);

create policy "Users can update their own profile" on private.profiles
  for update
    using (auth.uid() = id);

create policy "Users can insert their own profile" on private.profiles
  for insert
    with check (auth.uid() = id);

