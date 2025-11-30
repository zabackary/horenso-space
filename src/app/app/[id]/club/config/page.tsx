import { redirect } from "next/navigation";

export default async function ClubConfigPage({
  params,
}: PageProps<"/app/[id]/club/config">) {
  const id = (await params).id;
  redirect(`/app/${id}/club/config/metadata`);
}
