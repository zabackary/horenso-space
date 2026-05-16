import { initLingui } from "@/lib/i18n/initLingui";
import { notFound } from "next/navigation";
import MonthCalendar from "./Month";

export default async function CalendarMonthPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]/[month]">) {
  await initLingui();

  const { id, year, month } = await params;

  // Check if the date is valid
  const date = new Date(`${year}-${month}-01`);
  if (date.toISOString().substring(0, 7) !== `${year}-${month}`) {
    notFound();
  }

  return (
    <MonthCalendar
      clubId={id}
      date={`${year}-${month}`}
      canCreateEvent // TODO: check permissions
    />
  );
}
