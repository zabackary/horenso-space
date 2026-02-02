import { AppHeader } from "@/components/ui/app-header";
import {
  getDocBySlug,
  getDocLanguageOptions,
  getDocListing,
  getDocsStaticParams,
} from "@/lib/docs/content";
import { initLingui } from "@/lib/i18n/initLingui";
import { Trans } from "@lingui/react/macro";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
import DocsSearch from "./docs-search";
import styles from "./page.module.css";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return await getDocsStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/docs/[lang]/[[...slug]]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = await getDocBySlug(lang, slug ?? []);

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

function formatDate(value?: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(parsed);
}

export default async function DocsPage({
  params,
}: PageProps<"/docs/[lang]/[[...slug]]">) {
  await initLingui();
  const { lang, slug } = await params;
  const page = await getDocBySlug(lang, slug ?? []);
  const listing = await getDocListing(lang);
  const languageOptions = await getDocLanguageOptions(slug ?? []);
  const displayNames = new Intl.DisplayNames([lang], {
    type: "language",
  });

  return (
    <Flex direction="column" minHeight="100%">
      <AppHeader />
      <Flex className={styles.layout} px={{ initial: "4", sm: "6" }} py="6">
        <Box className={styles.sidebar}>
          <Heading size="4" as="h2" mb="3">
            <Trans>Documentation</Trans>
          </Heading>
          <Box className={styles.languageSwitcher}>
            <Heading size="3" as="h3" mb="2">
              <Trans>Languages</Trans>
            </Heading>
            <Text size="2" mb="2">
              {languageOptions.map((option, i) => {
                const href =
                  option.slug.length === 0
                    ? `/docs/${option.lang}`
                    : `/docs/${option.lang}/${option.slug.join("/")}`;
                const label = new Intl.DisplayNames([option.lang], {
                  type: "language",
                }).of(option.lang);
                const isActive = option.lang === lang;

                return (
                  <Fragment key={option.lang}>
                    <Link
                      href={href}
                      className={
                        isActive
                          ? styles.activeLanguageLink
                          : styles.languageLink
                      }
                    >
                      {label}
                    </Link>
                    {i < languageOptions.length - 1 ? " · " : ""}
                  </Fragment>
                );
              })}
            </Text>
          </Box>
          <DocsSearch items={listing} activeSlug={slug ?? []} />
        </Box>
        <Box className={styles.contentColumn}>
          <Card className={styles.metaCard} variant="surface">
            <Flex direction="column" gap="1">
              <Heading size="6" as="h1">
                {page.meta.title}
              </Heading>
              <Text size="2" color="gray">
                {page.meta.author ? `By ${page.meta.author}` : ""}
                {page.meta.author && page.meta.publishDate ? " • " : ""}
                {formatDate(page.meta.publishDate)}
              </Text>
              {page.meta.description ? (
                <Text size="2" color="gray">
                  {page.meta.description}
                </Text>
              ) : null}
            </Flex>
          </Card>
          <Box
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
