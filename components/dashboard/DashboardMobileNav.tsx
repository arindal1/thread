"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plus, LogOut } from "lucide-react";
import { DASH_NAV } from "./nav-items";

/** Mobile top bar with a slide-down drawer - replaces sidebar under md. */
export function DashboardMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-[var(--line)] px-5 py-4 md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="column-label text-[var(--ink)]">
          THREAD
        </Link>
        <div className="flex items-center gap-4">
          <button aria-label="Quick add" className="text-[var(--accent)]">
            <Plus className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[var(--bg)] px-6 py-6"
          >
            <div className="flex items-center justify-between">
              <span className="column-label">MENU</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-[var(--ink)]" strokeWidth={1.25} />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-2">
              {DASH_NAV.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 border-b border-[var(--line)] py-4 ${
                      active ? "text-[var(--accent)]" : "text-[var(--ink)]"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.25} />
                    <span className="display text-xl">{label}</span>
                  </Link>
                );
              })}
            </nav>
            <form action="/api/auth/logout" method="post" className="mt-auto pt-6">
              <button
                type="submit"
                className="flex w-full items-center gap-4 border-t border-[var(--line)] py-4 text-[var(--ink)]"
              >
                <LogOut className="h-5 w-5" strokeWidth={1.25} />
                <span className="display text-xl">Log Out</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}