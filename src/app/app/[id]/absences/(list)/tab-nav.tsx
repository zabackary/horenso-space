"use client";

import { Trans } from "@lingui/react/macro";
import { TabNav } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AbsencesTabNav({
  clubId,
  permissions,
}: {
  clubId: string;
  permissions: string[];
}) {
  const active = usePathname().split("/")[4];

  return (
    <TabNav.Root style={{ width: "100%" }}>
      <TabNav.Link asChild active={active === "my"}>
        <Link href={`/app/${clubId}/absences/my`}>
          <Trans>My absences</Trans>
        </Link>
      </TabNav.Link>
      {permissions.includes("canReadAllReports") ? (
        <TabNav.Link asChild active={active === "all"}>
          <Link href={`/app/${clubId}/absences/all`}>
            <Trans>All absences</Trans>
          </Link>
        </TabNav.Link>
      ) : null}
      {permissions.includes("canWriteReportReview") ? (
        <TabNav.Link asChild active={active === "assigned"}>
          <Link href={`/app/${clubId}/absences/assigned`}>
            <Trans>Assigned to me</Trans>
          </Link>
        </TabNav.Link>
      ) : null}
    </TabNav.Root>
  );
}
