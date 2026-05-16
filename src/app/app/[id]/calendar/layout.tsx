import { initLingui } from "@/lib/i18n/initLingui";
import CalendarNavigation from "./CalendarNavigation";

export default async function Layout({
  children,
  params,
}: LayoutProps<`/app/[id]/calendar`>) {
  const { id } = await params;
  await initLingui();

  return <CalendarNavigation>{children}</CalendarNavigation>;
}
