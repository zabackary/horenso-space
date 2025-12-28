import { defineConfig } from "@lingui/cli";

export const LOCALES = ["en", "ja", "pseudo"];

export default defineConfig({
  locales: LOCALES,
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src/"],
    },
  ],
  pseudoLocale: "pseudo",
});
