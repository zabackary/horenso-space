import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { Button, Flex, Heading, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./layout.module.css";

export default async function Page({
  params,
  children,
}: LayoutProps<"/app/[id]/absences">) {
  const { id } = await params;

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  return (
    <Flex direction="column" gap="4" p="4">
      <Heading size="5" as="h2">
        Absences
      </Heading>

      {permissions.includes("canWriteOwnReport") && (
        <Button asChild className={styles.reportButton}>
          <Link href={`/app/${id}/absences/create`}>Report absence</Link>
        </Button>
      )}

      {children}
    </Flex>
  );
}

export function AbsencesTabNav({
  active,
  clubId,
  permissions,
}: {
  active?: "my" | "all";
  clubId: string;
  permissions: string[];
}) {
  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "my"}>
        <Link href={`/app/${clubId}/absences/my`}>My reports</Link>
      </TabNav.Link>
      {permissions.includes("canReadAllReports") ? (
        <TabNav.Link asChild active={active === "all"}>
          <Link href={`/app/${clubId}/absences/all`}>All reports</Link>
        </TabNav.Link>
      ) : null}
    </TabNav.Root>
  );
}
