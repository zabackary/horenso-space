import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import styles from "./app-header.module.css";
import clsx from "clsx";

export function AppHeader({ ...props }: ComponentPropsWithoutRef<"header">) {
  return (
    <Flex
      p="4"
      align="center"
      gap="2"
      asChild
      {...props}
      className={clsx(styles.header, props.className)}
    >
      <header>
        <Link href="/" className={styles["logo-link"]}>
          <Heading as="h1" className={styles["header-text"]}>
            <span>報連相SPACE</span>
            <span>ほうれん草SPACE 🥬</span>
          </Heading>
        </Link>
        <Box flexGrow="1" />
        <Button asChild size="3" variant="soft">
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild size="3" variant="solid">
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </header>
    </Flex>
  );
}
