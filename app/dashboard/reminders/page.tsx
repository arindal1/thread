import { BellRing } from "lucide-react";

export const metadata = { title: "Reminders - Thread" };

// Placeholder - backs onto the Reminder model (prisma/schema.prisma) once
// create/complete flows land.
export default function RemindersPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="column-label mb-3">FOLLOW UP</p>
      <h1 className="display mb-10 text-3xl md:text-4xl">Nothing forgotten.</h1>
      <div className="flex flex-col items-start gap-4 border border-dashed border-[var(--line)] px-6 py-16 text-center sm:items-center sm:text-center sm:px-10">
        <BellRing className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.25} />
        <p className="lede max-w-sm text-[var(--muted)]">
          Reminders and follow-ups are coming soon - due dates, priorities,
          and completion tracking for every thread.
        </p>
      </div>
    </div>
  );
}