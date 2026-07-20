/** Seed: global SEO defaults + Organization JSON-LD fields. */
export const seoDefault = {
  key: 'singleton',
  defaultTitle: 'LYRASET — International Marketing Agency',
  titleTemplate: '%s · LYRASET',
  defaultDescription:
    'Where strategy meets creativity to drive growth, engagement, and real business results. Data-driven marketing engineered by LYRASET.',
  defaultOgImage: {},
  twitterHandle: '@lyraset',
  organization: {
    name: 'LYRASET',
    legalName: 'LYRASET International Marketing Agency',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: '',
    sameAs: [
      'https://instagram.com/lyraset',
      'https://facebook.com/lyraset',
      'https://x.com/lyraset',
      'https://linkedin.com/company/lyraset',
    ],
    foundingDate: '2022',
  },
};

export default seoDefault;
