"use client";

import { Trans } from "@lingui/react/macro";
import { TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MeTabNav() {
  const active = usePathname().split("/")[4];

  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "general"}>
        <Link href="/app/users/me/general">
          <Trans>General</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "login"}>
        <Link href="/app/users/me/login">
          <Trans>Login methods</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "profile"}>
        <Link href="/app/users/me/profile">
          <Trans>Profile</Trans>
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
