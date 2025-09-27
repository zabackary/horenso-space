create table "roles" (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references "clubs"(id) on delete cascade,
  name text not null,
  description text,
  permissions jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

create index on "roles" (club_id);

create trigger set_updated_at
  before update on "roles"
  for each row
  execute function extensions.moddatetime("updated_at");

alter table "roles"
  enable row level security;