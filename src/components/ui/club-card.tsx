import { Database } from "@/@types/database.types";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import styles from "./club-card.module.css";

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

export interface ClubCardProps {
  club: Database["public"]["Views"]["joined_clubs"]["Row"];
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
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
  );
}
