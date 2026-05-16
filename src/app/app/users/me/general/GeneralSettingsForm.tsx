"use client";

import { Button, Flex, Select, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

import { Trans, useLingui } from "@lingui/react/macro";
import generalSettingsAction from "./action";

type Props = {
  localePromise?: PromiseLike<string | null>;
  locales: string[];
};

export default function GeneralSettingsForm({
  localePromise,
  locales: propsLocales,
}: Props) {
  const { i18n, t } = useLingui();
  const [initialLocale, setInitialLocale] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    let mounted = true;
    if (localePromise) {
      localePromise.then((l) => {
        if (!mounted) return;
        const lang = (l as string) || i18n.locale;
        if (lang && lang !== i18n.locale) {
          i18n.activate(lang);
        }
        setInitialLocale(lang);
      });
    } else {
      setInitialLocale(i18n.locale);
    }

    return () => {
      mounted = false;
    };
  }, [localePromise, i18n]);

  const locales = propsLocales;

  const languages = locales.map((locale) => {
    return {
      code: locale,
      name: new Intl.DisplayNames([locale], { type: "language" }).of(
        locale,
      ) as string,
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const language = formData.get("language");
    if (language && language !== i18n.locale) {
      i18n.activate(language as string);
    }
  };

  return (
    <Flex direction="column" gap="4" align="start" asChild>
      <form action={generalSettingsAction} onSubmit={handleSubmit}>
        <Text as="label">
          <Trans>Language</Trans>
          <br />
          <Select.Root
            defaultValue={initialLocale || i18n.locale}
            required
            name="language"
          >
            <Select.Trigger
              id={`user-general-settings-language`}
              aria-label={t`Language`}
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
