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
  notification_device_tokens jsonb[] default array[]::jsonb[] not null,
  is_banned boolean default false not null,
  private_profile boolean default false not null,
  locale text
);

create index on private.profiles(full_name);

create trigger set_updated_at
  before update on private.profiles for each row
  execute function extensions.moddatetime("updated_at");

-- When a user is created, we create the corresponding profile full_name populated
-- with the JWT 'name' and avatar_url populated with the JWT 'picture'.
-- If these claims are not present in the JWT, we default to an empty string for
-- full_name and NULL for avatar_url.
create function create_user_profile()
  returns trigger
  language plpgsql
  set search_path = ''
  security definer
  as $$
begin
  insert into private.profiles(id, full_name, avatar_url)
    values(new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.raw_user_meta_data ->> 'picture');
  return new;
end;
$$;

create trigger create_user_profile
  after insert on auth.users for each row
  execute function create_user_profile();

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

