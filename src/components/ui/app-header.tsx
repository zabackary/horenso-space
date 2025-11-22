import { logout } from "@/actions/auth";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import { HomeIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
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
                <Tooltip content="Select a club" style={{ zIndex: 1 }}>
                  <DropdownMenu.Trigger>
                    <Button size="3" variant="outline">
                      <HomeIcon />
                      <Badge>{clubs.length}</Badge>
                    </Button>
                  </DropdownMenu.Trigger>
                </Tooltip>
                <DropdownMenu.Content align="center" style={{ zIndex: 1 }}>
                  <DropdownMenu.Item asChild>
                    <Link href="/app">Home</Link>
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
                <Link href="/app/club/create">Create a Club</Link>
              </Button>
            )}

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <IconButton variant="ghost">
                  <Avatar
                    src={profile.avatar_url ?? undefined}
                    alt={profile.full_name}
                    fallback={profile.full_name.charAt(0)}
                  />
                </IconButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                align="end"
                sideOffset={5}
                style={{ zIndex: 1 }}
              >
                <form style={{ display: "contents" }}>
                  <DropdownMenu.Item asChild>
                    <Link href="/app/users/me">Profile and Settings</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item asChild>
                    <button formAction={logout}>Logout</button>
                  </DropdownMenu.Item>
                </form>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </>
        ) : (
          <>
            <Button asChild size="3" variant="soft">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild size="3" variant="solid">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </>
        )}
      </header>
    </Flex>
  );
}
