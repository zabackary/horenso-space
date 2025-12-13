import { Card } from "@radix-ui/themes";
import { MeTabNav } from "./layout";

export default function MeDefault() {
  return (
    <>
      <MeTabNav />
      <Card>Select a setting to change.</Card>
    </>
  );
}
