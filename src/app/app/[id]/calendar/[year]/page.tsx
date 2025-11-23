import { notFound } from "next/navigation";
import CreateEventCard from "./create-event-card";

export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]">) {
  const { id, year } = await params;

  if (year === "create") {
    // Event creation
    return <CreateEventCard clubId={id} />;
  }
  if (isNaN(Number(year))) {
    notFound();
  }

  return (
    <div>
      <h1>Calendar for {year}</h1>
    </div>
  );
}
