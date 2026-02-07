import { setI18n } from "@lingui/react/server";
import { headers } from "next/headers";
import { createClient } from "../supabase/server";
import getRequestLocale from "./getRequestLocale";
import { getI18nInstance } from "./i18n";

export type PageLangParam = {
  params: Promise<{ lang: string }>;
};

export async function initLingui() {
  const requestHeaders = await headers();
  const requestLang = getRequestLocale(requestHeaders);
  const supabase = await createClient();
  const userLang = (await supabase.rpc("profiles_locale_get")).data;
  const i18n = getI18nInstance(userLang || requestLang);
  setI18n(i18n);
  return i18n;
}
