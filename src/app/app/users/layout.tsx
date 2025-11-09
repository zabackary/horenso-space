import { AppHeader } from "@/components/ui/app-header";

export default function UsersLayout({ children }: LayoutProps<"/app/users">) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
