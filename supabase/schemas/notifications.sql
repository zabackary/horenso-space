create table "notifications" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  content text not null
);

alter table "notifications"
  enable row level security;