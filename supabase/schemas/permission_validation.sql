--- Club members can view profiles of other members in their clubs
create policy "Users can view profiles in their clubs" on public.profiles
  for select to authenticated
    using (exists (
      select
        1
      from
        public.club_members viewer
        join public.club_members target on target.club_id = viewer.club_id
      where
        viewer.user_id = auth.uid() and target.user_id = public.profiles.id));

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
create policy "Club members can view other members" on public.club_members as permissive
  for select to public
    using (public.user_is_club_member(club_members.club_id));

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

-- The club creator can always view their club
create policy "Club creators can view their clubs" on clubs
  for select
    using (clubs.created_by = auth.uid());

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

-- MARK: absence_report_forms permissions policies
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
    using (public.user_has_club_permission(absence_report_forms.club_id, 'canManageClub'));

create policy "Club admins can delete absence report forms for their clubs" on absence_report_forms
  for delete
    using (public.user_has_club_permission(absence_report_forms.club_id, 'canManageClub'));

