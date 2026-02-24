import { NextResponse } from 'next/server';
import { redis } from "@/lib/services/redis";

export const revalidate = 60;

export async function GET() {
  const created = await redis.get<number>("widgets:created").catch(() => 0) ?? 0;
  const invites = await redis.scard("widgets:invites").catch(() => 0) ?? 0;

  return NextResponse.json({
    created: created,
    invites: invites,
  });
}