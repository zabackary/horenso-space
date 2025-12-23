import { initLingui } from "@/lib/i18n/initLingui";
import { Trans } from "@lingui/react/macro";
import { Card } from "@radix-ui/themes";

export default async function MeDefault() {
  await initLingui();
  return (
    <>
      <Card>
        <Trans>Select a setting to change</Trans>
      </Card>
    </>
  );
}
