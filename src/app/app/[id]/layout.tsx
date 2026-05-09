import { AppHeader } from "@/components/ui/app-header";
import { initLingui } from "@/lib/i18n/initLingui";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ClubIdLayout({
  params,
  children,
}: LayoutProps<`/app/[id]`>) {
  const { id } = await params;
  await initLingui();
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  const supabase = await createClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("name")
    .eq("id", id)
    .single();
  if (!club) {
    notFound();
  }

  return (
    <>
      <AppHeader
        header={{
          href: `/app/${id}`,
          text: club.name,
        }}
      />
      {children}
    </>
  );
}
