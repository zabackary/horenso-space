import { ClubCreateForm } from "@/components/club-create-form";
import { FullscreenCard } from "@/components/ui/fullscreen-card";
import { initLingui } from "@/lib/i18n/initLingui";
import { Trans } from "@lingui/react/macro";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button, Heading } from "@radix-ui/themes";
import Link from "next/link";

export default async function CreateClubPage({
  params,
}: PageProps<"/app/club/create">) {
  const {} = await params;
  await initLingui();
  return (
    <FullscreenCard
      navigationButton={
        <Button asChild variant="ghost" size="2" mb="4">
          <Link href="/app">
            <ArrowLeftIcon /> <Trans id="common.back">Back</Trans>
          </Link>
        </Button>
      }
    >
      <Heading as="h1" size="7" align="center">
        <Trans id="club.create">Create a club</Trans>
      </Heading>
      <ClubCreateForm />
    </FullscreenCard>
  );
}
