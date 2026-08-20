import Link from "next/link";
import {
  Plus,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";
import { RecentPeopleGrid } from "@/components/dashboard/RecentPeopleGrid";

export const metadata = { title: "Dashboard — Thread" };

// Placeholder data — replace with a query against Prisma once auth/data
// wiring lands (see prisma/schema.prisma: Person, lastInteractionAt, etc.)
const stats = [
  { icon: Users, label: "People kept", value: "42" },
  { icon: Clock, label: "Due for a message", value: "6" },
  { icon: Sparkles, label: "AI summaries ready", value: "12" },
];

const people = [
  { id: "aanya-kapoor", name: "Aanya Kapoor", role: "Product Lead, Nimbus", last: "2 days ago", tag: "Work" },
  { id: "marcus-webb", name: "Marcus Webb", role: "Old college friend", last: "3 weeks ago", tag: "Personal" },
  { id: "fatima-rahman", name: "Fatima Rahman", role: "Recruiter, Halcyon", last: "1 month ago", tag: "Network" },
  { id: "theo-laurent", name: "Théo Laurent", role: "Neighbor", last: "5 days ago", tag: "Personal" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="column-label mb-3">GOOD EVENING</p>
          <h1 className="display text-3xl md:text-4xl">Your thread, at a glance.</h1>
        </div>
        <button
          data-cursor
          className="column-label flex items-center justify-center gap-2 border border-[var(--accent)] px-6 py-3 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} /> ADD PERSON
        </button>
      </div>

      {/* Stats */}
      <div className="mb-16 grid grid-cols-1 gap-px overflow-hidden border border-[var(--line)] sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-[var(--bg)] p-6">
            <Icon className="mb-4 h-5 w-5 text-[var(--accent)]" strokeWidth={1.25} />
            <p className="display text-3xl">{value}</p>
            <p className="column-label mt-2">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent people */}
      <div className="mb-6 flex items-center justify-between">
        <p className="column-label">RECENT THREADS</p>
        <Link href="/dashboard/people" className="column-label text-[var(--accent)]" data-cursor>
          VIEW ALL →
        </Link>
      </div>
      <div className="rule mb-8" />

      <RecentPeopleGrid people={people} />
    </div>
  );
}