import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { Flex, Heading, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function ClubConfigLayout({
  children,
  params,
}: LayoutProps<`/app/[id]/club/config`>) {
  const { id } = await params;

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
    <>
      <Flex direction="column" className={styles.root}>
        <div className={styles.container}>
          <Heading as="h2" size="6" className={styles.heading}>
            Club configuration
          </Heading>

          {children}
        </div>
      </Flex>
    </>
  );
}

export function ClubConfigTabNav({
  active,
  clubId,
}: {
  active?: "metadata" | "roles" | "members" | "invites" | "absenceForms";
  clubId: string;
}) {
  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "metadata"}>
        <Link href={`/app/${clubId}/club/config/metadata`}>Metadata</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "roles"}>
        <Link href={`/app/${clubId}/club/config/roles`}>Roles</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "members"}>
        <Link href={`/app/${clubId}/club/config/members`}>Members</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "invites"}>
        <Link href={`/app/${clubId}/club/config/invites`}>Invites</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "absenceForms"}>
        <Link href={`/app/${clubId}/club/config/absence-forms`}>
          Absence forms
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
