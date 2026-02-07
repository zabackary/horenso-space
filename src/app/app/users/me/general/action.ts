"use server";

import { LOCALES } from "@/../lingui.config";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { refresh } from "next/cache";

export default async function generalSettingsAction(formData: FormData) {
  const supabase = await createClient();

  const language = formData.get("language");

  if (!language || !LOCALES.includes(language as string)) {
    throw new Error("Invalid language");
  }

  const profile = await getProfile(supabase);
  if (!profile) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      locale: language as string,
    })
    .eq("id", profile.id);

  if (error) {
    throw error;
  }

  refresh();
}
