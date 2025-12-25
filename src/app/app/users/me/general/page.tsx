import { initLingui } from "@/lib/i18n/initLingui";
import { Trans } from "@lingui/react/macro";
import { Flex, Text } from "@radix-ui/themes";

export default async function Page() {
  await initLingui();

  return (
    <Flex direction="column" gap="4" p="4" asChild>
      <form>
        {/* <Text as="p" mb="1">
          <Text as="label" htmlFor={`user-general-settings-name`} size="2">
            <Trans>Language</Trans>
          </Text>
        </Text> */}
      </form>
    </Flex>
  );
}
