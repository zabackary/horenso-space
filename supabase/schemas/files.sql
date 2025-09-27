create table "files" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  file_name text not null,
  file_size int8 not null,
  file_type text not null,
  description text,
  club_id uuid references "clubs"(id) on delete set null
);

alter table "files"
  enable row level security;