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
  // @ts-expect-error - suppressGetSessionWarning is protected to prevent exactly this use case
  supabase.auth.suppressGetSessionWarning = true;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let userLang: string | null = null;
  if (session) {
    const locale = (
      await supabase
        .from("profiles")
        .select("locale")
        // session.user.id might not be genuine because the session is from a cookie
        // however, the DB verifies the actual session token so this is safe
        .eq("id", session.user.id)
        .single()
    ).data?.locale;
    if (locale) {
      userLang = locale;
    }
  }
  const i18n = getI18nInstance(userLang || requestLang);
  setI18n(i18n);
  return i18n;
}
