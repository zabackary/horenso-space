set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.profiles_update_self(p_full_name text DEFAULT NULL::text, p_nickname text DEFAULT NULL::text, p_avatar_url text DEFAULT NULL::text, p_bio text DEFAULT NULL::text, p_school text DEFAULT NULL::text, p_notifications_enabled boolean DEFAULT NULL::boolean, p_private_profile boolean DEFAULT NULL::boolean)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  update
    private.profiles
  set
    full_name = coalesce(p_full_name, full_name),
    nickname = coalesce(p_nickname, nickname),
    avatar_url = coalesce(p_avatar_url, avatar_url),
    bio = coalesce(p_bio, bio),
    school = coalesce(p_school, school),
    notifications_enabled = coalesce(p_notifications_enabled, notifications_enabled),
    private_profile = coalesce(p_private_profile, private_profile)
  where
    id = auth.uid();
$function$
;


