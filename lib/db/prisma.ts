import { PrismaClient } from "@prisma/client";

// Standard Next.js dev-mode singleton to avoid exhausting Neon's connection
// pool on hot reload. See docs/TRD.md §13 (Technical Architecture).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}