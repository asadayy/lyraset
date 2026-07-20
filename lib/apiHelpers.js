import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/auth';

/**
 * Shared helpers for API route handlers: JSON responses, admin guard,
 * cache-tag revalidation, and request parsing.
 */

/** JSON response shorthand. */
export function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export function ok(data = {}) {
  return json({ ok: true, ...data });
}

export function fail(message, status = 400, extra = {}) {
  return json({ ok: false, error: message, ...extra }, status);
}

/** Guard: returns null when authorized, or a 401 response when not. */
export async function guardAdmin() {
  const res = await requireAdmin();
  if (!res.ok) return fail('Unauthorized', 401);
  return null;
}

/** Trigger on-demand revalidation for one or more cache tags. */
export function revalidate(tags = []) {
  for (const t of tags) {
    try {
      revalidateTag(t);
    } catch {
      // best-effort; never fail a mutation because revalidation hiccuped
    }
  }
}

/** Safely parse a JSON request body. */
export async function readJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

/** Best-effort client IP from proxy headers. */
export function clientIp(req) {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}
