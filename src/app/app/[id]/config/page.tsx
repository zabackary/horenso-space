import { redirect } from "next/navigation";

export default async function ClubConfigPage({
  params,
}: PageProps<"/app/[id]/config">) {
  const { id } = await params;
  redirect(`/app/${id}/config/metadata`);
}
