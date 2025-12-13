import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { HomeIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  Tooltip,
} from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { AppHeaderMenu } from "./app-header-menu";
import styles from "./app-header.module.css";

export interface AppHeaderProps extends ComponentPropsWithoutRef<"header"> {
  header?: {
    text: string;
    href: string;
  };
  disableSticky?: boolean;
}

export async function AppHeader({
  header,
  disableSticky,
  ...props
}: AppHeaderProps) {
  const supabase = await createClient();
  const profile = await getProfile(supabase);
  const { data: clubs } = await supabase
    .from("joined_clubs")
    .select("id, name, school");

  return (
    <Flex
      p="4"
      align="center"
      gap="2"
      asChild
      {...props}
      className={clsx(
        styles.header,
        props.className,
        disableSticky ? "" : styles.sticky
      )}
    >
      <header>
        <Link
          href={header?.href ?? "/"}
          className={clsx(styles["logo-link"], header ? "" : styles.animated)}
        >
          <Heading as="h1" className={styles["header-text"]}>
            {header ? (
              header.text
            ) : (
              <>
                <span>報連相SPACE</span>
                <span>ほうれん草SPACE 🥬</span>
              </>
            )}
          </Heading>
        </Link>
        <Box flexGrow="1" />
        {profile && clubs ? (
          <>
            {clubs ? (
              <DropdownMenu.Root>
                <Tooltip
                  content={<Trans id="header.selectClub">Select a club</Trans>}
                  style={{ zIndex: 1 }}
                >
                  <DropdownMenu.Trigger>
                    <Button size="3" variant="outline">
                      <HomeIcon />
                      <Badge>{clubs.length}</Badge>
                    </Button>
                  </DropdownMenu.Trigger>
                </Tooltip>
                <DropdownMenu.Content align="center" style={{ zIndex: 1 }}>
                  <DropdownMenu.Item asChild>
                    <Link href="/app">
                      <Trans id="header.home">Home</Trans>
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  {clubs.map((club) => (
                    <DropdownMenu.Item asChild key={club.id}>
                      <Link href={`/app/${club.id}`}>{club.name}</Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Button asChild size="3" variant="outline">
                <Link href="/app/club/create">
                  <Trans id="header.createClub">Create a Club</Trans>
                </Link>
              </Button>
            )}
            <AppHeaderMenu profile={profile} />
          </>
        ) : (
          <>
            <Button asChild size="3" variant="soft">
              <Link href="/auth/login">
                <Trans id="auth.login">Login</Trans>
              </Link>
            </Button>
            <Button asChild size="3" variant="solid">
              <Link href="/auth/sign-up">
                <Trans id="auth.signup">Sign up</Trans>
              </Link>
            </Button>
          </>
        )}
      </header>
    </Flex>
  );
}
