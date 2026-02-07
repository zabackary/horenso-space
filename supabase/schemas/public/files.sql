create table files(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
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

