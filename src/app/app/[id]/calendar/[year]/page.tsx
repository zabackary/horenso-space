export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]">) {
  const { id, year } = await params;

  return (
    <div>
      <h1>Calendar for {year}</h1>
    </div>
  );
}
