import { Settings } from "lucide-react";

export const metadata = { title: "Settings — Thread" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="column-label mb-3">YOUR ACCOUNT</p>
      <h1 className="display mb-10 text-3xl md:text-4xl">Settings.</h1>
      <div className="flex flex-col items-start gap-4 border border-dashed border-[var(--line)] px-6 py-16 text-center sm:items-center sm:text-center sm:px-10">
        <Settings className="h-6 w-6 text-[var(--accent)]" strokeWidth={1.25} />
        <p className="lede max-w-sm text-[var(--muted)]">
          Profile, data export, and account deletion controls are coming soon.
        </p>
      </div>
    </div>
  );
}