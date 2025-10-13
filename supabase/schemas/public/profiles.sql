create view public.profiles as (
  select
    p.id,
    p.created_at,
    case when p.private_profile then
      null
    else
      p.full_name
    end as full_name,
    case when p.private_profile then
      null
    else
      p.nickname
    end as nickname,
    case when p.private_profile then
      null
    else
      p.avatar_url
    end as avatar_url,
    case when p.private_profile then
      null
    else
      p.bio
    end as bio,
    case when p.private_profile then
      null
    else
      p.school
    end as school
  from
    private.profiles p);

-- proxy updates to the private schema
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
      id = new.id;

