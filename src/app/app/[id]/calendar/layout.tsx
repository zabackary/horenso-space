import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import CalendarNavigation from "./CalendarNavigation";

export default async function Layout({
  children,
  params,
}: LayoutProps<`/app/[id]/calendar`>) {
  const { id } = await params;
  await initLingui();

  const { permissions } = await getPermissionsForClub(await createClient(), id);

  return (
    <CalendarNavigation
      canWrite={permissions.includes("canWriteCalendar")}
      clubId={id}
    >
      {children}
    </CalendarNavigation>
  );
}
