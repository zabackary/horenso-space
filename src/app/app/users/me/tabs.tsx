"use client";

import { TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MeTabNav() {
  const active = usePathname().split("/")[4];

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
