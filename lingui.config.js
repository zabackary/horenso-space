/** @type {import("@lingui/conf").LinguiConfig} */
export const locales = ["en", "ja", "pseudo"];
export const pseudoLocale = "pseudo";
export const sourceLocale = "en";
export const fallbackLocales = {
  default: "en",
};
export const catalogs = [
  {
    path: "src/locales/{locale}",
    include: ["src/"],
  },
];
