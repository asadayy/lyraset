import { getSiteUrl } from '@/lib/site';

/**
 * robots.txt — allow the public site, disallow admin + API, point to sitemap.
 * @returns {import('next').MetadataRoute.Robots}
 */
export default function robots() {
  const base = getSiteUrl();
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
