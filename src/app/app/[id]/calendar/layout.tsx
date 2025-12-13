import { initLingui } from "@/lib/i18n/initLingui";
import "./layout.module.css";

export default async function Layout({
  children,
  params,
}: LayoutProps<`/app/[id]/calendar`>) {
  const {} = await params;
  await initLingui();
  return <>{children}</>;
}
