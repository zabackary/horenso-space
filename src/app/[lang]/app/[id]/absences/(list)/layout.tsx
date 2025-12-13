import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { Button, Flex, Heading, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./layout.module.css";

export default async function Page({
  params,
  children,
}: LayoutProps<"/[lang]/app/[id]/absences">) {
  const { id } = await params;

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
          Absences
        </Heading>

        {permissions.includes("canWriteOwnReport") && (
          <Button asChild className={styles.reportButton}>
            <Link href={`/app/${id}/absences/create`}>Report absence</Link>
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
  return (
    <TabNav.Root style={{ width: "100%" }}>
      <TabNav.Link asChild active={active === "my"}>
        <Link href={`/app/${clubId}/absences/my`}>My reports</Link>
      </TabNav.Link>
      {permissions.includes("canReadAllReports") ? (
        <TabNav.Link asChild active={active === "all"}>
          <Link href={`/app/${clubId}/absences/all`}>All reports</Link>
        </TabNav.Link>
      ) : null}
      {permissions.includes("canWriteReportReview") ? (
        <TabNav.Link asChild active={active === "assigned"}>
          <Link href={`/app/${clubId}/absences/assigned`}>Assigned to me</Link>
        </TabNav.Link>
      ) : null}
    </TabNav.Root>
  );
}
