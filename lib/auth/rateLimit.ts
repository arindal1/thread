// Best-effort in-memory rate limiter for auth endpoints (login/signup).
// Single-process only - resets on deploy/restart and is NOT shared across
// serverless instances. Sufficient to blunt casual credential stuffing /
// brute force during early development; replace with a shared store
// (Upstash Redis, etc.) before relying on it in a scaled deployment. See
// docs/Architecture.md "Known limitations".

const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;

const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}