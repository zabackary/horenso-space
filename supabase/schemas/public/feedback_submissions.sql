create table feedback_submissions(
  id uuid primary key default extensions.gen_random_uuid(),
  club_id uuid references clubs(id) on delete set null,
  user_id uuid references public.profiles(id) on delete set null,
  feedback text not null,
  created_at timestamp with time zone default now() not null
);

-- RLS
alter table feedback_submissions enable row level security;

-- Users can create feedback submissions for clubs they are members of, or without a club
create policy "Users can create feedback submissions for their clubs" on feedback_submissions
  for insert
    with check (user_id = auth.uid()
    and (club_id is null or exists (
      select
        1
      from
        club_members
      where
        club_members.club_id = feedback_submissions.club_id and club_members.user_id = auth.uid() and club_members.accepted = true)));

