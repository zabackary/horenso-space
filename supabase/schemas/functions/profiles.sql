-- Gets a user profile by id, respecting privacy settings (unless the requester
-- is the user themself)
create function public.profiles_get(p_user_id uuid)
  returns table(
    id uuid,
    created_at timestamptz,
    full_name text,
    nickname text,
    avatar_url text,
    bio text,
    school text,
    private_profile boolean)
  language sql
  security definer
  set search_path = ''
  as $$
  select
    id,
    created_at,
    full_name,
    nickname,
    avatar_url,
    bio,
    school,
    private_profile
  from
    public.profiles
  where
    id = p_user_id
    and(private_profile = false
      or id = auth.uid());
$$;

