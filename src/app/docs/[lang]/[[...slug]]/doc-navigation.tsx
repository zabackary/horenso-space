import type { DocNavigation } from "@/lib/docs/content";
import { Trans } from "@lingui/react/macro";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./page.module.css";

interface DocNavigationProps {
  lang: string;
  navigation: DocNavigation;
}

function buildHref(lang: string, slug: string[]) {
  if (slug.length === 0) {
    return `/docs/${lang}`;
  }
  return `/docs/${lang}/${slug.join("/")}`;
}

export default function DocNavigation({
  lang,
  navigation,
}: DocNavigationProps) {
  if (!navigation.prev && !navigation.next) {
    return null;
  }

  return (
    <div className={styles.navSection}>
      {navigation.prev ? (
        <Card asChild className={styles.navCard} variant="surface">
          <Link
            href={buildHref(lang, navigation.prev.slug)}
            className={styles.navLink}
          >
            <Flex direction="column" gap="1">
              <Text size="1" color="gray">
                <Trans>Previous</Trans>
              </Text>
              <Text size="3" weight="medium">
                {navigation.prev.title}
              </Text>
            </Flex>
          </Link>
        </Card>
      ) : null}
      {navigation.next ? (
        <Card asChild className={styles.navCard} variant="surface">
          <Link
            href={buildHref(lang, navigation.next.slug)}
            className={styles.navLink}
          >
            <Flex direction="column" gap="1">
              <Text size="1" color="gray">
                <Trans>Next</Trans>
              </Text>
              <Text size="3" weight="medium">
                {navigation.next.title}
              </Text>
            </Flex>
          </Link>
        </Card>
      ) : null}
    </div>
  );
}
