import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { initLingui } from "@/lib/i18n/initLingui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const {} = await params;
  await initLingui();
  return <ForgotPasswordForm />;
}
