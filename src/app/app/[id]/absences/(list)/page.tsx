import { redirect } from "next/navigation";

export default async function Page({
  params,
}: PageProps<"/app/[id]/absences">) {
  const { id } = await params;

  redirect(`/app/${id}/absences/my`);
}
