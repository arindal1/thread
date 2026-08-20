# Changelog

All notable changes to this project are documented here.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## [0.3.3] - 2026-08-20

### Added
- Keep-alive endpoints and scheduled pings to avoid cold Neon/serverless
  starts in production:
  - `GET /api/health/db` (`app/api/health/db/route.ts`) - runs
    `SELECT 1` against Prisma to stop Neon's compute endpoint auto-
    suspending after ~5 minutes idle. Requires `Authorization: Bearer
    $CRON_SECRET` when `CRON_SECRET` is set.
  - `GET /api/health` (`app/api/health/route.ts`) - DB-free liveness
    check to keep the deployment itself warm.
  - `.github/workflows/keep-alive.yml` - scheduled job hitting the DB
    endpoint every 5 minutes and the frontend endpoint every 12 minutes;
    works on any host without a paid plan.
  - `vercel.json` - equivalent Vercel Cron config for Pro-plan projects
    (Hobby plan only allows daily crons, so GitHub Actions is the
    default path).
- `docs/Deployment.md` - end-to-end deployment guide (env vars, Neon
  setup, Vercel deploy steps, keep-alive scheduling, post-deploy
  checklist).
- `CRON_SECRET` added to `.env.example`.

## [0.3.2] - 2026-08-20

### Fixed
- Open-redirect bypass in `/api/auth/login`'s `next` redirect target: the
  guard only rejected `//host`-style protocol-relative URLs, missing that
  browsers' URL parser treats a leading backslash the same as a forward
  slash for `http`/`https`, so `next=/\evil.com` could still resolve
  off-site. Now validated with a regex that rejects any second leading
  slash *or* backslash.
- `ShaderBackground` (`components/gl/ShaderBackground.tsx`) recreated its
  entire WebGL context on every parent re-render: the `uniforms` prop's
  inline `= {}` default produced a new object identity each render, and
  that object sat in the effect's dependency array. Replaced with a shared
  stable empty-object default so the shader only reinitializes when
  `fragmentShader` actually changes.
- `prisma/schema.prisma` datasource was missing `directUrl`, so the
  `DIRECT_URL` env var documented in `.env.example` (Neon's pooled vs.
  direct connection pattern) was never actually read; migrations would
  have silently run over the pooled connection. Added
  `directUrl = env("DIRECT_URL")`.

### Verified (no change needed)
- Full pass over auth (session/password/rate-limit/http helpers), route
  guards, dashboard/nav components, GSAP/Framer/WebGL motion components,
  and the Prisma schema - no other correctness bugs found.

## [0.3.1] - 2026-08-20

### Added
- Pin people: a pin toggle on dashboard person cards
  (`components/dashboard/RecentPeopleGrid.tsx`) - pinned people always sort
  to the front of the grid. State persists client-side via
  `lib/hooks/usePinnedPeople.ts` (localStorage) since Person CRUD isn't
  wired to Prisma yet; `Person.isPinned` already exists in the schema, so
  this swaps for a real PATCH endpoint once that lands (TRD §8.2 "pin
  important people").

## [0.3.0] - 2026-08-20

### Added
- Global 404 page (`app/not-found.tsx`) matching the Marble & Ember design
  system instead of the framework default.
- Loading states: `app/loading.tsx` (root) and `app/dashboard/loading.tsx`
  (content pane only - sidebar/mobile nav stay mounted).
- Full SEO/meta surface: `metadataBase`, Open Graph + Twitter card metadata,
  `app/sitemap.ts`, `app/robots.ts` (disallows `/dashboard`, `/api`),
  `app/manifest.ts` (PWA manifest), `app/icon.svg` (favicon),
  `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`
  (generated at request time via `next/og`, no static asset pipeline
  needed).
- `Strict-Transport-Security` header alongside the existing baseline
  security headers in `next.config.mjs`.
- `README.md` with setup, scripts, project layout, and current-status
  summary (previously missing).

### Verified (no change needed)
- Redirect rules (`middleware.ts` + `app/dashboard/layout.tsx`
  defense-in-depth) already correctly prevent multiple sign-ins and
  dashboard access while logged out.
- Mobile layouts for landing, auth, and dashboard pages already collapse
  cleanly at `sm`/`md` breakpoints with no clipping or overflow found on
  review; no changes required this pass.
- Auth stack (bcrypt hashing, generic error messages, rate limiting,
  same-origin `next` redirect guard, zod input validation) reviewed against
  OWASP Top 10 - no new issues found.

## [0.2.0] - 2026-08-20

### Added
- Real credentials-based authentication: signup/login/logout API routes
  (`app/api/auth/*`), password hashing (bcrypt), signed-JWT session cookies
  (`lib/auth/session.ts`), and Edge `middleware.ts` route protection.
- Redirect rules: signed-in users are redirected away from `/`, `/login`,
  and `/signup` straight to `/dashboard`; signed-out users hitting
  `/dashboard/*` are redirected to `/login` (no more dead sign-in loops or
  reaching the dashboard while logged out).
- Logout controls in the dashboard sidebar and mobile nav drawer.
- Placeholder pages for `/dashboard/people`, `/dashboard/search`,
  `/dashboard/reminders`, `/dashboard/settings` so sidebar/mobile-nav links
  no longer 404.
- Baseline security headers (`X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`) via `next.config.mjs`.
- Best-effort in-memory rate limiting on the login/signup endpoints.
- `docs/Architecture.md` describing the current implementation and its
  gaps against `docs/TRD.md`.

### Changed
- `prisma/schema.prisma`: `User` now stores `passwordHash` (required for
  real authentication to exist at all).
- Login/signup forms now POST to real endpoints and surface server-side
  error messages instead of submitting to `action="#"`.
- Landing-page hero: the decorative WebGL ember-rings graphic is now shown
  only from the `lg` breakpoint up (was `md`), and the headline's
  font-size scaling was changed from a fixed clamp to viewport-relative
  sizing at `md`, fixing a layout issue where the second heading line could
  wrap unexpectedly and crowd the decorative graphic/CTA row on
  medium-width desktop windows.

### Removed
- Non-functional "Stay signed in" checkbox and dead `Forgot?` link on
  `/login` (no session-length toggle or password-reset flow exists yet;
  a dead link is a worse UX than no link).

### Security
- Login/signup no longer leak account existence via distinct error
  messages (generic "Incorrect email or password" / generic signup
  duplicate message).
- Login's `next` redirect target is validated as a same-origin relative
  path (open-redirect guard).
- Session cookies are `httpOnly`, `SameSite=Lax`, and `secure` in
  production.
- Noted (not yet fixed - requires a major-version bump and a test pass):
  6 high-severity `npm audit` advisories in Next.js/Prisma transitive
  dependencies (postcss, sharp, deepmerge-ts). See
  `docs/Architecture.md` §6.

## [0.1.0] - prior state

Initial scaffold: landing page, auth page UI (non-functional forms),
dashboard shell with static placeholder data, Prisma schema covering the
full TRD information model, WebGL/GSAP/Framer motion design system.