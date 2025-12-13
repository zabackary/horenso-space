import { AppHeader } from "@/components/ui/app-header";

export default async function ClubLayout({
  children,
}: LayoutProps<"/[lang]/app/club">) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
