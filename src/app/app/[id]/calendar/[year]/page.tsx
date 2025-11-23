import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import CreateEventCard from "../create-event-card";

export default async function CalendarYearPage({
  params,
}: PageProps<"/app/[id]/calendar/[year]">) {
  const { id, year } = await params;

  if (year === "create") {
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
        <CreateEventCard clubId={id} />
      </>
    );
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
