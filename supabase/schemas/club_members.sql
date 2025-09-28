create table club_members(
  club_id uuid references clubs(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role_id uuid references roles(id) not null,
  joined_at timestamp with time zone default now() not null,
  accepted boolean default false not null,
  primary key (club_id, user_id)
);

alter table "club_members" enable row level security;

-- Set joined_at when a user accepts an invitation
create trigger set_joined_at
  before update on club_members for each row
  when(OLD.accepted = false and NEW.accepted = true)
  execute function extensions.moddatetime('joined_at');

-- RLS Policies for club_members table
-- Club members can view all members of clubs they belong to
create policy "Club members can view other members" on club_members
  for select
    using (exists (
      select
        1
      from
        joined_clubs
      where
        joined_clubs.club_id = club_members.club_id));

-- Users can view their own membership records (including pending invitations)
create policy "Users can view their own membership records" on club_members
  for select
    using (user_id = auth.uid());

-- Users can accept their own membership invitations
-- TODO: Prevent changing role_id when accepting invitation
create policy "Users can accept their own invitations" on club_members
  for update
    using (user_id = auth.uid()
      and accepted = false)
      with check (user_id = auth.uid()
      and accepted = true);

-- Users with canManageClub permission can insert new memberships (invite users)
create policy "Club managers can invite new members" on club_members
  for insert
    with check (auth.user_has_club_permission(cm.club_id, 'canManageClub')
    and NEW.accepted = false);

-- Users with canManageClub permission can update member roles and remove members
create policy "Club managers can manage memberships" on club_members
  for update
    using (auth.user_has_club_permission(club_members.club_id, 'canManageClub'));

-- Users with canManageClub permission can remove members
create policy "Club managers can remove members" on club_members
  for delete
    using (auth.user_has_club_permission(club_members.club_id, 'canManageClub'));

-- Users can remove themselves from clubs
create policy "Users can leave clubs" on "club_members"
  for delete
    using (user_id = auth.uid());

