-- Add a getter for the current user's locale
create function public.profiles_locale_get()
  returns text
  language sql
  security definer
  set search_path = ''
  as $$
  select
    locale
  from
    private.profiles
  where
    id = auth.uid();
$$;

-- Set the current user's locale
create function public.profiles_locale_set(new_locale text)
  returns void
  language sql
  security definer
  set search_path = ''
  as $$
  update
    private.profiles
  set
    locale = new_locale
  where
    id = auth.uid();
$$;

