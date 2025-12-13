import "./layout.module.css";

export default function Layout({
  children,
}: LayoutProps<`/app/[id]/calendar`>) {
  return <>{children}</>;
}
