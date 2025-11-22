import CalendarRedirect from "./redirect";

export default async function CalendarPage({
  params,
}: PageProps<"/app/[id]/calendar">) {
  const { id } = await params;

  return <CalendarRedirect id={id} />;
}
