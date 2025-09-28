-- Helper functions for RLS policies
-- These functions optimize common permission checks used across multiple tables
-- Function to check if a user has a specific permission in a club
create or replace function auth.user_has_club_permission(p_club_id uuid, p_permission text)
  returns boolean
  language sql
  security definer stable
  as $$
  select
    exists(
      select
        1
      from
        "club_members" cm
        inner join "roles" r on cm.role_id = r.id
      where
        cm.club_id = p_club_id
        and cm.user_id = auth.uid()
        and cm.accepted = true
        and(r.permissions ->> p_permission)::boolean = true);
$$;

grant execute on function auth.user_has_club_permission(uuid, text) to authenticated;

create view public.joined_clubs as
select
  c.*
from
  "clubs" c
where
  exists (
    select
      1
    from
      "club_members" cm
    where
      cm.club_id = c.id
      and cm.user_id = auth.uid()
      and cm.accepted = true);

