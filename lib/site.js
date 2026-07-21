/**
 * Resolve the canonical public site URL.
 *
 * Prefers the explicit NEXT_PUBLIC_SITE_URL (set this to your custom domain in
 * production). Falls back to the Vercel-provided domains so a deploy never
 * resolves to localhost even if the variable is forgotten. Client bundles only
 * see NEXT_PUBLIC_SITE_URL; the VERCEL_* fallbacks apply server-side (metadata,
 * sitemap, robots, JSON-LD), which is where absolute URLs actually matter.
 *
 * @returns {string} origin without a trailing slash
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  // Vercel sets these automatically (production domain, then per-deploy URL).
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}
