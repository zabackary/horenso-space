import { AppHeader } from "@/components/ui/app-header";

export default async function ClubLayout({
  children,
}: LayoutProps<"/app/club">) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
