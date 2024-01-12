import { kv } from "@vercel/kv";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export async function POST(request: Request) {
  const body = await request.json();
  const requestBodyVariant = body.variant.toString();
  if (!requestBodyVariant) {
    return new Response("Missing variant", { status: 400 });
  }
  const ip = request.headers.get("x-forwarded-for");

  // check if user has already been assigned a variant and not expired
  // if so, return get variant from redis and return it);
  const variant = await kv.hget(`user:${ip}`, "variant");
  if (variant) {
    return Response.json({ variant });
  }
  await kv.hset(`user:${ip}`, {
    variant: requestBodyVariant,
    timestamp: Date.now().toString(),
  });
  kv.pexpire(`user:${ip}`, 3 * DAY);
  return Response.json({ variant: requestBodyVariant });
}
