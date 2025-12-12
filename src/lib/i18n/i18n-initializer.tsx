"use client";

import { useEffect } from "react";
import i18next from "./config";

/**
 * Initialize i18n by loading the default language on app start.
 * This component should be rendered at the app root level.
 */
export function I18nInitializer() {
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        // Detect language preference from navigator or use default
        const language = navigator.language.split("-")[0] || "en";
        const supportedLanguages = ["en", "ja"];
        const lang = supportedLanguages.includes(language) ? language : "en";

        // Only initialize if not already initialized
        if (i18next.language !== lang) {
          await i18next.changeLanguage(lang);
        }

        // Load the selected language
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang}.json`);

        const data = await response.json();

        // Add all namespaces from the loaded file
        for (const [namespace, content] of Object.entries(data)) {
          if (!i18next.hasResourceBundle(lang, namespace)) {
            i18next.addResourceBundle(
              lang,
              namespace,
              content as any,
              true,
              true
            );
          }
        }
      } catch (error) {
        console.error("Failed to initialize i18n:", error);
        // Fallback to English
        if (i18next.language !== "en") {
          i18next.changeLanguage("en");
        }
      }
    };

    initializeI18n();
  }, []);

  return null;
}
