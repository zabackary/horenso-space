import Negotiator from "negotiator";
import { LOCALES } from "../../../lingui.config";

export default function getRequestLocale(requestHeaders: Headers): string {
  const langHeader = requestHeaders.get("accept-language") || undefined;
  const languages = new Negotiator({
    headers: { "accept-language": langHeader },
  }).languages(LOCALES.slice());

  const activeLocale = languages[0] || LOCALES[0] || "en";

  return activeLocale;
}
