alter table "public"."absence_reports" add column "form_id" uuid;

alter table "public"."absence_reports" add constraint "absence_reports_form_id_fkey" FOREIGN KEY (form_id) REFERENCES public.absence_report_forms(id) ON DELETE SET NULL not valid;

alter table "public"."absence_reports" validate constraint "absence_reports_form_id_fkey";


