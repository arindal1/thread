import { NextResponse } from "next/server";

/**
 * Lightweight liveness check - no DB access, just proves the frontend
 * process/edge function is warm. Hit on a schedule (see
 * .github/workflows/keep-alive.yml) to keep the deployment from going cold
 * on platforms that spin down idle instances. Intentionally cheap: no auth,
 * no Prisma import, so it can't itself be a source of load or abuse.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}