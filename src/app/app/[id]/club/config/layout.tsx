import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans, useLingui } from "@lingui/react/macro";
import { Flex, Heading, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function ClubConfigLayout({
  children,
  params,
}: LayoutProps<`/app/[id]/club/config`>) {
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
    <>
      <Flex direction="column" className={styles.root}>
        <div className={styles.container}>
          <Heading as="h2" size="6" className={styles.heading}>
            <Trans id="config.heading">Club configuration</Trans>
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
  const { t } = useLingui();
  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "metadata"}>
        <Link href={`/app/${clubId}/club/config/metadata`}>
          <Trans id="config.tab.metadata">Metadata</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "roles"}>
        <Link href={`/app/${clubId}/club/config/roles`}>
          <Trans id="config.tab.roles">Roles</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "members"}>
        <Link href={`/app/${clubId}/club/config/members`}>
          <Trans id="config.tab.members">Members</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "invites"}>
        <Link href={`/app/${clubId}/club/config/invites`}>
          <Trans id="config.tab.invites">Invites</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "absenceForms"}>
        <Link href={`/app/${clubId}/club/config/absence-forms`}>
          <Trans id="config.tab.absenceForms">Absence forms</Trans>
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
