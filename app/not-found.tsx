import Link from "next/link";
import { Feather } from "lucide-react";

export const metadata = { title: "Page not found - Thread" };

/** Global 404 - catches unmatched routes under any segment. */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-6 text-center">
      <Feather className="mb-8 h-8 w-8 text-[var(--accent)]" strokeWidth={1.25} />
      <p className="column-label mb-4">404 - LOST THREAD</p>
      <h1 className="display text-4xl text-[var(--ink)] md:text-6xl">
        This page isn&rsquo;t in the record.
      </h1>
      <p className="lede mt-6 max-w-md text-base text-[var(--muted)] md:text-lg">
        Whatever you were looking for doesn&rsquo;t exist here, or has moved.
      </p>
      <Link
        href="/"
        data-cursor
        className="column-label mt-10 border border-[var(--accent)] px-6 py-3 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
      >
        ← BACK TO THREAD
      </Link>
    </div>
  );
}