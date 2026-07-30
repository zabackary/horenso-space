"use client";

import { useState } from "react";

/**
 * Tracks relay-style cursor pagination state (`first`/`after`) for a single
 * GraphQL connection, including the cursor history needed to page backwards.
 */
export function useCursorPagination(pageSize: number) {
  const [after, setAfter] = useState<string | null>(null);
  const [history, setHistory] = useState<(string | null)[]>([]);

  function goToNext(endCursor: string | null | undefined) {
    if (!endCursor) return;
    setHistory((h) => [...h, after]);
    setAfter(endCursor);
  }

  function goToPrevious() {
    const previous = history.at(-1) ?? null;
    setHistory((h) => h.slice(0, -1));
    setAfter(previous);
  }

  return {
    first: pageSize,
    after,
    hasPrevious: history.length > 0,
    goToNext,
    goToPrevious,
  };
}
