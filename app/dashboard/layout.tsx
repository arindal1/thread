import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import { getCurrentSession } from "@/lib/auth/session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Defense-in-depth: middleware.ts already blocks unauthenticated requests
  // to /dashboard/*, but every data-access layer re-checks independently
  // (TRD §18 - authorization enforced at every layer, not just the edge).
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar email={session.email} />
      <div className="flex flex-1 flex-col">
        <DashboardMobileNav />
        <main className="flex-1 px-5 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}