-- Users with canWriteOwnReport permission can update their own reports if there
-- are no reviews yet
create policy "Users can update their own absence reports if no reviews" on "absence_reports"
  for update
    using (user_id = auth.uid()
      and (public.user_has_club_permission(club_id, 'canWriteOwnReport'))
      and not exists (
        select
          1
        from
          absence_report_reviews arr
        where
          arr.absence_report_id = absence_reports.id));

-- Club members can view all members of clubs they belong to
create policy "Club members can view other members" on club_members
  for select
    using (exists (
      select
        1
      from
        joined_clubs
      where
        joined_clubs.id = club_members.club_id));

-- Users with canManageClub permission can insert new memberships (invite users)
create policy "Club managers can invite new members" on club_members
  for insert
    with check (public.user_has_club_permission(club_members.club_id, 'canManageClub')
    and club_members.accepted = false);

-- Users with canManageClub permission can update member roles and remove members
create policy "Club managers can manage memberships" on club_members
  for update
    using (public.user_has_club_permission(club_members.club_id, 'canManageClub'));

-- Users with canManageClub permission can remove members
create policy "Club managers can remove members" on club_members
  for delete
    using (public.user_has_club_permission(club_members.club_id, 'canManageClub'));

-- Club members can view clubs they belong to
create policy "Club members can view their clubs" on clubs
  for select
    using (exists (
      select
        1
      from
        club_members
      where
        club_members.club_id = clubs.id and club_members.user_id = auth.uid() and club_members.accepted = true));

-- Users with canManageClub permission can update club details
create policy "Club managers can update clubs" on clubs
  for update
    using (public.user_has_club_permission(clubs.id, 'canManageClub'));

-- Club members can view roles in their clubs
create policy "Club members can view club roles" on roles
  for select
    using (exists (
      select
        1
      from
        joined_clubs
      where
        joined_clubs.id = roles.club_id));

-- Users with canManageClub permission can manage roles
create policy "Club managers can manage roles" on roles
  for all
    using (public.user_has_club_permission(roles.club_id, 'canManageClub'))
    with check (public.user_has_club_permission(roles.club_id, 'canManageClub')
    -- ensure the current user can still manage the club with the new permissions
      and not (
      -- this role applies to the current user
(exists (
        select
          1
        from
          club_members
        where
          club_members.role_id = roles.id and club_members.user_id = auth.uid() and club_members.accepted = true) and
          -- the new permissions don't allow managing the club
(permissions ->> 'canManageClub')::boolean = false)));

