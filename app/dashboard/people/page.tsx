import { Users } from "lucide-react";

export const metadata = { title: "People — Thread" };

// Placeholder — wires up to Prisma's Person model (see prisma/schema.prisma)
// once list/detail/create flows land. Keeps the nav route from 404ing.
export default function PeoplePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="column-label mb-3">YOUR PEOPLE</p>
      <h1 className="display mb-10 text-3xl md:text-4xl">Everyone you keep.</h1>
      <div className="flex flex-col items-start gap-4 border border-dashed border-[var(--line)] px-6 py-16 text-center sm:items-center sm:text-center sm:px-10">
        <Users className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.25} />
        <p className="lede max-w-sm text-[var(--muted)]">
          The people directory is coming soon — add, search, and organize
          everyone you keep a thread with.
        </p>
      </div>
    </div>
  );
}