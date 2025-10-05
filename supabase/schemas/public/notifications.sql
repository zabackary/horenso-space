create view public.notifications as (
  select
    n.*
  from
    private.notifications n
  where
    n.user_id = auth.uid());

