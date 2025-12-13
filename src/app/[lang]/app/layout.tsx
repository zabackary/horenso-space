import "@radix-ui/themes/styles.css";

export default async function AppLayout({
  children,
}: LayoutProps<"/[lang]/app">) {
  return children;
}
