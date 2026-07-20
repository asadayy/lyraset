/**
 * robots.txt — allow the public site, disallow admin + API, point to sitemap.
 * @returns {import('next').MetadataRoute.Robots}
 */
export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
