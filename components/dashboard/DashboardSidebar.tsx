"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { DASH_NAV } from "./nav-items";

/** Desktop sidebar - persistent, hairline-divided, neoclassical restraint. */
export function DashboardSidebar({ email }: { email?: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--line)] px-6 py-8 md:flex">
      <Link href="/" className="column-label mb-12 block text-[var(--ink)]" data-cursor>
        THREAD
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {DASH_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              data-cursor
              className={`flex items-center gap-3 rounded-sm px-3 py-3 transition-colors ${
                active
                  ? "bg-[var(--surface)] text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.25} />
              <span className="column-label">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rule mb-6" />
      {email && (
        <p className="column-label mb-4 truncate text-[var(--muted)]" title={email}>
          {email}
        </p>
      )}
      <form action="/api/auth/logout" method="post">
        <button
          type="submit"
          data-cursor
          className="flex w-full items-center gap-3 px-3 py-2 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.25} />
          <span className="column-label">LOG OUT</span>
        </button>
      </form>
    </aside>
  );
}