import { Search } from "lucide-react";

export const metadata = { title: "Search - Thread" };

// Placeholder - will back onto lexical + semantic search (TRD §10) once
// wired to notes/people content.
export default function SearchPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="column-label mb-3">FIND ANYTHING</p>
      <h1 className="display mb-10 text-3xl md:text-4xl">Search your thread.</h1>
      <div className="mb-10 flex items-center gap-3 border-b border-[var(--line)] pb-4 focus-within:border-[var(--accent)]">
        <Search className="h-4 w-4 text-[var(--muted)]" strokeWidth={1.5} />
        <input
          type="search"
          placeholder="Search people, notes, tags…"
          disabled
          className="lede w-full bg-transparent text-lg text-[var(--ink)] outline-none placeholder:text-[var(--muted)] disabled:cursor-not-allowed"
        />
      </div>
      <p className="lede max-w-sm text-[var(--muted)]">
        Semantic search across notes and summaries is coming soon.
      </p>
    </div>
  );
}