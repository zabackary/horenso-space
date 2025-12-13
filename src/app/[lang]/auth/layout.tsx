import { AppHeader } from "@/components/ui/app-header";
import { FullscreenCard } from "@/components/ui/fullscreen-card";
import { initLingui } from "@/lib/i18n/initLingui";

export default async function AuthLayout({
  children,
  params,
}: LayoutProps<"/[lang]/auth">) {
  const { lang } = await params;
  initLingui(lang);
  return (
    <>
      <AppHeader />
      <FullscreenCard>{children}</FullscreenCard>
    </>
  );
}
