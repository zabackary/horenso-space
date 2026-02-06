drop policy "Club members can view other members" on "public"."club_members";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.user_is_club_member(p_club_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    exists(
      select
        1
      from
        public.club_members cm
      where
        cm.club_id = p_club_id
        and cm.user_id = auth.uid()
        and cm.accepted = true);
$function$
;


  create policy "Club members can view other members"
  on "public"."club_members"
  as permissive
  for select
  to public
using (public.user_is_club_member(club_id));



