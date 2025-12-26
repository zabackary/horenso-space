import { Trans } from "@lingui/react/macro";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";
import { ClubConfigTabNav } from "./tabs";

export default async function ClubConfigLayout({
  children,
  params,
}: LayoutProps<`/app/[id]/config`>) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  let perms;
  try {
    perms = await getPermissionsForClub(supabase, id);
  } catch (e) {
    notFound();
  }

  if (!perms.permissions.includes("canManageClub")) {
    notFound();
  }

  return (
    <Flex direction="column" className={styles.root} flexGrow="1">
      <Heading as="h2" size="6" className={styles.heading}>
        <Trans>Club configuration</Trans>
      </Heading>
      <ClubConfigTabNav clubId={id} />
      {children}
    </Flex>
  );
}
