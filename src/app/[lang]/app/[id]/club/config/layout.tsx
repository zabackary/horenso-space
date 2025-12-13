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
}: LayoutProps<`/[lang]/app/[id]/club/config`>) {
  const { id, lang } = await params;
  initLingui(lang);

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
            <Trans key="config.heading">Club configuration</Trans>
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
  const { i18n } = useLingui();
  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "metadata"}>
        <Link href={`/app/${clubId}/club/config/metadata`}>
          {i18n._("config.tab.metadata", "Metadata")}
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "roles"}>
        <Link href={`/app/${clubId}/club/config/roles`}>
          {i18n._("config.tab.roles", "Roles")}
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "members"}>
        <Link href={`/app/${clubId}/club/config/members`}>
          {i18n._("config.tab.members", "Members")}
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "invites"}>
        <Link href={`/app/${clubId}/club/config/invites`}>
          {i18n._("config.tab.invites", "Invites")}
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "absenceForms"}>
        <Link href={`/app/${clubId}/club/config/absence-forms`}>
          {i18n._("config.tab.absenceForms", "Absence forms")}
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
