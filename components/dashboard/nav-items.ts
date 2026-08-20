import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Search,
  BellRing,
  Settings,
} from "lucide-react";

export type DashNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const DASH_NAV: DashNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/people", label: "People", icon: Users },
  { href: "/dashboard/search", label: "Search", icon: Search },
  { href: "/dashboard/reminders", label: "Reminders", icon: BellRing },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];