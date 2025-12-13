import { AppHeader } from "@/components/ui/app-header";
import { FullscreenCard } from "@/components/ui/fullscreen-card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <FullscreenCard>{children}</FullscreenCard>
    </>
  );
}
