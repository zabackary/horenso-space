import { AppHeader } from "@/components/ui/app-header";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
};

export default function Home() {
  return (
    <>
      <AppHeader />
      <Flex
        direction="column"
        minHeight="100%"
        align="center"
        justify="center"
        gap="4"
        p="4"
      >
        {/* 16:9 aspect ratio */}
        <Image src="/status/404.png" alt="" width={640} height={360} />
        <Heading size="7" as="h2" style={{ textAlign: "center" }}>
          お探しのページは見つかりませんでした
        </Heading>
        <Flex justify="center" mt="4">
          <Button asChild size="4" variant="solid">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </Flex>
        <Text size="2" color="gray" mt="2" align="center" as="p">
          イメージは
          <Link
            href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/f1ed8e2c677943c3179bed7b0611fa3d3c315397/ResponseCode/404%20NotFound.png"
            target="_blank"
          >
            SAWARATSUKIさんの作品
          </Link>
          です。
        </Text>
      </Flex>
    </>
  );
}
