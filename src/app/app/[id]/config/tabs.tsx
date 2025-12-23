"use client";

import { Trans } from "@lingui/react/macro";
import { TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ClubConfigTabNav({ clubId }: { clubId: string }) {
  const current = usePathname();

  const active = current.split("/")[4];

  return (
    <TabNav.Root>
      <TabNav.Link asChild active={active === "metadata"}>
        <Link href={`/app/${clubId}/config/metadata`}>
          <Trans>Metadata</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "roles"}>
        <Link href={`/app/${clubId}/config/roles`}>
          <Trans>Roles</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "members"}>
        <Link href={`/app/${clubId}/config/members`}>
          <Trans>Members</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "invites"}>
        <Link href={`/app/${clubId}/config/invites`}>
          <Trans>Invites</Trans>
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={active === "absence-forms"}>
        <Link href={`/app/${clubId}/config/absence-forms`}>
          <Trans>Absence forms</Trans>
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
