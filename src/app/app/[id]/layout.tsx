import { AppHeader } from "@/components/ui/app-header";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ClubIdLayout({
  params,
  children,
}: LayoutProps<`/app/[id]`>) {
  const { id } = await params;
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
    throw new Error("Club not found");
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
