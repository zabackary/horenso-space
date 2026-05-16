import { initLingui } from "@/lib/i18n/initLingui";
import { notFound } from "next/navigation";
import { YearCalendar } from "./Year";

export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]">) {
  await initLingui();

  const { id, year } = await params;

  // Check if the date is valid
  const date = new Date(`${year}-01-01`);
  if (date.toISOString().substring(0, 4) !== year) {
    notFound();
  }

  return <YearCalendar date={year} />;
}
