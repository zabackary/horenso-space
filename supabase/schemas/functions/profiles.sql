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
create function public.profiles_update_self(p_full_name text default null, p_nickname text default null, p_avatar_url text default null, p_bio text default null, p_school text default null, p_notifications_enabled boolean default null, p_private_profile boolean default null)
  returns void
  language sql
  security definer
  set search_path = ''
  as $$
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
$$;

