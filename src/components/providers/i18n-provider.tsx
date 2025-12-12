"use client";

import i18next from "@/lib/i18n/config";
import { I18nInitializer } from "@/lib/i18n/i18n-initializer";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18next}>
      <I18nInitializer />
      {children}
    </I18nextProvider>
  );
}
