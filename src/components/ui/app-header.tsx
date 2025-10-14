import { logout } from "@/actions/auth";
import getProfile from "@/lib/auth/getProfile";
import { createClient } from "@/lib/supabase/server";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Select,
} from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import styles from "./app-header.module.css";

export async function AppHeader({
  ...props
}: ComponentPropsWithoutRef<"header">) {
  const supabase = await createClient();
  const profile = await getProfile(supabase);
  const { data: clubs } = await supabase
    .from("joined_clubs")
    .select("id, name, school")
    .throwOnError();

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
        {profile ? (
          <>
            {clubs.length > 0 ? (
              <Select.Root
                defaultValue={clubs[0].id ?? ""}
                onValueChange={(value) => {
                  // Navigate to the selected club's page
                  window.location.href = `/app/club/${value}`;
                }}
              >
                <Select.Trigger aria-label="Select Club" />
                <Select.Content>
                  {clubs.map((club) => (
                    <Select.Item key={club.id} value={club.id ?? ""}>
                      {club.name} ({club.school})
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            ) : (
              <Button asChild size="3" variant="outline">
                <Link href="/app/club/create">Join a Club</Link>
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
              <DropdownMenu.Content align="end" sideOffset={5}>
                <form>
                  <DropdownMenu.Item asChild>
                    <Link href="/app/profile">Profile</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link href="/app/settings">Settings</Link>
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
