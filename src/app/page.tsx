import Image from "next/image";
import styles from "./page.module.css";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { AppHeader } from "@/components/ui/app-header";
import Link from "next/link";

export default function Home() {
  return (
    <Flex direction="column" minHeight="100%">
      <AppHeader className={styles.header} />
      <Flex direction="column" p="2">
        <Card className={styles.banner} variant="surface" asChild>
          <main>
            <Heading size="9" as="h1">
              部活の報連相を<em>UP</em>
            </Heading>
            <Flex gap="2">
              <Button asChild size="4" variant="solid">
                <Link href="/auth/sign-up">始めよう</Link>
              </Button>
              <Button asChild size="4" variant="soft">
                <Link href="/auth/login">ログイン</Link>
              </Button>
            </Flex>
          </main>
        </Card>
        <Grid
          asChild
          className={styles.features}
          columns={{ xs: "1", sm: "2", md: "3" }}
          gap="4"
          mt="4"
        >
          <main>
            <Card>
              <Heading size="7" as="h2">
                いない時も、遅い時も。
              </Heading>
              <Text size="4" mt="2" mb="4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
            <Card>
              <Heading size="7" as="h2">
                いない時も、遅い時も。
              </Heading>
              <Text size="4" mt="2" mb="4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
            <Card>
              <Heading size="7" as="h2">
                いない時も、遅い時も。
              </Heading>
              <Text size="4" mt="2" mb="4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
          </main>
        </Grid>
      </Flex>
    </Flex>
  );
}
