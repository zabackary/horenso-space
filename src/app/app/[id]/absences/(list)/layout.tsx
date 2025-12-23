"use server";

import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./layout.module.css";

export default async function Page({
  params,
  children,
}: LayoutProps<"/app/[id]/absences">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  return (
    <Flex
      direction="column"
      gap="4"
      p="4"
      align="start"
      className={styles.root}
    >
      <Flex direction="row" align="center" gap="4">
        <Heading size="5" as="h2">
          <Trans>Absences</Trans>
        </Heading>

        {permissions.includes("canWriteOwnReport") && (
          <Button asChild className={styles.reportButton}>
            <Link href={`/app/${id}/absences/create`}>
              <Trans>Report absence</Trans>
            </Link>
          </Button>
        )}
      </Flex>

      {children}
    </Flex>
  );
}
