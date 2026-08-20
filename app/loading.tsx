/** Root-level suspense fallback — shown while any public route segment loads. */
export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[var(--bg)]"
      role="status"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border border-[var(--line)] border-t-[var(--accent)]" />
    </div>
  );
}