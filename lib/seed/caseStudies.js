/**
 * Seed: 6 portfolio case studies ("Measurable Growth Stories"). Summaries are
 * from the source content; challenge/approach/results and metrics are authored
 * to fill the detail pages and are fully editable in the CMS.
 */
export const caseStudies = [
  {
    title: 'Brand Identity — Reon Studio',
    slug: 'reon-studio',
    categorySlug: 'branding',
    categoryName: 'Branding',
    client: 'Reon Studio',
    summary:
      'Full visual identity system, logo design, and brand rollout for a contemporary creative studio.',
    challenge:
      'Reon Studio had outgrown a logo made in an afternoon. They needed an identity that signalled seniority to enterprise clients without losing the energy of a young studio.',
    approach:
      'We ran a two-week discovery, built a flexible monogram system, and defined a restrained type-and-color palette that scales from a favicon to a billboard. Then we rolled it out across deck, site, and social templates.',
    results:
      'A cohesive system the team ships with daily — and a rebrand that helped close two enterprise retainers in the first quarter.',
    metrics: [
      { label: 'Brand rollout', value: '3 weeks' },
      { label: 'Templates shipped', value: '40+' },
      { label: 'Enterprise wins', value: '2' },
    ],
    order: 1,
    featured: true,
    published: true,
  },
  {
    title: 'Social Campaign — Lifestyle Brand',
    slug: 'lifestyle-brand-social',
    categorySlug: 'social',
    categoryName: 'Social',
    client: 'Lifestyle Brand',
    summary:
      'Social media content and influencer campaign for a lifestyle brand targeting Gen Z audiences.',
    challenge:
      'Strong product, invisible feed. The brand had great retail traction but no social engine reaching the Gen Z audience it was built for.',
    approach:
      'We built a content system around three pillars, produced short-form video weekly, and layered a micro-influencer campaign on top to seed reach and credibility.',
    results:
      'Followers turned into a community, and the feed became the top-of-funnel the brand never had.',
    metrics: [
      { label: 'Engagement rate', value: '+180%' },
      { label: 'Reels / month', value: '20' },
      { label: 'Creators activated', value: '15' },
    ],
    order: 2,
    featured: false,
    published: true,
  },
  {
    title: 'Brand Identity — Arabic Label',
    slug: 'arabic-label',
    categorySlug: 'branding',
    categoryName: 'Branding',
    client: 'Arabic Label',
    summary: 'Bilingual brand identity and digital presence for an Arabic-market consumer brand.',
    challenge:
      'A consumer brand launching across Arabic and English markets needed one identity that felt native in both — not a translation bolted onto a Latin-first design.',
    approach:
      'We designed a truly bilingual system: a dual-script wordmark, mirrored layouts, and type pairings tuned for Arabic and Latin to sit as equals.',
    results: 'A brand that reads as local in two markets, with a digital presence to match.',
    metrics: [
      { label: 'Scripts', value: 'AR + EN' },
      { label: 'Launch markets', value: '2' },
      { label: 'Design system', value: '1 unified' },
    ],
    order: 3,
    featured: false,
    published: true,
  },
  {
    title: 'Brand Identity — Afzal Clothing',
    slug: 'afzal-clothing',
    categorySlug: 'branding',
    categoryName: 'Branding',
    client: 'Afzal Clothing',
    summary:
      'Premium clothing brand identity with monogram logo and visual system for fashion retail.',
    challenge:
      'A fashion retailer wanted to move upmarket, but the existing brand read budget on the shelf and online.',
    approach:
      'We built a premium monogram, a considered packaging and tag system, and a photography direction that made the product look worth more than its price.',
    results: 'A retail identity that finally matched the ambition of the product line.',
    metrics: [
      { label: 'Positioning', value: 'Premium' },
      { label: 'Touchpoints', value: 'Retail + web' },
      { label: 'Monogram marks', value: '1 system' },
    ],
    order: 4,
    featured: false,
    published: true,
  },
  {
    title: 'Product Photography — Natero Inn',
    slug: 'natero-inn',
    categorySlug: 'photography',
    categoryName: 'Photography',
    client: 'Natero Inn',
    summary:
      'Product photography and packaging design for a food brand launching in the FMCG market.',
    challenge:
      'A new FMCG food brand needed shelf-ready packaging and a photography library strong enough to launch across retail and e-commerce at once.',
    approach:
      'We art-directed a full product shoot — hero, lifestyle, and packaging — and paired it with packaging design built for both the shelf and the thumbnail.',
    results: 'A launch-ready visual library that works from the aisle to the ad.',
    metrics: [
      { label: 'Shots delivered', value: '120+' },
      { label: 'SKUs', value: '8' },
      { label: 'Launch channels', value: 'Retail + DTC' },
    ],
    order: 5,
    featured: false,
    published: true,
  },
  {
    title: 'Brand Identity — Zarin Naturals',
    slug: 'zarin-naturals',
    categorySlug: 'branding',
    categoryName: 'Branding',
    client: 'Zarin Naturals',
    summary:
      'Natural cosmetics brand identity with earthy visual system for the wellness and skincare market.',
    challenge:
      'In a crowded wellness category, Zarin Naturals needed an identity that felt genuinely natural — not another green-washed lookalike.',
    approach:
      'We built an earthy palette, a soft editorial type system, and a photography direction rooted in real texture and ingredient storytelling.',
    results: 'A skincare brand that looks as considered as its formulations.',
    metrics: [
      { label: 'Category', value: 'Wellness' },
      { label: 'Palette', value: 'Earth-led' },
      { label: 'System', value: 'Editorial' },
    ],
    order: 6,
    featured: false,
    published: true,
  },
];

export default caseStudies;
