import { AppHeader } from "@/components/ui/app-header";
import { initLingui } from "@/lib/i18n/initLingui";

export default async function UsersLayout({
  children,
  params,
}: LayoutProps<"/app/users">) {
  await params;
  await initLingui();
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
