"use client";

import { useEffect, useRef } from "react";
import { useTranslation as useTranslationBase } from "react-i18next";

interface LazyLoadOptions {
  namespaces?: string[];
}

/**
 * Custom hook for using translations with lazy-loading support.
 * Loads translation files from /public/locales/{lang}.json
 *
 * @param ns - Namespace or array of namespaces to use
 * @param options - Additional options for lazy loading
 * @returns Translation functions and i18next instance
 */
export function useTranslation(
  ns?: string | string[],
  options?: LazyLoadOptions
) {
  const { t, i18n } = useTranslationBase(ns);
  const loadedBundles = useRef<Set<string>>(new Set());

  useEffect(() => {
    const lazyLoadNamespaces = async () => {
      const namespacesToLoad =
        options?.namespaces || (ns ? (Array.isArray(ns) ? ns : [ns]) : []);

      for (const namespace of namespacesToLoad) {
        // Skip if already loaded
        const bundleKey = `${i18n.language}:${namespace}`;
        if (loadedBundles.current.has(bundleKey)) {
          continue;
        }

        // Check if bundle already exists
        if (i18n.hasResourceBundle(i18n.language, namespace)) {
          loadedBundles.current.add(bundleKey);
          continue;
        }

        try {
          const response = await fetch(`/locales/${i18n.language}.json`);
          if (!response.ok)
            throw new Error(`Failed to load ${i18n.language}.json`);

          const data = await response.json();

          // Add the entire language bundle or just the namespace
          if (namespace === "common") {
            // For common namespace, add all top-level namespaces
            for (const [ns, content] of Object.entries(data)) {
              if (!i18n.hasResourceBundle(i18n.language, ns)) {
                i18n.addResourceBundle(
                  i18n.language,
                  ns,
                  content as any,
                  true,
                  true
                );
                loadedBundles.current.add(`${i18n.language}:${ns}`);
              }
            }
          } else {
            // For specific namespace
            const namespaceData = data[namespace];
            if (namespaceData) {
              i18n.addResourceBundle(
                i18n.language,
                namespace,
                namespaceData,
                true,
                true
              );
              loadedBundles.current.add(bundleKey);
            }
          }
        } catch (error) {
          console.error(`Failed to load namespace ${namespace}:`, error);
        }
      }
    };

    lazyLoadNamespaces();
  }, [ns, options?.namespaces, i18n, i18n.language]);

  return { t, i18n };
}

export default useTranslation;
