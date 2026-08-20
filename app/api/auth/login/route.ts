import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validators/auth";
import { isRateLimited } from "@/lib/auth/rateLimit";
import { getClientIp, redirectWithError, setSessionCookie } from "@/lib/auth/http";

const GENERIC_ERROR = "Incorrect email or password.";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(`login:${ip}`)) {
    return redirectWithError(request, "/login", "Too many attempts. Try again shortly.");
  }

  const form = await request.formData();
  const nextPath = form.get("next");
  const parsed = loginSchema.safeParse({
    email: form.get("email"),
    password: form.get("password"),
  });

  if (!parsed.success) {
    return redirectWithError(request, "/login", GENERIC_ERROR);
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return redirectWithError(request, "/login", GENERIC_ERROR);

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return redirectWithError(request, "/login", GENERIC_ERROR);

  const token = await createSessionToken({ userId: user.id, email: user.email });
  // Only ever redirect to an internal path, never to an attacker-supplied
  // absolute/protocol-relative URL (open-redirect guard). Reject not just
  // "//host" but also "/\host" and "/\/host" - browsers' WHATWG URL parser
  // treats a leading backslash the same as a forward slash for special
  // schemes, so "/\evil.com" would otherwise resolve to https://evil.com.
  const isSafeNext = (value: unknown): value is string =>
    typeof value === "string" && /^\/(?!\/|\\)/.test(value);
  const safeNext = isSafeNext(nextPath) ? nextPath : "/dashboard";
  const response = NextResponse.redirect(new URL(safeNext, request.url), 303);
  return setSessionCookie(response, token);
}