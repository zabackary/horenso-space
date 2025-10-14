import { notFound } from "next/navigation";

interface ClubPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { id } = await params;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  return <div>Club Page: {id}</div>;
}
