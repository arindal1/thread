import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="display text-2xl">Thread</p>
          <p className="lede mt-3 max-w-xs text-[var(--muted)]">
            A private memory system for people. Remembering well, at scale.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm md:flex md:gap-16">
          <div>
            <p className="column-label mb-4">Product</p>
            <ul className="space-y-2">
              <li><Link href="/#facts" className="hover:text-[var(--accent)]">What it remembers</Link></li>
              <li><Link href="/#ai" className="hover:text-[var(--accent)]">AI summaries</Link></li>
              <li><Link href="/signup" className="hover:text-[var(--accent)]">Begin</Link></li>
            </ul>
          </div>
          <div>
            <p className="column-label mb-4">Account</p>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-[var(--accent)]">Log in</Link></li>
              <li><Link href="/signup" className="hover:text-[var(--accent)]">Sign up</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="rule mx-auto mt-12 max-w-6xl" />
      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="column-label">
          © {new Date().getFullYear()} THREAD — PRIVATE, YOURS, ALWAYS GROWING
        </p>
        <p className="column-label flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>BUILT BY ARINDAL</span>
          <a
            href="https://linkedin.com/in/arindalchar"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--accent)]"
          >
            LINKEDIN
          </a>
          <a
            href="https://twitter.com/arindal_17"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--accent)]"
          >
            TWITTER
          </a>
          <a
            href="https://github.com/arindal1"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--accent)]"
          >
            GITHUB
          </a>
        </p>
      </div>
    </footer>
  );
}