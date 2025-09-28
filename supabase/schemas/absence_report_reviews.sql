create table absence_report_reviews(
  id uuid primary key default gen_random_uuid(),
  absence_report_id uuid references "absence_reports"(id) on delete cascade not null,
  reviewer_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  accepted boolean not null,
  comments text
);

create index on absence_report_reviews(absence_report_id);

create index on absence_report_reviews(reviewer_id);

create trigger set_updated_at
  before update on absence_report_reviews for each row
  execute function extensions.moddatetime("updated_at");

alter table absence_report_reviews enable row level security;

-- RLS Policies for absence_report_reviews table
-- Users with canWriteReportReview permission can create reviews for reports in their clubs
-- Users can also create reviews if they are assigned to the report
create policy "Authorized users can create report reviews" on absence_report_reviews
  for insert
    with check (reviewer_id = auth.uid()
    and auth.user_has_club_permission((
      select
        ar.club_id
      from
        absence_reports ar
      where
        ar.id = absence_report_reviews.absence_report_id), 'canWriteReportReview'));

create policy "Users can create reviews for reports assigned to them" on absence_report_reviews
  for insert
    with check (reviewer_id = auth.uid()
    and exists (
      select
        1
      from
        absence_reports
        inner join club_members on absence_reports.club_id = club_members.club_id
        inner join roles on club_members.role_id = roles.id
      where (absence_reports.id = absence_report_reviews.absence_report_id and club_members.user_id = auth.uid() and club_members.accepted = true and absence_reports.assigned_to = auth.uid())));

-- Reviewers can view and update their own reviews
create policy "Reviewers can manage their own reviews" on absence_report_reviews
  for all
    using (reviewer_id = auth.uid())
    with check (reviewer_id = auth.uid());

-- Report authors can view reviews of their reports
create policy "Report authors can view reviews of their reports" on absence_report_reviews
  for select
    using (exists (
      select
        1
      from
        absence_reports
      where
        absence_reports.id = absence_report_reviews.absence_report_id and absence_reports.user_id = auth.uid()));

-- Users with canReadAllReports permission can view all reviews in their clubs
create policy "Authorized users can view all club reviews" on "absence_report_reviews"
  for select
    using (auth.user_has_club_permission((
      select
        ar.club_id
      from
        absence_reports ar
      where
        ar.id = absence_report_reviews.absence_report_id), 'canReadAllReports'));

