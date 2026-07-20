import { getServices, getCaseStudies, getJobs } from '@/lib/data';

/**
 * Dynamic sitemap generated from published CMS content.
 * @returns {Promise<import('next').MetadataRoute.Sitemap>}
 */
export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const [services, cases, jobs] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getJobs(),
  ]);

  const now = new Date();
  const staticRoutes = [
    ['', 1],
    ['/services', 0.9],
    ['/portfolio', 0.8],
    ['/about', 0.7],
    ['/team', 0.6],
    ['/careers', 0.7],
    ['/contact', 0.7],
    ['/start', 0.5],
    ['/privacy', 0.3],
    ['/terms', 0.3],
  ].map(([path, priority]) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority,
  }));

  const dynamic = [
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: now, priority: 0.8 })),
    ...cases.map((c) => ({ url: `${base}/portfolio/${c.slug}`, lastModified: now, priority: 0.6 })),
    ...jobs.map((j) => ({ url: `${base}/careers/${j.slug}`, lastModified: now, priority: 0.6 })),
  ];

  return [...staticRoutes, ...dynamic];
}
