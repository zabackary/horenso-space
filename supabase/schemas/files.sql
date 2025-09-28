create table files(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  file_name text not null,
  file_size int8 not null,
  file_type text not null,
  description text,
  url text not null,
  -- If club_id is null, the file belongs to a deleted club. It should be
  -- cleaned up in the uploaded files bucket before this row is deletec.
  club_id uuid references "clubs"(id) on delete set null
);

create index on files(user_id);

create index on files(club_id);

create index on files(created_at);

create trigger set_updated_at
  before update on files for each row
  execute function extensions.moddatetime("updated_at");

alter table files enable row level security;

-- RLS Policies for files table
-- Users can view their own uploaded files
create policy "Users can view their own files" on files
  for select
    using (user_id = auth.uid());

-- Users with canReadFiles permission can view files in their clubs
create policy "Authorized users can view club files" on files
  for select
    using (club_id is not null
      and public.user_has_club_permission(club_id, 'canReadFiles'));

-- Users with canWriteFiles permission can upload files to their clubs
create policy "Authorized users can upload files" on files
  for insert
    with check (public.user_has_club_permission(club_id, 'canWriteFiles')
    and user_id = auth.uid()
    and club_id is not null);

-- Users with canWriteFiles permission can update files
create policy "Authorized users can update club files" on files
  for update
    using (public.user_has_club_permission(club_id, 'canWriteFiles'));

-- Users with canWriteFiles permission can delete files
create policy "Authorized users can delete club files" on files
  for delete
    using (public.user_has_club_permission(club_id, 'canWriteFiles'));

-- Club members can view profiles of other members in their clubs
create policy "Club members can view other member profiles" on profiles
  for select
    using (exists (
      select
        1
      from
        club_members cm1
        inner join club_members cm2 on cm1.club_id = cm2.club_id
      where
        cm1.user_id = auth.uid() and cm2.user_id = profiles.id and cm1.accepted = true and cm2.accepted = true));

