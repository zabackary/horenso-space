create table notifications(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
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
-- create policy "System can create notifications"
--   on "notifications"
--   for insert
--   with check (auth.uid() is not null);
