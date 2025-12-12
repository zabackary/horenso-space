create table absence_report_forms(
  id uuid primary key default extensions.gen_random_uuid(),
  club_id uuid references clubs(id) on delete cascade not null,
  name text not null,
  questions jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table absence_report_forms enable row level security;

