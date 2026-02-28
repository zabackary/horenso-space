import { ListLoading } from "@/components/loading";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { MyReportsList } from "./list";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences/my">) {
  const { id } = await params;
  await initLingui();

  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return (
    <Suspense fallback={<ListLoading withHeading={false} cards={true} />}>
      <MyReportsList clubId={id} userId={user.data.user?.id ?? ""} />
    </Suspense>
  );
}
