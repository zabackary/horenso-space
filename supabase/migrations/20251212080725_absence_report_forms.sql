
  create table "public"."absence_report_forms" (
    "id" uuid not null default extensions.gen_random_uuid(),
    "club_id" uuid not null,
    "name" text not null,
    "questions" jsonb not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."absence_report_forms" enable row level security;

alter table "public"."absence_report_reviews" add column "form" uuid;

CREATE UNIQUE INDEX absence_report_forms_pkey ON public.absence_report_forms USING btree (id);

alter table "public"."absence_report_forms" add constraint "absence_report_forms_pkey" PRIMARY KEY using index "absence_report_forms_pkey";

alter table "public"."absence_report_forms" add constraint "absence_report_forms_club_id_fkey" FOREIGN KEY (club_id) REFERENCES public.clubs(id) ON DELETE CASCADE not valid;

alter table "public"."absence_report_forms" validate constraint "absence_report_forms_club_id_fkey";

alter table "public"."absence_report_reviews" add constraint "absence_report_reviews_form_fkey" FOREIGN KEY (form) REFERENCES public.absence_report_forms(id) ON DELETE SET NULL not valid;

alter table "public"."absence_report_reviews" validate constraint "absence_report_reviews_form_fkey";

grant delete on table "public"."absence_report_forms" to "anon";

grant insert on table "public"."absence_report_forms" to "anon";

grant references on table "public"."absence_report_forms" to "anon";

grant select on table "public"."absence_report_forms" to "anon";

grant trigger on table "public"."absence_report_forms" to "anon";

grant truncate on table "public"."absence_report_forms" to "anon";

grant update on table "public"."absence_report_forms" to "anon";

grant delete on table "public"."absence_report_forms" to "authenticated";

grant insert on table "public"."absence_report_forms" to "authenticated";

grant references on table "public"."absence_report_forms" to "authenticated";

grant select on table "public"."absence_report_forms" to "authenticated";

grant trigger on table "public"."absence_report_forms" to "authenticated";

grant truncate on table "public"."absence_report_forms" to "authenticated";

grant update on table "public"."absence_report_forms" to "authenticated";

grant delete on table "public"."absence_report_forms" to "service_role";

grant insert on table "public"."absence_report_forms" to "service_role";

grant references on table "public"."absence_report_forms" to "service_role";

grant select on table "public"."absence_report_forms" to "service_role";

grant trigger on table "public"."absence_report_forms" to "service_role";

grant truncate on table "public"."absence_report_forms" to "service_role";

grant update on table "public"."absence_report_forms" to "service_role";


  create policy "Club admins can create absence report forms for their clubs"
  on "public"."absence_report_forms"
  as permissive
  for insert
  to public
with check (public.user_has_club_permission(club_id, 'canManageClub'::text));



  create policy "Club admins can delete absence report forms for their clubs"
  on "public"."absence_report_forms"
  as permissive
  for delete
  to public
using (public.user_has_club_permission(club_id, 'canManageClub'::text));



  create policy "Club admins can modify absence report forms for their clubs"
  on "public"."absence_report_forms"
  as permissive
  for update
  to public
with check (public.user_has_club_permission(club_id, 'canManageClub'::text));



  create policy "Club members can view absence report forms in their clubs"
  on "public"."absence_report_forms"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.joined_clubs
  WHERE (joined_clubs.id = absence_report_forms.club_id))));



