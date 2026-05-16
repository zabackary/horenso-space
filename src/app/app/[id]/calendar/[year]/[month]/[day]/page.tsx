import { initLingui } from "@/lib/i18n/initLingui";
import { notFound } from "next/navigation";
import DayCalendar from "./Day";

export default async function CalendarDayPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]/[month]/[day]">) {
  await initLingui();

  const { id, year, month, day } = await params;

  // Check if the date is valid
  const date = new Date(`${year}-${month}-${day}`);
  if (date.toISOString().substring(0, 10) !== `${year}-${month}-${day}`) {
    notFound();
  }

  return (
    <DayCalendar
      clubId={id}
      date={`${year}-${month}-${day}`}
      canWrite // TODO: check permissions
      canReadAllReports // TODO: check permissions
    />
  );
}
