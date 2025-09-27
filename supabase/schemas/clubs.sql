create table "clubs" (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now() not null,
  name text not null,
  description text,
  school text,
  website text,
  active boolean default true not null,

  absence_report_schema jsonb not null,
  absence_report_required_reviewer uuid references auth.users(id) on delete set null
);

create index on "clubs" (name);

alter table "clubs"
  enable row level security;