drop view if exists public.profiles;

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
      private.profiles.id,
      private.profiles.created_at,
      case when private.profiles.private_profile then
        null
      else
        private.profiles.full_name
      end as full_name,
      case when private.profiles.private_profile then
        null
      else
        private.profiles.nickname
      end as nickname,
      case when private.profiles.private_profile then
        null
      else
        private.profiles.avatar_url
      end as avatar_url,
      case when private.profiles.private_profile then
        null
      else
        private.profiles.bio
      end as bio,
      case when private.profiles.private_profile then
        null
      else
        private.profiles.school
      end as school;

