import { getSeoDefault } from '@/lib/data';

/**
 * Build a Next.js Metadata object by merging per-entity SEO overrides with the
 * CMS SEO defaults. Used by every public page's generateMetadata.
 *
 * @param {object} opts
 * @param {object} [opts.seo] - per-entity seo ({ title, description, ogImage, canonical, noindex })
 * @param {string} [opts.path] - path for canonical URL (e.g. "/services/seo")
 * @param {string} [opts.fallbackTitle]
 * @param {string} [opts.fallbackDescription]
 * @returns {Promise<import('next').Metadata>}
 */
export async function buildMetadata({ seo = {}, path = '/', fallbackTitle, fallbackDescription } = {}) {
  const def = await getSeoDefault();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const title = seo.title || fallbackTitle || def.defaultTitle;
  const description = seo.description || fallbackDescription || def.defaultDescription;
  const ogImage = seo.ogImage?.url || def.defaultOgImage?.url;
  const canonical = seo.canonical || `${siteUrl}${path === '/' ? '' : path}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: def.organization?.name || 'LYRASET',
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: def.twitterHandle || undefined,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
