export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]/[month]/[day]">) {
  const { id, year, month, day } = await params;

  return (
    <div>
      <h1>
        Calendar for {year}-{month}-{day}
      </h1>
    </div>
  );
}
