create table public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  full_name text not null,
  nickname text,
  avatar_url text,
  bio text,
  school text,
  private_profile boolean default false not null,
  locale text,
  push_notifications_preference jsonb not null default '{}'
);

create index on public.profiles(full_name);

-- Don't allow anyone to read most profile fields.
revoke select on public.profiles from authenticated;

grant select (id, created_at, full_name, nickname, avatar_url, bio, school, private_profile) on public.profiles to authenticated;

alter table public.profiles enable row level security;

create policy "Users can view their own profile" on public.profiles
  for select to authenticated
    using (id = auth.uid());

create policy "Users can update their own profile" on public.profiles
  for update to authenticated
    using (id = auth.uid())
    with check (id = auth.uid());

-- Users in the same club can view each other's profiles. This policy is in permission_validation due to recursion issues.
-- Trigger to update updated_at on profile update
create trigger set_updated_at
  before update on public.profiles for each row
  execute function extensions.moddatetime('updated_at');

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
  insert into public.profiles(id, full_name, avatar_url)
    values(new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.raw_user_meta_data ->> 'picture');
  return new;
end;
$$;

create trigger create_user_profile
  after insert on auth.users for each row
  execute function create_user_profile();

