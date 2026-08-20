import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// Session strategy: a signed JWT (HS256, via `jose` — edge-runtime safe so
// it can be verified in middleware.ts) stored in an httpOnly cookie. This is
// intentionally minimal for a single-user-per-account app; see
// docs/Architecture.md for the auth design and its limits.

export const SESSION_COOKIE = "thread_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds

export type SessionPayload = {
  userId: string;
  email: string;
};

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET must be set to a random string of at least 32 characters. " +
        "Generate one with: openssl rand -base64 32"
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ userId: payload.userId, email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.userId !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

/** Server-component/route-handler helper — reads and verifies the current
 * session cookie. Used as defense-in-depth alongside middleware.ts so every
 * data-access layer independently confirms identity (TRD §18). */
export async function getCurrentSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}