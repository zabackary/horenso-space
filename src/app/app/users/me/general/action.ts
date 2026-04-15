"use server";

import { LOCALES } from "@/../lingui.config";
import { createClient } from "@/lib/supabase/server";
import { refresh } from "next/cache";

export default async function generalSettingsAction(formData: FormData) {
  const supabase = await createClient();

  const language = formData.get("language");

  if (!language || !LOCALES.includes(language as string)) {
    throw new Error("Invalid language");
  }

  const { error } = await supabase.rpc("profiles_locale_set", {
    new_locale: language as string,
  });

  if (error) {
    throw error;
  }

  refresh();
}
