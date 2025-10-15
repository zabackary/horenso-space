import { createClient } from "@/lib/supabase/server";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import styles from "./page.module.css";

/**
 * Generates a color code from a string.
 *
 * Adapted from https://stackoverflow.com/a/16348977
 *
 * @param str - input string
 * @returns a hex color code
 */
function stringToColor(str: string) {
  // Simple hash function
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  // Generate the hex code
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
}

export default async function App() {
  const supabase = await createClient();
  const { data: clubs, error: clubsError } = await supabase
    .from("joined_clubs")
    .select("*");

  if (clubsError) {
    console.error("couldn't fetch clubs:", clubsError);
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      gap="4"
      p="4"
    >
      <Heading size="7" as="h1">
        部活をお選びください。
      </Heading>
      {clubs?.length ? (
        <Flex gap="4" wrap="wrap" justify="center">
          {clubs.map((club) => (
            <Card
              key={club.id}
              className={styles["club-card"]}
              style={{
                //@ts-expect-error: CSS variable
                "--card-header-background": stringToColor(club.id!), // null assertion, see https://github.com/orgs/supabase/discussions/14151
              }}
            >
              <Flex direction="column" gap="4">
                <Heading size="5" as="h2">
                  {club.name}
                </Heading>
                {club.school && (
                  <Text as="p">
                    <Badge>{club.school}</Badge>
                  </Text>
                )}
                {club.description && <Text as="p">{club.description}</Text>}
                <Box flexGrow="1" mb="-4" />
                <Button className={styles["club-card__button"]} asChild>
                  <Link href={`/app/${club.id}`}>参加する</Link>
                </Button>
              </Flex>
            </Card>
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
  );
}
