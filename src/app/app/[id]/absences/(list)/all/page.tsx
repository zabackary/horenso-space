import { ListLoading } from "@/components/loading";
import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import getReports from "../getReports";
import { AllReportsList } from "./list";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/all">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  if (!permissions.includes("canReadAllReports")) {
    notFound();
  }

  const reports = getReports(supabase, {
    clubId: id,
  });

  return (
    <Suspense fallback={<ListLoading withHeading={false} cards={true} />}>
      <AllReportsList clubId={id} />
    </Suspense>
  );
}
