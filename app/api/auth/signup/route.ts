import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/session";
import { signupSchema } from "@/lib/validators/auth";
import { isRateLimited } from "@/lib/auth/rateLimit";
import { getClientIp, redirectWithError, setSessionCookie } from "@/lib/auth/http";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(`signup:${ip}`)) {
    return redirectWithError(request, "/signup", "Too many attempts. Try again shortly.");
  }

  const form = await request.formData();
  const parsed = signupSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    password: form.get("password"),
  });

  if (!parsed.success) {
    return redirectWithError(request, "/signup", "Please check your details and try again.");
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Generic message - do not confirm/deny account existence to a caller.
    return redirectWithError(request, "/signup", "Could not create that account. Try logging in instead.");
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, name: name ?? null, passwordHash },
  });

  const token = await createSessionToken({ userId: user.id, email: user.email });
  const response = NextResponse.redirect(new URL("/dashboard", request.url), 303);
  return setSessionCookie(response, token);
}