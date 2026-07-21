import { getSettings, getSeoDefault } from '@/lib/data';
import { getSiteUrl } from '@/lib/site';

/**
 * JSON-LD structured data components. Each renders a <script type="application/
 * ld+json"> from CMS data for richer search results.
 */

function Ld({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization schema with both office addresses + social profiles. */
export async function OrganizationJsonLd() {
  const [settings, seo] = await Promise.all([getSettings(), getSeoDefault()]);
  const siteUrl = getSiteUrl();
  const org = seo?.organization || {};

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name || settings?.brandName || 'LYRASET',
    legalName: org.legalName,
    url: siteUrl,
    logo: org.logo || settings?.logoDark?.url || undefined,
    foundingDate: org.foundingDate,
    email: settings?.emails?.[0],
    telephone: settings?.phones?.[0],
    sameAs: (settings?.socials || []).map((s) => s.url).filter(Boolean),
    address: (settings?.offices || []).map((o) => ({
      '@type': 'PostalAddress',
      name: o.label,
      streetAddress: o.address,
    })),
  };
  return <Ld data={data} />;
}

/** Service schema for a service detail page. */
export function ServiceJsonLd({ service }) {
  const siteUrl = getSiteUrl();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortBlurb || service.description,
    url: `${siteUrl}/services/${service.slug}`,
    provider: { '@type': 'Organization', name: 'LYRASET' },
    serviceType: service.title,
  };
  return <Ld data={data} />;
}

/** JobPosting schema for a careers detail page. */
export function JobPostingJsonLd({ job }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.summary,
    employmentType: job.employmentType,
    datePosted: job.createdAt,
    hiringOrganization: { '@type': 'Organization', name: 'LYRASET' },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: job.location },
    },
  };
  return <Ld data={data} />;
}

/** BreadcrumbList schema. items: [{ name, url }] */
export function BreadcrumbJsonLd({ items = [] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return <Ld data={data} />;
}
