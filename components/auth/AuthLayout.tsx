import type { ReactNode } from "react";
import Link from "next/link";
import { MarbleBackground } from "@/components/gl/MarbleBackground";

/**
 * Shared frame for /login and /signup: a full-bleed marble backdrop on the
 * left (desktop) with an editorial brand statement, and the form itself in
 * a stone-panel card. Collapses to a single column with a smaller top
 * strip of the backdrop on mobile.
 */
export function AuthLayout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col md:flex-row">
      <Link
        href="/"
        className="column-label absolute left-6 top-6 z-20 text-[var(--ink)] md:left-10 md:top-8"
        data-cursor
      >
        ← THREAD
      </Link>

      {/* Brand panel */}
      <div className="relative flex h-[32vh] shrink-0 items-end overflow-hidden md:h-auto md:w-1/2">
        <MarbleBackground />
        <div className="relative z-10 px-6 pb-8 md:px-12 md:pb-16">
          <p className="lede text-lg text-[var(--accent)] md:text-xl">
            A private memory system for people —
          </p>
          <h1 className="display mt-3 max-w-md text-3xl leading-[0.95] md:text-5xl">
            Every thread, kept.
          </h1>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 items-center justify-center bg-[var(--bg)] px-6 py-12 md:px-12">
        <div className="w-full max-w-sm">
          <p className="column-label mb-3">{eyebrow}</p>
          <h2 className="display mb-8 text-3xl">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}