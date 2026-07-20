/**
 * Seed: Site Settings (singleton). Rebranded from the source content to LYRASET.
 * Media fields are intentionally empty — the UI renders branded placeholders
 * until an admin uploads real assets via Cloudinary.
 */
export const settings = {
  key: 'singleton',
  brandName: 'LYRASET',
  logoLight: {},
  logoDark: {},
  tagline:
    'Where Strategy Meets Creativity to Drive Growth, Engagement, and Real Business Results.',
  phones: ['051-2751107'],
  emails: ['info@lyraset.com'],
  whatsapp: '+92 332 4448164',
  whatsappTemplate: "Hi LYRASET, I'd like to talk about growing my brand.",
  platforms: [
    'Meta Ads',
    'Google Ads',
    'TikTok',
    'LinkedIn',
    'YouTube',
    'Instagram',
    'Klaviyo',
    'GA4',
    'Performance Max',
    'Shopify',
  ],
  offices: [
    {
      label: 'Islamabad Office',
      address: 'Office No.2, Naseem Arcade IDC, I-9, Islamabad',
      lat: 33.6607,
      lng: 73.0479,
    },
    {
      label: 'Dubai Office',
      address: 'Office 348, 3rd Floor, SIT Tower, Dubai Silicon Oasis, Dubai',
      lat: 25.1212,
      lng: 55.3773,
    },
  ],
  socials: [
    { platform: 'instagram', url: 'https://instagram.com/lyraset' },
    { platform: 'facebook', url: 'https://facebook.com/lyraset' },
    { platform: 'x', url: 'https://x.com/lyraset' },
    { platform: 'linkedin', url: 'https://linkedin.com/company/lyraset' },
  ],
  stats: [
    { value: '$12M+', number: 12, prefix: '$', suffix: 'M+', label: 'Ad Spend Managed' },
    { value: '200+', number: 200, prefix: '', suffix: '+', label: 'Brands Served' },
    { value: '12 Yrs', number: 12, prefix: '', suffix: ' Yrs', label: 'Combined Experience' },
  ],
  announcement: {
    active: false,
    heading: 'New: Fractional CMO retainers',
    text: 'Quarterly strategy, monthly reviews, weekly office hours.',
    image: {},
    ctaLabel: 'Learn more',
    ctaHref: '/services/growth-strategy',
  },
  footerTagline:
    'Where Strategy Meets Creativity to Drive Growth, Engagement, and Real Business Results.',
  footerCredit: 'Powered by KSR Group',
  ga4Id: '',
  metaPixelId: '',
};

export default settings;
