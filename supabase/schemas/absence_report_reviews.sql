create table "absence_report_reviews" (
  id uuid primary key default gen_random_uuid(),
  absence_report_id uuid references "absence_reports"(id) on delete cascade,
  reviewer_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  
  accepted boolean not null,
  comments text
);

create index on "absence_report_reviews" (absence_report_id);
create index on "absence_report_reviews" (reviewer_id);

create trigger set_updated_at
  before update on "absence_report_reviews"
  for each row
  execute function extensions.moddatetime("updated_at");

alter table "absence_report_reviews"
  enable row level security;