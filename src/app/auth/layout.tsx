import { AuthCard } from "@/components/ui/auth-card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthCard>{children}</AuthCard>;
}
