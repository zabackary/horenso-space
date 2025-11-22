export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]/[month]">) {
  const { id, year, month } = await params;

  return (
    <div>
      <h1>
        Calendar for {year}-{month}
      </h1>
    </div>
  );
}
