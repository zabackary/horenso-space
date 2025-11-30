import MetadataForm from "@/components/club-config/metadata-form";
import RolesManager from "@/components/club-config/roles-manager";
import { AppHeader } from "@/components/ui/app-header";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

export default async function ClubConfigPage({
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
      <AppHeader header={{ href: `/app/${id}`, text: "Club settings" }} />
      <Flex direction="column" className={styles.root}>
        <Heading size="6" className={styles.heading} as="h2">
          Club configuration
        </Heading>

        <Flex direction="column" className={styles.section} gap="4">
          <MetadataForm clubId={id} />
          <RolesManager clubId={id} />
        </Flex>
      </Flex>
    </>
  );
}
