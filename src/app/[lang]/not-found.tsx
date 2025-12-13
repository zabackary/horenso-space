import { AppHeader } from "@/components/ui/app-header";
import getRequestLocale from "@/lib/i18n/getRequestLocale";
import { initLingui } from "@/lib/i18n/initLingui";
import { Trans } from "@lingui/react/macro";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404",
};

export default async function NotFound() {
  const requestHeaders = await headers();
  const lang = getRequestLocale(requestHeaders);
  initLingui(lang);
  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="4"
        p="4"
        flexGrow="1"
      >
        {/* 16:9 aspect ratio */}
        <Image
          className={styles.hero}
          src="/status/404.png"
          alt=""
          width={640}
          height={360}
          priority
        />
        <Heading size="7" as="h2" style={{ textAlign: "center" }}>
          <Trans key="notFound.heading">Page not found</Trans>
        </Heading>
        <Flex justify="center" mt="4">
          <Button asChild size="4" variant="solid">
            <Link href="/">
              <Trans key="notFound.backHome">Back to home</Trans>
            </Link>
          </Button>
        </Flex>
        <Text size="2" color="gray" mt="2" align="center" as="p">
          <Trans key="notFound.imageCredit">
            Image by{" "}
            <Link
              href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/f1ed8e2c677943c3179bed7b0611fa3d3c315397/ResponseCode/404%20NotFound.png"
              target="_blank"
            >
              SAWARATSUKI
            </Link>
          </Trans>
        </Text>
      </Flex>
    </>
  );
}
