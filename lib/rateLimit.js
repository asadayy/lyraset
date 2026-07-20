/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * Keyed by IP + bucket name. Good enough to blunt abusive form spamming in a
 * single serverless instance; for multi-region hard limits, back this with a
 * shared store (Upstash Redis) — the interface stays the same.
 */
const store = new Map();

/**
 * @param {string} key - unique key, e.g. `lead:1.2.3.4`
 * @param {number} limit - max hits per window
 * @param {number} windowMs - window size in ms
 * @returns {{ allowed: boolean, remaining: number }}
 */
export function rateLimit(key, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = store.get(key) || [];
  const fresh = entry.filter((t) => now - t < windowMs);
  if (fresh.length >= limit) {
    store.set(key, fresh);
    return { allowed: false, remaining: 0 };
  }
  fresh.push(now);
  store.set(key, fresh);

  // Opportunistic cleanup to bound memory.
  if (store.size > 5000) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t > windowMs)) store.delete(k);
    }
  }
  return { allowed: true, remaining: limit - fresh.length };
}
