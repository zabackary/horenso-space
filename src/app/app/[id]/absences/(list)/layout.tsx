import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans, useLingui } from "@lingui/react/macro";
import { Button, Flex, Heading, TabNav } from "@radix-ui/themes";
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
          <Trans id="absences.heading">Absences</Trans>
        </Heading>

        {permissions.includes("canWriteOwnReport") && (
          <Button asChild className={styles.reportButton}>
            <Link href={`/app/${id}/absences/create`}>
              <Trans id="absences.report">Report absence</Trans>
            </Link>
          </Button>
        )}
      </Flex>

      {children}
    </Flex>
  );
}

export function AbsencesTabNav({
  active,
  clubId,
  permissions,
}: {
  active?: "my" | "all" | "assigned";
  clubId: string;
  permissions: string[];
}) {
  const { t } = useLingui();
  return (
    <TabNav.Root style={{ width: "100%" }}>
      <TabNav.Link asChild active={active === "my"}>
        <Link href={`/app/${clubId}/absences/my`}>
          <Trans id="absences.tab.my">My absences</Trans>
        </Link>
      </TabNav.Link>
      {permissions.includes("canReadAllReports") ? (
        <TabNav.Link asChild active={active === "all"}>
          <Link href={`/app/${clubId}/absences/all`}>
            <Trans id="absences.tab.all">All absences</Trans>
          </Link>
        </TabNav.Link>
      ) : null}
      {permissions.includes("canWriteReportReview") ? (
        <TabNav.Link asChild active={active === "assigned"}>
          <Link href={`/app/${clubId}/absences/assigned`}>
            <Trans id="absences.tab.assigned">Assigned to me</Trans>
          </Link>
        </TabNav.Link>
      ) : null}
    </TabNav.Root>
  );
}
