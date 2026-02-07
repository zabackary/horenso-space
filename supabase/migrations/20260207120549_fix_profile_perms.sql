revoke select on public.profiles from authenticated;

grant select (id, created_at, full_name, nickname, avatar_url, bio, school, private_profile) on public.profiles to authenticated;

