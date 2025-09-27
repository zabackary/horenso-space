create table "club_members" (
  club_id uuid references "clubs"(id) on delete cascade,
  user_id uuid references auth."users"(id) on delete cascade,
  role_id uuid references "roles"(id),
  joined_at timestamp with time zone default now() not null,
  accepted boolean default false not null,

  primary key (club_id, user_id)
);

alter table "club_members"
  enable row level security;