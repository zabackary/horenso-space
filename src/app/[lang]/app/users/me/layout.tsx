import UserProfile from "@/components/ui/user-profile";
import UserShareActions from "@/components/user-share-actions";
import getProfile from "@/lib/auth/getProfile";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Flex, Heading, TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MeLayout({
  children,
  params,
}: LayoutProps<"/[lang]/app/users/me">) {
  const { lang } = await params;
  initLingui(lang);
  const supabase = await createClient();
  const profile = await getProfile(supabase);

  if (!profile) {
    notFound();
  }

  return (
    <Flex p="4" direction="column" gap="2">
      <UserProfile id={profile.id} />

      <UserShareActions profile={profile} />

      <Heading as="h2" size="3">
        <Trans id="user.settings">User settings</Trans>
      </Heading>
      {children}
    </Flex>
  );
}

export function MeTabNav({ active }: { active?: "login" | "profile" }) {
  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "login"}>
        <Link href="/app/users/me/login">Login</Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "profile"}>
        <Link href="/app/users/me/profile">Profile</Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
