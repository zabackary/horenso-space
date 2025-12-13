"use server";

import { Trans } from "@lingui/react/macro";
import { TabNav } from "@radix-ui/themes";
import Link from "next/link";

export async function AbsencesTabNav({
  active,
  clubId,
  permissions,
}: {
  active?: "my" | "all" | "assigned";
  clubId: string;
  permissions: string[];
}) {
  return (
    <TabNav.Root style={{ width: "100%" }}>
      <TabNav.Link asChild active={active === "my"}>
        <Link href={`/app/${clubId}/absences/my`}>
          <Trans id="absences.tab.my">My absences</Trans>
        </Link>
      </TabNav.Link>
      {permissions.includes("canReadAllReports") ? (
        <TabNav.Link asChild active={active === "all"}>
          <Link href={`/app/${clubId}/absences/all`}>
            <Trans id="absences.tab.all">All absences</Trans>
          </Link>
        </TabNav.Link>
      ) : null}
      {permissions.includes("canWriteReportReview") ? (
        <TabNav.Link asChild active={active === "assigned"}>
          <Link href={`/app/${clubId}/absences/assigned`}>
            <Trans id="absences.tab.assigned">Assigned to me</Trans>
          </Link>
        </TabNav.Link>
      ) : null}
    </TabNav.Root>
  );
}
