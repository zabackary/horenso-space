set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_current_locale(new_locale text)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  update
    private.profiles
  set
    locale = new_locale
  where
    id = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.current_locale()
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    locale
  from
    private.profiles
  where
    id = auth.uid();
$function$
;


