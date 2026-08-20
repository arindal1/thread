# Thread — Architecture

Source of truth for product requirements: [TRD.md](./TRD.md). This document
tracks what's actually built, how it's wired together, and known gaps —
kept current alongside [../CHANGELOG.md](../CHANGELOG.md).

## 1. Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript (strict)
- **Styling**: Tailwind CSS + a single hand-authored design system in
  `app/globals.css` ("Marble & Ember" — neoclassical stone + gold leaf,
  cinematic dark luxury)
- **Motion**: Framer Motion (`components/ui/Reveal.tsx`, nav drawers), GSAP +
  ScrollTrigger (`lib/gsap/useGsapScroll.ts`, hero line reveal)
- **WebGL**: raw three.js shader/canvas components (`components/gl/`) —
  no react-three-fiber runtime cost for the hero backdrop
- **Database**: PostgreSQL via Prisma (`prisma/schema.prisma`), Neon in
  production
- **Auth**: hand-rolled credentials auth (see §3) — no third-party auth
  provider is wired in yet
- **AI**: not yet wired (`lib/ai` does not exist yet); TRD calls for Gemini

## 2. Route map

```
/                     landing page (public)
/login, /signup       auth pages (public, redirect away if already signed in)
/dashboard            overview (protected)
/dashboard/people     placeholder — Person CRUD not yet implemented
/dashboard/search     placeholder — lexical/semantic search not yet implemented
/dashboard/reminders  placeholder — Reminder CRUD not yet implemented
/dashboard/settings   placeholder — profile/export/delete not yet implemented
/api/auth/signup      POST — create account, start session
/api/auth/login       POST — verify credentials, start session
/api/auth/logout      POST — clear session
/sitemap.xml          generated (app/sitemap.ts) — public routes only
/robots.txt           generated (app/robots.ts) — disallows /dashboard, /api
/manifest.webmanifest generated (app/manifest.ts)
```

Any unmatched route renders `app/not-found.tsx` (styled 404, not the
framework default). `app/loading.tsx` and `app/dashboard/loading.tsx`
provide Suspense fallbacks while a route segment loads.

## 3. Auth design

Minimal credentials auth, no third-party provider:

- **Password storage**: bcrypt (`lib/auth/password.ts`, 12 salt rounds).
- **Session**: a signed JWT (`jose`, HS256) in an `httpOnly`, `SameSite=Lax`
  cookie (`lib/auth/session.ts`). `secure` is on in production. 30-day
  expiry. JWT (not a DB-backed session table) was chosen so the session can
  be verified inside Edge middleware without a database round trip.
- **Route protection**: `middleware.ts` runs before every request to `/`,
  `/login`, `/signup`, and `/dashboard/*`:
  - no/invalid session + `/dashboard/*` → redirect to `/login?next=<path>`
  - valid session + `/`, `/login`, or `/signup` → redirect to `/dashboard`
    (prevents an already-signed-in user from reaching the sign-in forms —
    "avoid multiple sign-ins")
- **Defense in depth**: `app/dashboard/layout.tsx` independently calls
  `getCurrentSession()` and redirects server-side even though middleware
  already gates the route (TRD §18 — authorization enforced at every layer).
- **Rate limiting**: `lib/auth/rateLimit.ts` is an in-memory fixed-window
  limiter (10 attempts/min per IP) on `/api/auth/login` and `/api/auth/signup`.
- **Error messages**: login always returns the generic "Incorrect email or
  password" (no user-enumeration via distinct error text); signup returns a
  generic message on duplicate email for the same reason.
- **Open-redirect guard**: the `next` param on `/api/auth/login` is only
  honored if it's a same-origin relative path — validated with
  `/^\/(?!\/|\\)/`, which rejects both `//host` and `/\host` forms (a
  leading backslash is treated as a path separator by browsers' URL parser
  for `http`/`https`, so a naive `!startsWith("//")` check alone is
  bypassable).

### Known limitations

- The rate limiter is per-process memory — it resets on redeploy and isn't
  shared across multiple server instances. Fine for a single Vercel
  instance under light load; replace with a shared store (Upstash Redis)
  before scaling out.
- No CSP header yet — the WebGL canvas hero and the inline font-fallback
  `<style>` tag would need a deliberately tuned policy. Other baseline
  headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy,
  Permissions-Policy, Strict-Transport-Security) are set in
  `next.config.mjs`.
- No password reset flow yet (the old "Forgot?" link was removed from
  `/login` rather than left as a dead end — add it back once implemented).
- `prisma/schema.prisma` now requires `User.passwordHash`; run
  `npm run db:migrate` against a real database before this compiles against
  live data.

## 4. Data model

`prisma/schema.prisma` implements the full TRD §7 information model
(Person, Note, Event, Topic, Reminder, ImportantDate, AiSummary), tenant-
isolated by `ownerUserId`/`personId` with indexes on the fields TRD §14
calls out. **No CRUD API or UI reads/writes these models yet** — the
dashboard, people, search, and reminders pages currently render static
placeholder content. Wiring real data access is the largest remaining gap
versus the TRD.

## 5. What's implemented vs. TRD

| TRD area | Status |
|---|---|
| §8.1 Auth | Implemented (credentials, session, route guards) |
| §8.2–§8.10 Person/Note/Event/Reminder CRUD, timeline, search, AI | Not implemented — schema exists, no API/UI |
| §17 Performance | Not measured (no real data path yet to measure) |
| §18 Security | Password hashing, session cookies, rate limiting, security headers, input validation (zod) done; CSP and audit logging still open |
| §19 Privacy | Data is tenant-scoped by schema design; export/delete flows not built |
| §20 Observability | Not implemented |

This is a substantial gap — the TRD describes a full product; this pass
focused on fixing existing bugs, UI/responsiveness, and closing the most
severe security/route gap (no real auth existed at all previously). Full
CRUD + AI + search is a separate, larger effort tracked for future work.

## 6. Dependency security posture

`npm audit` currently reports 6 high-severity advisories, all requiring a
**major** version bump to clear (Next.js 15 → 16, Prisma 6 → 7). Given no
build/test pass was run this session, these were **not** force-upgraded —
that risks breaking the app with no way to verify it still works. Track as
a deferred, prioritized upgrade that needs its own test pass.