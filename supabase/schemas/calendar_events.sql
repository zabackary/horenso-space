create table calendar_events(
  id uuid primary key default gen_random_uuid(),
  club_id uuid references clubs(id) on delete cascade not null,
  title text not null,
  description text,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  location text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  created_by uuid references auth.users(id) on delete set null
);

create index on calendar_events(club_id);

create trigger set_updated_at
  before update on calendar_events for each row
  execute function extensions.moddatetime("updated_at");

alter table calendar_events enable row level security;

-- RLS Policies for calendar_events table
-- Users with canReadCalendar permission can view events in their clubs
create policy "Authorized users can view club calendar events" on calendar_events
  for select
    using (auth.user_has_club_permission(club_id, 'canReadCalendar'));

-- Users with canWriteCalendar permission can create events
create policy "Authorized users can create calendar events" on calendar_events
  for insert
    with check (calendar_events.created_by = auth.uid()
    and auth.user_has_club_permission(club_id, 'canWriteCalendar'));

-- Users with canWriteCalendar permission can update and delete events
create policy "Authorized users can update calendar events" on calendar_events
  for update
    using (auth.user_has_club_permission(club_id, 'canWriteCalendar'));

create policy "Authorized users can delete calendar events" on calendar_events
  for delete
    using (auth.user_has_club_permission(club_id, 'canWriteCalendar'));

