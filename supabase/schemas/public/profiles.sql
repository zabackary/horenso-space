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
    end as school,
    p.notifications_enabled
  from
    private.profiles p);

