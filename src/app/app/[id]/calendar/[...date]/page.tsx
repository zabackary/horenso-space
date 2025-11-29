import getPermissionsForClub from "@/lib/auth/getPermissionsForClub";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calendar from "../calendar";
import CreateEventCard from "../create-event-card";

export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[...date]">) {
  const { id, date } = await params;

  if (date[0] === "create" && date.length === 1) {
    // Event creation
    return (
      <>
        <Flex direction="row" align="center" gap="2" p="4" mb="-4">
          <Button variant="soft" size="2" type="button" asChild>
            <Link href={`/app/${id}`}>
              <ArrowLeftIcon /> Back
            </Link>
          </Button>
          <Heading size="3">Create event</Heading>
        </Flex>
        <CreateEventCard clubId={id} withPadding />
      </>
    );
  }

  const supabase = await createClient();
  const { permissions } = await getPermissionsForClub(supabase, id);

  switch (date.length) {
    case 1: {
      // Year view
      if (isNaN(Number(date[0]))) {
        notFound();
      }

      return (
        <Calendar
          initialMode="year"
          initialDate={date[0]}
          clubId={id}
          canWrite={permissions.includes("canWriteCalendar")}
        />
      );
    }
    case 2: {
      // Month view
      const [year, month] = date;
      if (isNaN(Number(year)) || isNaN(Number(month))) {
        notFound();
      }

      return (
        <Calendar
          initialMode="month"
          initialDate={date.join("-")}
          clubId={id}
          canWrite={permissions.includes("canWriteCalendar")}
        />
      );
    }
    case 3: {
      // Day view
      const [year, month, day] = date;
      if (isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day))) {
        notFound();
      }

      return (
        <Calendar
          initialMode="day"
          initialDate={date.join("-")}
          clubId={id}
          canWrite={permissions.includes("canWriteCalendar")}
        />
      );
    }
    default:
      notFound();
  }
}
