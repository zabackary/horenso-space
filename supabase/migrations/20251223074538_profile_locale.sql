alter table "private"."profiles"
    add column "locale" text;

alter table "private"."profiles"
    alter column "notification_device_tokens" set default array[]::jsonb[];

alter table "private"."profiles"
    alter column "notification_device_tokens" set data type jsonb[] using "notification_device_tokens"::jsonb[];

set check_function_bodies = off;

create or replace function public.current_locale()
    returns text
    language sql
    security definer
    set search_path to ''
    as $function$
    select
        locale
    from
        private.profiles
    where
        id = auth.uid();
$function$;

