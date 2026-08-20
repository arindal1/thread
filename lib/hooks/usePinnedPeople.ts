"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "thread:pinnedPeople";

/**
 * Client-side pin state for person cards, persisted to localStorage.
 *
 * Person CRUD isn't wired to Prisma yet (see docs/Architecture.md gap
 * table) — `Person.isPinned` already exists in the schema, so once a real
 * list/detail API lands, swap this hook's read/write for a PATCH to that
 * endpoint and drop the localStorage bookkeeping.
 */
export function usePinnedPeople() {
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPinned(new Set(JSON.parse(raw) as string[]));
    } catch {
      // Corrupt/blocked storage — fall back to nothing pinned.
    }
    setHydrated(true);
  }, []);

  const togglePin = useCallback((id: string) => {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Ignore write failures (private browsing / storage quota).
      }
      return next;
    });
  }, []);

  const isPinned = useCallback((id: string) => pinned.has(id), [pinned]);

  return { isPinned, togglePin, hydrated };
}