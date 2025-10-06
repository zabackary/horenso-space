import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "報連相SPACE: 部活の報連相をUP",
  },
};

export default function Home() {
  return (
    <Flex direction="column" minHeight="100%">
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
                誰がいないか、はっきりわかる
              </Heading>
              <Text size="4" mt="2" mb="4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
            <Card>
              <Heading size="7" as="h2">
                必要なドキュメントを簡単に共有
              </Heading>
              <Text size="4" mt="2" mb="4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
            <Card>
              <Heading size="7" as="h2">
                どんな部活でも。
              </Heading>
              <Text size="4" mt="2" mb="4">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Card>
          </main>
        </Grid>
        <Flex direction="column" p="2">
          <Text size="2" align="center" mt="4" mb="2">
            札幌光星中学高等学校吹奏楽部とクリスチャン・アカデミー・イン・ジャパンロボティクス部の作品
          </Text>
          <Text size="2" align="center" mb="2">
            ©{new Date().getFullYear()} Horenso SPACE
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
