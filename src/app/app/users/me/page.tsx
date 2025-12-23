import { initLingui } from "@/lib/i18n/initLingui";
import { Trans } from "@lingui/react/macro";
import { Card } from "@radix-ui/themes";
import { MeTabNav } from "./layout";

export default async function MeDefault() {
  await initLingui();
  return (
    <>
      <MeTabNav />
      <Card>
        <Trans>Select a setting to change</Trans>
      </Card>
    </>
  );
}
