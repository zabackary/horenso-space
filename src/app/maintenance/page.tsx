import DateRenderer from "@/components/date";
import { initLingui } from "@/lib/i18n/initLingui";
import { MAINTENANCE } from "@/maintainance";
import { Trans } from "@lingui/react/macro";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "../error.module.css";

export const metadata: Metadata = {
  title: "Service Unavailable",
};

export default async function NotFound() {
  await initLingui();

  const sawaratsukiLink = (
    <Link
      href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/f1ed8e2c677943c3179bed7b0611fa3d3c315397/ResponseCode/503%20ServiceUnavailable.png"
      target="_blank"
    >
      SAWARATSUKI
    </Link>
  );

  if (!MAINTENANCE) {
    redirect("/");
  }

  const i18n = await initLingui();

  return (
    <>
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
          src="/status/503.png"
          alt=""
          width={640}
          height={360}
          priority
        />
        <Heading size="7" as="h2" style={{ textAlign: "center" }}>
          <Trans>Service Unavailable</Trans>
        </Heading>
        <Card>
          {MAINTENANCE.eta && (
            <Text size="2" color="gray" align="center" as="p">
              Service is planned to resume at{" "}
              <DateRenderer
                date={MAINTENANCE.eta}
                dateStyle="full"
                timeStyle="short"
              />
              .
            </Text>
          )}
          <Text size="2" color="gray" align="center" as="p">
            {MAINTENANCE.message[i18n.locale] ?? MAINTENANCE.fallbackMessage}
          </Text>
        </Card>
        <Text size="2" color="gray" mt="2" align="center" as="p">
          <Trans>Image by {sawaratsukiLink}</Trans>
        </Text>
      </Flex>
    </>
  );
}
