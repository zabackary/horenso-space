import { AppHeader } from "@/components/ui/app-header";
import { initLingui } from "@/lib/i18n/initLingui";

export default async function ClubLayout({
  children,
  params,
}: LayoutProps<"/[lang]/app/club">) {
  const { lang } = await params;
  initLingui(lang);
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
