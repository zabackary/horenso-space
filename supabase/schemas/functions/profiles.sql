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

-- Gets a user profile by id, respecting privacy settings (unless the requester
-- is the user themself)
create function public.profiles_get(p_user_id uuid)
  returns private.profiles
  language sql
  security definer
  set search_path = ''
  as $$
  select
    *
  from
    private.profiles
  where
    id = p_user_id
    and(private_profile = false
      or id = auth.uid());
$$;

-- Updates a user profile by id, only allowing the owner to update their profile
create function public.profiles_update_self(p_full_name text, p_nickname text, p_avatar_url text, p_bio text, p_school text, p_notifications_enabled boolean, p_private_profile boolean)
  returns void
  language sql
  security definer
  set search_path = ''
  as $$
  update
    private.profiles
  set
    full_name = p_full_name,
    nickname = p_nickname,
    avatar_url = p_avatar_url,
    bio = p_bio,
    school = p_school,
    notifications_enabled = p_notifications_enabled,
    private_profile = p_private_profile
  where
    id = auth.uid();
$$;

