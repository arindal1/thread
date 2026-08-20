# Thread — A Personal CRM

A private memory system for people. Thread stores structured facts and
free-form notes about everyone you know, organizes them by time and
relevance, and (eventually) uses AI to surface the right context before
your next conversation.

Product spec: [docs/TRD.md](docs/TRD.md) · current implementation state:
[docs/Architecture.md](docs/Architecture.md) · release history:
[CHANGELOG.md](CHANGELOG.md).

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS, hand-authored design system (`app/globals.css`)
- Framer Motion + GSAP/ScrollTrigger for motion
- three.js for the WebGL hero backdrop
- PostgreSQL + Prisma (Neon in production)
- Hand-rolled credentials auth (bcrypt + signed JWT session cookie)

## Getting started

```bash
npm install
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET
npm run db:generate
npm run db:migrate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Purpose                              |
| ------------------- | ------------------------------------- |
| `npm run dev`        | Start the dev server                  |
| `npm run build`       | Production build                      |
| `npm run start`       | Serve a production build              |
| `npm run lint`        | ESLint                                |
| `npm run db:generate` | Regenerate the Prisma client          |
| `npm run db:migrate`  | Run/create Prisma migrations (dev)    |

## Project layout

```
app/            routes (App Router), SEO/meta conventions (sitemap, robots,
                manifest, icons, OG image), root layout + fonts
components/     auth, dashboard, layout, gl (WebGL), ui
lib/            auth (session/password/rate-limit), db (Prisma client),
                validators (zod schemas), gsap helpers
prisma/         schema.prisma
docs/           TRD.md (product spec), Architecture.md (build status)
```

## Current status

Auth (signup/login/logout), route protection, and the dashboard shell are
implemented. Person/note/event/reminder CRUD, search, and AI summaries are
not yet wired to Prisma — see [docs/Architecture.md](docs/Architecture.md)
for the up-to-date gap list against the TRD.

## Security

Session cookies are `httpOnly`, `SameSite=Lax`, and `secure` in production.
Passwords are hashed with bcrypt. Auth endpoints are rate-limited. Baseline
security headers (`X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) are
set in `next.config.mjs`. See [docs/Architecture.md](docs/Architecture.md)
§3 for known limitations (no CSP yet, in-memory rate limiter).

## Credits

Built by **Arindal**

- LinkedIn: [in/arindalchar](https://linkedin.com/in/arindalchar)
- Twitter: [@arindal_17](https://twitter.com/arindal_17)
- GitHub: [arindal1](https://github.com/arindal1)