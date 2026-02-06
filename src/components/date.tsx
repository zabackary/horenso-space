"use client";

import { useLingui } from "@lingui/react/macro";

export interface DateRendererProps {
  date: string | number | Date;
}

/**
 * A simple date component that formats dates according to the user's locale.
 *
 * It is a client component because it needs to render in the local timezone.
 */
export default function DateRenderer({
  date,
  ...options
}: DateRendererProps & Intl.DateTimeFormatOptions) {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  const { i18n } = useLingui();

  return <>{new Intl.DateTimeFormat(i18n.locale, options).format(dateObj)}</>;
}
