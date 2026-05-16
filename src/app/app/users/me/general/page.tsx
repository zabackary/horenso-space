import { LOCALES } from "@/../lingui.config";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Box } from "@radix-ui/themes";
import GeneralSettingsForm from "./GeneralSettingsForm";

export default async function Page() {
  await initLingui();

  const supabase = await createClient();
  const localePromise = supabase
    .rpc("profiles_locale_get")
    .then((r) => r.data as string | null);
  let locales = LOCALES;
  if (process.env.NODE_ENV !== "development") {
    locales = locales.filter((locale) => locale !== "pseudo");
  }

  return (
    <Box p="4">
      <GeneralSettingsForm localePromise={localePromise} locales={locales} />
    </Box>
  );
}
