import { AppHeader } from "@/components/ui/app-header";
import { Trans } from "@lingui/react/macro";
import { Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
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
      <AppHeader />
      <Flex direction="column" p="2">
        <Card className={styles.banner} variant="surface" asChild>
          <main>
            <Heading size="9" as="h1">
              <Trans key="landing.headline">
                <em>Improve</em> your club communication
              </Trans>
            </Heading>
            <Flex gap="2">
              <Button asChild size="4" variant="solid">
                <Link href="/auth/sign-up">始めよう</Link>
              </Button>
              <Button asChild size="4" variant="surface">
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
                Understand quickly who's where and when
              </Heading>
            </Card>
            <Card>
              <Heading size="7" as="h2">
                Find your shared documents easily
              </Heading>
            </Card>
            <Card>
              <Heading size="7" as="h2">
                For any club, any team, any group
              </Heading>
            </Card>
          </main>
        </Grid>
        <Flex direction="column" p="2">
          <Text size="2" align="center" mt="4" mb="2">
            札幌光星中学高等学校吹奏楽部とクリスチャン・アカデミー・イン・ジャパンロボティクス部のが制作
          </Text>
          <Text size="2" align="center" mb="2">
            ©{new Date().getFullYear()} Horenso SPACE
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
