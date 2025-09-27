create table "calendar_events" (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references "clubs"(id) on delete cascade,
  title text not null,
  description text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  location text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  created_by uuid references auth.users(id) on delete set null
);

create index on "calendar_events" (club_id);

create trigger set_updated_at
  before update on "calendar_events"
  for each row
  execute function extensions.moddatetime("updated_at");

alter table "calendar_events"
  enable row level security;