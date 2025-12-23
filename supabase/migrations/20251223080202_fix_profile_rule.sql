drop rule if exists profiles_update on public.profiles;

create rule profiles_update as on update
  to public.profiles
    do instead
    update
      private.profiles set
      full_name = new.full_name,
      nickname = new.nickname,
      avatar_url = new.avatar_url,
      bio = new.bio,
      school = new.school where
      id = new.id returning
      id,
      created_at,
      full_name,
      nickname,
      avatar_url,
      bio,
      school;

