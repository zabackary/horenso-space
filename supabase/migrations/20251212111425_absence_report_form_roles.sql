alter table "public"."roles" add column "absence_report_form" uuid;

alter table "public"."roles" add constraint "roles_absence_report_form_fkey" FOREIGN KEY (absence_report_form) REFERENCES public.absence_report_forms(id) ON DELETE SET NULL not valid;

alter table "public"."roles" validate constraint "roles_absence_report_form_fkey";


