import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { AppHeader } from "@/components/ui/app-header";
import ClubCard from "@/components/ui/club-card";
import { createClient } from "@/lib/supabase/server";

export default async function App() {
  const supabase = await createClient();
  const { data: clubs, error: clubsError } = await supabase
    .from("joined_clubs")
    .select("*");

  if (clubsError) {
    console.error("couldn't fetch clubs:", clubsError);
  }

  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100vh"
        gap="4"
        p="4"
        style={{ zIndex: -1 }}
      >
        <Heading size="7" as="h1">
          部活をお選びください。
        </Heading>
        {clubs?.length ? (
          <Flex gap="4" wrap="wrap" justify="center">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </Flex>
        ) : clubs ? (
          <Callout.Root>
            <Callout.Text>
              部活が見つかりませんでした。部活を参加するには、招待リンクが必要です。
            </Callout.Text>
          </Callout.Root>
        ) : (
          <Callout.Root>
            <Callout.Icon>
              <CrossCircledIcon />
            </Callout.Icon>
            <Callout.Text>エラーが発生しました。</Callout.Text>
          </Callout.Root>
        )}
        <Button asChild variant="soft" size="4">
          <Link href="/app/club/create">部活を作成</Link>
        </Button>
      </Flex>
    </>
  );
}
