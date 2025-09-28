create table absence_reports(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  club_id uuid references clubs(id) on delete cascade not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  event_id uuid references calendar_events(id) on delete set null,
  data jsonb not null,
  assigned_to uuid references auth.users(id) on delete set null
);

create index on absence_reports(user_id);

create index on absence_reports(club_id);

create index on absence_reports(assigned_to);

create trigger set_updated_at
  before update on absence_reports for each row
  execute function extensions.moddatetime("updated_at");

alter table absence_reports enable row level security;

-- RLS Policies for absence_reports table
-- Users can view their own absence reports
create policy "Users can view their own absence reports" on absence_reports
  for select
    using (user_id = auth.uid());

-- Users with canWriteOwnReport permission can create their own reports
create policy "Users can create their own absence reports" on absence_reports
  for insert
    with check (user_id = auth.uid()
    and auth.user_has_club_permission(club_id, 'canWriteOwnReport'));

-- Users with canWriteOwnReport permission can update their own reports if there
-- are no reviews yet
create policy "Users can update their own absence reports if no reviews" on "absence_reports"
  for update
    using (user_id = auth.uid()
      and (auth.user_has_club_permission(club_id, 'canWriteOwnReport'))
      and not exists (
        select
          1
        from
          absence_report_reviews arr
        where
          arr.absence_report_id = absence_reports.id));

-- Users with canReadAllReports permission can view all reports in their clubs
create policy "Authorized users can view all club reports" on absence_reports
  for select
    using (auth.user_has_club_permission(club_id, 'canReadAllReports'));

-- Users assigned to review reports can view them
create policy "Assigned reviewers can view reports" on absence_reports
  for select
    using (assigned_to = auth.uid());

