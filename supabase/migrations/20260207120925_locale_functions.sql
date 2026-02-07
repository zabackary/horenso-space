set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.profiles_locale_get()
 RETURNS text
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    locale
  from
    public.profiles
  where
    id = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.profiles_locale_set(new_locale text)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  update
    public.profiles
  set
    locale = new_locale
  where
    id = auth.uid();
$function$
;


