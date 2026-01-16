"use server";

import { LOCALES } from "@/../lingui.config";
import { createClient } from "@/lib/supabase/server";
import { refresh } from "next/cache";

export default async function generalSettingsAction(formData: FormData) {
  const language = formData.get("language");

  if (!language || !LOCALES.includes(language as string)) {
    throw new Error("Invalid language");
  }

  const supabase = await createClient();
  await supabase.rpc("profiles_locale_set", {
    new_locale: language as string,
  });

  refresh();
}
