-- Rename assigned_to to assigned_to_role in absence_reports table
alter table public.absence_reports
rename column assigned_to to assigned_to_role;

-- Drop old index
drop index if exists public.absence_reports_assigned_to_idx;

-- Create new index
create index on public.absence_reports(assigned_to_role);

-- Update RLS policy for assigned reviewers
drop policy if exists "Assigned reviewers can view reports" on public.absence_reports;

create policy "Assigned reviewers can view reports" on public.absence_reports
  for select
  using (exists (
    select r.id from public.roles r
    join public.club_members m on m.role_id = r.id
    where m.user_id = auth.uid() and r.id = absence_reports.assigned_to_role
  ));