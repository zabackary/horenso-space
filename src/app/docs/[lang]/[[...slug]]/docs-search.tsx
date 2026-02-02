"use client";

import type { DocListingItem } from "@/lib/docs/content";
import { Trans, useLingui } from "@lingui/react/macro";
import { Flex, Text, TextField } from "@radix-ui/themes";
import Fuse from "fuse.js";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

export interface DocsSearchProps {
  items: DocListingItem[];
  activeSlug: string[];
}

export default function DocsSearch({ items, activeSlug }: DocsSearchProps) {
  const [query, setQuery] = useState("");
  const { t } = useLingui();
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["meta.title", "meta.description"],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [items],
  );

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const results = useMemo(() => {
    if (!hasQuery) {
      return [];
    }

    return fuse.search(trimmedQuery).map((result) => result.item);
  }, [fuse, hasQuery, trimmedQuery]);

  return (
    <Flex direction="column" gap="2" className={styles.searchBox}>
      <Text size="2" weight="bold">
        <Trans>Search</Trans>
      </Text>
      <TextField.Root
        type="search"
        placeholder={t`Search docs`}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {hasQuery ? (
        <Flex direction="column" gap="2">
          {results.length === 0 ? (
            <Text size="2" color="gray">
              <Trans>No matching docs</Trans>
            </Text>
          ) : (
            results.map((item) => {
              const href =
                item.slug.length === 0
                  ? `/docs/${item.lang}`
                  : `/docs/${item.lang}/${item.slug.join("/")}`;
              const isActive = activeSlug.join("/") === item.slug.join("/");

              return (
                <Link
                  key={`${item.lang}-${item.slug.join("/")}`}
                  href={href}
                  className={isActive ? styles.activeLink : styles.link}
                >
                  {item.meta.title}
                </Link>
              );
            })
          )}
        </Flex>
      ) : null}
    </Flex>
  );
}
