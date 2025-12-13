import { AppHeader } from "@/components/ui/app-header";
import { initLingui } from "@/lib/i18n/initLingui";

export default async function UsersLayout({
  children,
  params,
}: LayoutProps<"/[lang]/app/users">) {
  const { lang } = await params;
  initLingui(lang);
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
