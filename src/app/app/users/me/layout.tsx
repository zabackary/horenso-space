import { Trans } from "@lingui/react/macro";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import UserProfile from "@/components/ui/user-profile";
import UserShareActions from "@/components/user-share-actions";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { MeTabNav } from "./tabs";

export default async function MeLayout({
  children,
  params,
}: LayoutProps<"/app/users/me">) {
  await params;
  await initLingui();
  const supabase = await createClient();
  const profile = await getProfile(supabase);

  if (!profile) {
    notFound();
  }

  return (
    <Flex p="4" direction="column" gap="2" style={{ zIndex: -1 }}>
      <UserProfile id={profile.id} />
      <UserShareActions profile={profile} />

      <Heading as="h2" size="3">
        <Trans>User settings</Trans>
      </Heading>

      <MeTabNav />
      {children}
    </Flex>
  );
}
