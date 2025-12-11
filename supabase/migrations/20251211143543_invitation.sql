
  create table "private"."invitations" (
    "id" uuid not null default gen_random_uuid(),
    "invited_by" uuid not null,
    "club_id" uuid not null,
    "role_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "expires_at" timestamp with time zone not null
      );


CREATE UNIQUE INDEX invitations_pkey ON private.invitations USING btree (id);

alter table "private"."invitations" add constraint "invitations_pkey" PRIMARY KEY using index "invitations_pkey";

alter table "private"."invitations" add constraint "invitations_club_id_fkey" FOREIGN KEY (club_id) REFERENCES public.clubs(id) ON DELETE CASCADE not valid;

alter table "private"."invitations" validate constraint "invitations_club_id_fkey";

alter table "private"."invitations" add constraint "invitations_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "private"."invitations" validate constraint "invitations_invited_by_fkey";

alter table "private"."invitations" add constraint "invitations_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE not valid;

alter table "private"."invitations" validate constraint "invitations_role_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.accept_invitation(invitation_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_club_id uuid;
  v_role_id uuid;
begin
  select
    club_id,
    role_id into v_club_id,
    v_role_id
  from
    private.invitations
  where
    id = invitation_id;
  if not found then
    raise exception 'Invitation not found'
      using hint = 'The invitation ID provided does not exist.';
    end if;
    if (
      select
        now() > expires_at
      from
        private.invitations
      where
        id = invitation_id) then
      raise exception 'Invitation expired'
        using hint = 'The invitation has expired and can no longer be accepted.';
      end if;
      insert into public.club_members(club_id, user_id, role_id, accepted)
        values (v_club_id, auth.uid(), v_role_id, true);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.verify_invitation(invitation_id uuid)
 RETURNS TABLE(club_name text, role_name text, invited_by_name text, expires_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select
    clubs.name,
    roles.name,
    profiles.full_name,
    invitations.expires_at
  from
    private.invitations
    join public.clubs on invitations.club_id = clubs.id
    join public.roles on invitations.role_id = roles.id
    join private.profiles on invitations.invited_by = profiles.id
  where
    invitations.id = $1
    and invitations.expires_at > now();
$function$
;


