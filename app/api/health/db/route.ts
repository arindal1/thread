import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

/**
 * DB keep-alive ping - runs a trivial query so Neon's connection pool
 * doesn't fully idle out and auto-suspend the compute endpoint (default
 * 5-minute idle timeout on Neon's free/launch tiers). Hit every 5 minutes
 * by .github/workflows/keep-alive.yml.
 *
 * Protected by CRON_SECRET so this can't be used as a free public endpoint
 * to hammer the database - only the scheduled job (or a configured Vercel
 * Cron, which sends the same bearer token automatically) can call it.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ status: "unauthorized" }, { status: 401 });
    }
  }

  await prisma.$queryRaw`SELECT 1`;
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
}