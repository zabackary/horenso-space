import { initLingui } from "@/lib/i18n/initLingui";
import "./layout.module.css";

export default async function Layout({
  children,
  params,
}: LayoutProps<`/[lang]/app/[id]/calendar`>) {
  const { lang } = await params;
  initLingui(lang);
  return <>{children}</>;
}
