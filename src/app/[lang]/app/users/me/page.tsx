import { Trans } from "@lingui/react/macro";
import { Card } from "@radix-ui/themes";
import { MeTabNav } from "./layout";

export default function MeDefault() {
  return (
    <>
      <MeTabNav />
      <Card>
        <Trans key="settings.selectSetting">Select a setting to change</Trans>
      </Card>
    </>
  );
}
