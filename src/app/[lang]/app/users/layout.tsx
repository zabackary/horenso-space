import { AppHeader } from "@/components/ui/app-header";

export default function UsersLayout({
  children,
}: LayoutProps<"/[lang]/app/users">) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
