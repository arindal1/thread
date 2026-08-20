import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE } from "./session";

/** Redirects back to a public auth page with a user-facing error message in
 * the query string. Messages must stay generic (no "email not found" vs
 * "wrong password" distinction) to avoid leaking account existence. */
export function redirectWithError(request: NextRequest, path: string, message: string) {
  const url = new URL(path, request.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, 303);
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

export function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}