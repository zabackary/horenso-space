import { AppHeader } from "@/components/ui/app-header";
import { initLingui } from "@/lib/i18n/initLingui";

export default async function ClubLayout({
  children,
  params,
}: LayoutProps<"/app/club">) {
  await params;
  await initLingui();
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
