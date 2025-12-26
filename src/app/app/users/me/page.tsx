import { Trans } from "@lingui/react/macro";
import { EnterIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import ClickableCard from "@/components/ui/clickable-card";
import { initLingui } from "@/lib/i18n/initLingui";

function SettingsCard({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <Box flexGrow="1" asChild>
      <ClickableCard asChild>
        <Link href={href}>
          <Flex direction="column" align="center" gap="2" p="4">
            {icon}
            <Text size="5" weight="bold" align="center">
              {text}
            </Text>
          </Flex>
        </Link>
      </ClickableCard>
    </Box>
  );
}

export default async function MeDefault() {
  await initLingui();
  return (
    <Flex direction="row" wrap="wrap" gap="4" p="4">
      <SettingsCard
        href="/app/users/me/general"
        icon={<GearIcon width={32} height={32} />}
        text={<Trans>General</Trans>}
      />
      <SettingsCard
        href="/app/users/me/login"
        icon={<EnterIcon width={32} height={32} />}
        text={<Trans>Login methods</Trans>}
      />
      <SettingsCard
        href="/app/users/me/profile"
        icon={<PersonIcon width={32} height={32} />}
        text={<Trans>Profile</Trans>}
      />
    </Flex>
  );
}
