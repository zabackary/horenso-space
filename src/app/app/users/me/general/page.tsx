import { initLingui } from "@/lib/i18n/initLingui";
import { Trans, useLingui } from "@lingui/react/macro";
import { Button, Flex, Select, Text } from "@radix-ui/themes";

import { LOCALES } from "@/../lingui.config";
import generalSettingsAction from "./action";

export default async function Page() {
  await initLingui();

  let locales = LOCALES;
  if (process.env.NODE_ENV !== "development") {
    locales = locales.filter((locale) => locale !== "pseudo");
  }

  const languages = locales.map((locale) => {
    return {
      code: locale,
      name: new Intl.DisplayNames([locale], { type: "language" }).of(
        locale
      ) as string,
    };
  });

  const { i18n } = useLingui();

  return (
    <Flex direction="column" gap="4" p="4" align="start" asChild>
      <form action={generalSettingsAction}>
        <Text as="label">
          <Trans>Language</Trans>
          <br />
          <Select.Root defaultValue={i18n.locale} required name="language">
            <Select.Trigger
              id={`user-general-settings-name`}
              aria-label="Language"
            />
            <Select.Content>
              {languages.map((language) => (
                <Select.Item key={language.code} value={language.code}>
                  {language.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Text>
        <Button type="submit" mt="4">
          <Trans>Save</Trans>
        </Button>
      </form>
    </Flex>
  );
}
