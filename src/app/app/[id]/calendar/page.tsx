import { initLingui } from "@/lib/i18n/initLingui";
import CalendarRedirect from "./redirect";

export default async function CalendarPage({
  params,
}: PageProps<"/app/[id]/calendar">) {
  const { id } = await params;
  await initLingui();

  return <CalendarRedirect id={id} />;
}
