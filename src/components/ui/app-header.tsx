import { createClient } from "@/lib/supabase/server";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import styles from "./app-header.module.css";

export async function AppHeader({
  ...props
}: ComponentPropsWithoutRef<"header">) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

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
        {user ? (
          <>
            <Button asChild size="3" variant="soft">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="3" variant="solid">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </>
        ) : (
          <Button asChild size="3" variant="solid">
            <Link href="/app">Go to App</Link>
          </Button>
        )}
      </header>
    </Flex>
  );
}
