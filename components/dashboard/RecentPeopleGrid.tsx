"use client";

import Link from "next/link";
import { ArrowUpRight, Pin } from "lucide-react";
import { usePinnedPeople } from "@/lib/hooks/usePinnedPeople";

export type RecentPerson = {
  id: string;
  name: string;
  role: string;
  last: string;
  tag: string;
};

/** Recent-people grid with pin toggling - pinned people always sort first. */
export function RecentPeopleGrid({ people }: { people: RecentPerson[] }) {
  const { isPinned, togglePin, hydrated } = usePinnedPeople();

  // Stable sort: pinned first, otherwise preserve incoming order. Skip
  // reordering until localStorage is read to avoid a hydration flash.
  const sorted = hydrated
    ? [...people].sort((a, b) => Number(isPinned(b.id)) - Number(isPinned(a.id)))
    : people;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {sorted.map((p) => {
        const pinned = hydrated && isPinned(p.id);
        return (
          <div
            key={p.id}
            className="group relative border-t border-[var(--line)] pt-5 transition-colors hover:border-[var(--accent)]"
          >
            <button
              type="button"
              onClick={() => togglePin(p.id)}
              aria-pressed={pinned}
              aria-label={pinned ? `Unpin ${p.name}` : `Pin ${p.name}`}
              data-cursor
              className={`absolute right-0 top-5 p-1 transition-colors ${
                pinned
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--accent)]"
              }`}
            >
              <Pin className="h-4 w-4" strokeWidth={1.5} fill={pinned ? "currentColor" : "none"} />
            </button>
            <Link href="/dashboard/people" data-cursor className="block pr-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="display text-xl">{p.name}</h3>
                  <p className="lede mt-1 text-sm text-[var(--muted)]">{p.role}</p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
                  strokeWidth={1.5}
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="column-label">{p.tag}</span>
                <span className="column-label text-[var(--muted)]">{p.last}</span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}