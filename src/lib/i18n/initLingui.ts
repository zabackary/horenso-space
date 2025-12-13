import { setI18n } from "@lingui/react/server";
import { headers } from "next/headers";
import getRequestLocale from "./getRequestLocale";
import { getI18nInstance } from "./i18n";

export type PageLangParam = {
  params: Promise<{ lang: string }>;
};

export async function initLingui() {
  const requestHeaders = await headers();
  const lang = getRequestLocale(requestHeaders);
  const i18n = getI18nInstance(lang);
  setI18n(i18n);
  return i18n;
}
