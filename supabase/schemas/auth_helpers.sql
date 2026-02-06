-- Helper functions for RLS policies
-- These functions optimize common permission checks used across multiple tables
-- Function to check if a user has a specific permission in a club
create function public.user_has_club_permission(p_club_id uuid, p_permission text)
  returns boolean
  language sql
  security definer stable
  set search_path = ''
  as $$
  select
    exists(
      select
        1
      from
        public.club_members cm
        inner join public.roles r on cm.role_id = r.id
      where
        cm.club_id = p_club_id
        and cm.user_id = auth.uid()
        and cm.accepted = true
        and(r.permissions ->> p_permission)::boolean = true);
$$;

-- Joined clubs view for easier permission checks
create view public.joined_clubs with ( security_invoker = on
) as
select
  *
from
  clubs
where
  exists (
    select
      1
    from
      club_members
    where
      club_members.club_id = clubs.id
      and club_members.user_id = auth.uid(
)
      and club_members.accepted = true);

comment on view public.joined_clubs is e'@graphql({"primary_key_columns": ["id"]})';

