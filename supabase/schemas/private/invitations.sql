-- Invitations are not to a specific user, but rather a token that can be used by any user to join a club with a specific role.
create table "private"."invitations"(
  id uuid not null primary key default gen_random_uuid(),
  invited_by uuid not null references "auth"."users"(id) on delete cascade,
  club_id uuid not null references public.clubs(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  usage_count int not null default 0
);

