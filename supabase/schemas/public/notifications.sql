create table notifications(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  club_id uuid references clubs(id) on delete cascade,
  read boolean default false not null,
  content text not null
);

alter table notifications enable row level security;

-- RLS Policies for notifications table
-- Users can only view their own notifications
create policy "Users can view their own notifications" on notifications
  for select
    using (user_id = auth.uid());

-- Users can delete their own notifications
create policy "Users can delete their own notifications" on notifications
  for delete
    using (user_id = auth.uid());

-- System can insert notifications for any user
create policy "Users can create notifications for themselves" on "notifications"
  for insert
    with check (user_id = auth.uid());

-- Users can only update the 'read' status of their own notifications
revoke update on notifications from authenticated;

grant update (read) on notifications to authenticated;

create index on notifications(user_id);

create index on notifications(club_id);

create index on notifications(read);

