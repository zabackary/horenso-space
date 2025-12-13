import { initLingui } from "@/lib/i18n/initLingui";
import CalendarRedirect from "./redirect";

export default async function CalendarPage({
  params,
}: PageProps<"/[lang]/app/[id]/calendar">) {
  const { id, lang } = await params;
  initLingui(lang);

  return <CalendarRedirect id={id} />;
}
