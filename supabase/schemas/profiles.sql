create table "profiles" (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  full_name text not null,
  nickname text,
  avatar_url text,
  bio text,
  school text,

  notifications_enabled boolean default true not null,
  notification_device_tokens text[] default array[]::text[] not null
);

create index on "profiles" (full_name);

create trigger set_updated_at
  before update on "profiles"
  for each row
  execute function extensions.moddatetime("updated_at");

alter table "profiles"
  enable row level security;