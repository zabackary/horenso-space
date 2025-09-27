create table "absence_reports" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  club_id uuid references "clubs"(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  event_id uuid references "calendar_events"(id) on delete set null,
  data jsonb not null,

  assigned_to uuid references auth.users(id) on delete set null,
  review_finished boolean default false not null
);

create index on "absence_reports" (user_id);
create index on "absence_reports" (club_id);
create index on "absence_reports" (assigned_to);

create trigger set_updated_at
  before update on "absence_reports"
  for each row
  execute function extensions.moddatetime("updated_at");

alter table "absence_reports"
  enable row level security;