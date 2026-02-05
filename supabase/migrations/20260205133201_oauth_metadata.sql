set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into private.profiles(id, full_name, avatar_url)
    values(new.id, coalesce(new.raw_user_meta_data ->> 'name', ''), new.raw_user_meta_data ->> 'picture');
  return new;
end;
$function$
;


