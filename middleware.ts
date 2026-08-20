import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

const AUTH_ONLY_PAGES = ["/login", "/signup"];
const PROTECTED_PREFIX = "/dashboard";

/**
 * Route-level guard, enforced before any page renders:
 *  - unauthenticated users hitting /dashboard/* are sent to /login
 *  - authenticated users hitting /, /login, or /signup are sent to
 *    /dashboard (no re-signing-in once already signed in)
 *
 * This runs on the Edge runtime, so session verification is JWT-only
 * (`jose`) - no Prisma/Node-only APIs here. See lib/auth/session.ts.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(PROTECTED_PREFIX) && !session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (session && (AUTH_ONLY_PAGES.includes(pathname) || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard/:path*"],
};