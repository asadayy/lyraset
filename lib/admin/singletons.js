/**
 * Field schemas for the two singleton documents: Site Settings and SEO
 * defaults. These drive their editor forms (same FieldRenderer engine as the
 * content resources).
 */

export const SETTINGS_SCHEMA = [
  { name: 'brandName', label: 'Brand name', type: 'text' },
  { name: 'tagline', label: 'Tagline', type: 'textarea', full: true },
  { name: 'logoLight', label: 'Logo (light bg)', type: 'media' },
  { name: 'logoDark', label: 'Logo (dark bg)', type: 'media' },
  { name: 'phones', label: 'Phone numbers', type: 'stringList' },
  { name: 'emails', label: 'Email addresses', type: 'stringList' },
  { name: 'whatsapp', label: 'WhatsApp number', type: 'text' },
  { name: 'whatsappTemplate', label: 'WhatsApp prefilled message', type: 'textarea', full: true },
  { name: 'platforms', label: 'Platform ticker items', type: 'stringList', full: true },
  {
    name: 'offices',
    label: 'Offices',
    type: 'objectList',
    itemLabel: 'Office',
    full: true,
    fields: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'lat', label: 'Latitude', type: 'number' },
      { name: 'lng', label: 'Longitude', type: 'number' },
    ],
  },
  {
    name: 'stats',
    label: 'Stats bar',
    type: 'objectList',
    itemLabel: 'Stat',
    full: true,
    fields: [
      { name: 'number', label: 'Number (counts up to)', type: 'number' },
      { name: 'prefix', label: 'Prefix', type: 'text' },
      { name: 'suffix', label: 'Suffix', type: 'text' },
      { name: 'label', label: 'Label', type: 'text' },
    ],
  },
  { name: 'socials', label: 'Social links', type: 'socials', full: true },
  {
    name: 'announcement',
    label: 'Announcement / promo bar',
    type: 'object',
    full: true,
    fields: [
      { name: 'active', label: 'Active', type: 'boolean' },
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'text', label: 'Text', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'media' },
      { name: 'ctaLabel', label: 'CTA label', type: 'text' },
      { name: 'ctaHref', label: 'CTA link', type: 'text' },
    ],
  },
  { name: 'footerTagline', label: 'Footer tagline', type: 'textarea', full: true },
  { name: 'footerCredit', label: 'Footer credit', type: 'text' },
  { name: 'ga4Id', label: 'GA4 Measurement ID', type: 'text' },
  { name: 'metaPixelId', label: 'Meta Pixel ID', type: 'text' },
];

export const SEO_SCHEMA = [
  { name: 'defaultTitle', label: 'Default title', type: 'text', full: true },
  { name: 'titleTemplate', label: 'Title template (use %s)', type: 'text' },
  { name: 'twitterHandle', label: 'Twitter handle', type: 'text' },
  { name: 'defaultDescription', label: 'Default meta description', type: 'textarea', full: true },
  { name: 'defaultOgImage', label: 'Default OG image', type: 'media', full: true },
  {
    name: 'organization',
    label: 'Organization (JSON-LD)',
    type: 'object',
    full: true,
    fields: [
      { name: 'name', label: 'Name', type: 'text' },
      { name: 'legalName', label: 'Legal name', type: 'text' },
      { name: 'url', label: 'URL', type: 'text' },
      { name: 'logo', label: 'Logo URL', type: 'text' },
      { name: 'foundingDate', label: 'Founding year', type: 'text' },
      { name: 'sameAs', label: 'Social profile URLs', type: 'stringList' },
    ],
  },
];
