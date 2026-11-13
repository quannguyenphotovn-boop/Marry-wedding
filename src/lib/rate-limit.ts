import crypto from "node:crypto";
import { prisma } from "./prisma";

const WINDOW_MINUTES = 10;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

/**
 * DB-backed (not in-memory) because PM2/Passenger may run more than one
 * worker process — an in-process Map/counter would silently under-count
 * under multiple workers.
 */
export function hashIp(ip: string): string {
  const salt = process.env.SESSION_SECRET ?? "marry-wedding";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function isBookingRateLimited(ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
  const recentCount = await prisma.bookingLead.count({
    where: { ipHash, createdAt: { gte: since } },
  });
  return recentCount >= MAX_SUBMISSIONS_PER_WINDOW;
}
