"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#thesis", label: "The Thesis" },
  { href: "/#facts", label: "What It Remembers" },
  { href: "/#ai", label: "The Summary" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-6 py-6 md:px-10 md:py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="column-label text-[var(--ink)]" data-cursor>
          THREAD
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-cursor
              className="column-label transition-colors hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            data-cursor
            className="column-label transition-colors hover:text-[var(--accent)]"
          >
            LOG IN
          </Link>
          <Link
            href="/signup"
            data-cursor
            className="column-label border border-[var(--accent)] px-5 py-2.5 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            BEGIN →
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-[var(--ink)] md:hidden"
        >
          <Menu className="h-6 w-6" strokeWidth={1.25} />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <span className="column-label">THREAD</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-[var(--ink)]" strokeWidth={1.25} />
              </button>
            </div>
            <nav className="mt-16 flex flex-1 flex-col justify-center gap-8">
              {[...NAV_LINKS, { href: "/login", label: "Log In" }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display text-4xl text-[var(--ink)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="column-label border border-[var(--accent)] px-6 py-4 text-center text-[var(--accent)]"
            >
              BEGIN YOUR THREAD →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}