create or replace view public.joined_clubs with ( security_invoker = on
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

