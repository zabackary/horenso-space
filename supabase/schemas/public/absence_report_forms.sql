create table absence_report_forms(
  id uuid primary key default extensions.gen_random_uuid(),
  club_id uuid references clubs(id) on delete cascade not null,
  name text not null,
  questions jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

alter table absence_report_forms enable row level security;

-- Club members can view absence report forms in their clubs
create policy "Club members can view absence report forms in their clubs" on absence_report_forms
  for select
    using (exists (
      select
        1
      from
        joined_clubs
      where
        joined_clubs.id = absence_report_forms.club_id));

-- Club admins can create absence report forms for their clubs
create policy "Club admins can create absence report forms for their clubs" on absence_report_forms
  for insert
    with check (public.user_has_club_permission(absence_report_forms.club_id, 'canManageClub'));

create policy "Club admins can modify absence report forms for their clubs" on absence_report_forms
  for update
    with check (public.user_has_club_permission(absence_report_forms.club_id, 'canManageClub'));

create policy "Club admins can delete absence report forms for their clubs" on absence_report_forms
  for delete
    using (public.user_has_club_permission(absence_report_forms.club_id, 'canManageClub'));

