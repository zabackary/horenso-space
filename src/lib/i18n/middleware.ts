import { type NextRequest, NextResponse } from "next/server";

import linguiConfig from "../../../lingui.config";
import getRequestLocale from "./getRequestLocale";

const { locales } = linguiConfig;

export function i18nMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale: string) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getRequestLocale(request.headers);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}
