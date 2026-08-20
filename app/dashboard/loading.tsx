/** Dashboard suspense fallback — sidebar/mobile-nav stay mounted (layout),
 * only this swaps in for the content pane while a segment loads. */
export default function DashboardLoading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border border-[var(--line)] border-t-[var(--accent)]" />
    </div>
  );
}