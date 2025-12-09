-- Add absence report approval workflow columns to roles table
alter table roles
add column absence_report_approval_required boolean default true not null,
add column absence_report_reviewer_role uuid references roles(id) on delete set null;

-- Change assigned_to column in absence_reports from user to role
alter table absence_reports
drop column assigned_to,
add column assigned_to_role uuid references roles(id) on delete set null;

-- Create index for querying reports by assigned role
create index on absence_reports(assigned_to_role);