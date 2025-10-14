import { FullscreenCard } from "@/components/ui/fullscreen-card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FullscreenCard>{children}</FullscreenCard>;
}
