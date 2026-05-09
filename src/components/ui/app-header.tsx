import { gql } from "@/gql";
import { query } from "@/lib/apollo/server";
import { createClient } from "@/lib/supabase/server";
import { Trans } from "@lingui/react/macro";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import clsx from "clsx";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { AppHeaderMenu } from "./app-header-menu";
import styles from "./app-header.module.css";

const appHeaderQuery = gql(`
  query AppHeader($me: UUID) {
    clubMembersCollection(filter: { userId: { eq: $me } }) {
      edges {
        node {
          club {
            name,
            id
          }
        }
      }
    }
    profilesCollection(filter: { id: { eq: $me } }) {
      edges {
        node {
          id
          avatarUrl
          bio
          createdAt
          fullName
          nickname
          school
        }
      }
    }
  }
`);

export interface AppHeaderProps extends ComponentPropsWithoutRef<"header"> {
  header?: {
    text: React.ReactNode;
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
  const { data } = await query({
    query: appHeaderQuery,
    variables: {
      me: (await supabase.auth.getClaims()).data?.claims.sub ?? null,
    },
  });
  const clubs =
    data?.clubMembersCollection?.edges.map((e) => e.node.club ?? []).flat() ??
    [];
  const profile = data?.profilesCollection?.edges[0]?.node ?? null;

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
        disableSticky ? "" : styles.sticky,
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
                <span>
                  <Trans>Horenso SPACE</Trans>
                </span>
                <span>
                  <Trans>Horenso SPACE 🥬</Trans>
                </span>
              </>
            )}
          </Heading>
        </Link>
        <Box flexGrow="1" />
        {profile && clubs ? (
          <>
            <AppHeaderMenu profile={profile} clubs={clubs} />
          </>
        ) : (
          <>
            <Button asChild size="3" variant="soft">
              <Link href="/auth/login">
                <Trans>Login</Trans>
              </Link>
            </Button>
            <Button asChild size="3" variant="solid">
              <Link href="/auth/sign-up">
                <Trans>Sign up</Trans>
              </Link>
            </Button>
          </>
        )}
      </header>
    </Flex>
  );
}
