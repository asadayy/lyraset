/**
 * Seed: the 10 LYRASET services. Copy preserves the confident, data-driven
 * voice of the source content. `iconKey` maps to an inline SVG in the Icon
 * component. Media fields empty → branded placeholders until uploaded.
 */
export const services = [
  {
    title: 'Web & Landing Pages',
    slug: 'web-development',
    iconKey: 'globe',
    shortBlurb:
      'High-converting websites and landing pages built for speed, SEO, and a frictionless user experience.',
    heroHeadline: 'WEBSITES THAT LOAD FAST AND CONVERT FASTER',
    description:
      'We design and build sites engineered around one job: turning visitors into revenue. Fast Core Web Vitals, clean information architecture, and copy that sells — shipped on a modern, maintainable stack your team can actually run. No page-builder bloat, no six-second load times, no guesswork.',
    deliverables: [
      'Conversion-focused UX and wireframes',
      'Custom, responsive front-end build',
      'Core Web Vitals & speed optimization',
      'On-page SEO foundations',
      'CMS so your team can edit without a developer',
      'Analytics & event tracking wired in',
    ],
    formTitle: 'Request a Website Quote',
    formEnabled: true,
    featured: false,
    order: 1,
    published: true,
  },
  {
    title: 'Paid Social',
    slug: 'paid-social',
    iconKey: 'meta',
    shortBlurb: 'Meta ads that print revenue, not just reach — wired to conversion events that matter.',
    heroHeadline: 'META ADS THAT PRINT REVENUE, NOT JUST REACH',
    description:
      "We build Meta campaigns that target purchase intent, not vanity audiences. Every dollar is wired to a conversion event you actually care about. We've scaled DTC brands from $20K/mo to $400K/mo on Meta alone — without burning the brand.",
    deliverables: [
      'Full-funnel campaign architecture',
      'Creative testing framework (hooks, angles, formats)',
      'Purchase-intent audience strategy',
      'Conversion API & event-quality setup',
      'Daily budget and bid management',
      'Weekly performance reporting',
    ],
    formTitle: 'Get a Free Ad Account Audit',
    formEnabled: true,
    featured: true,
    order: 2,
    published: true,
  },
  {
    title: 'Search',
    slug: 'search',
    iconKey: 'search',
    shortBlurb:
      'Google Ads built for demand, not just clicks — Search, Shopping, and Performance Max, run right.',
    heroHeadline: 'GOOGLE ADS BUILT FOR DEMAND, NOT JUST CLICKS',
    description:
      'Search, Shopping, Performance Max — we run all of it, but never all at once. We start with the highest-intent surface, prove out economics, then expand. Most accounts we inherit are over-spending and under-tracking. We fix both in the first 30 days.',
    deliverables: [
      'Account audit & restructure',
      'Keyword and search-term mining',
      'Shopping feed optimization',
      'Performance Max asset groups',
      'Conversion tracking & value rules',
      'Monthly economics review',
    ],
    formTitle: 'Get a Free Google Ads Audit',
    formEnabled: true,
    featured: false,
    order: 3,
    published: true,
  },
  {
    title: 'Social Content',
    slug: 'social-content',
    iconKey: 'chat',
    shortBlurb:
      'Content systems — pillars, hooks, formats, and a publishing rhythm — that turn a feed into a funnel.',
    heroHeadline: 'SOCIAL MEDIA THAT BUILDS A BRAND PEOPLE FOLLOW',
    description:
      "We're not a posting service. We run content systems — pillars, hooks, formats, and a publishing rhythm — that turn a feed into a funnel. 6 platforms, 1 voice, zero fluff. We write, design, edit, schedule, and report. You show up to approve.",
    deliverables: [
      'Content pillars & voice guide',
      'Monthly content calendar',
      'Short-form video & graphics production',
      'Community management',
      'Cross-platform scheduling',
      'Growth & engagement reporting',
    ],
    formTitle: 'Consultation',
    formEnabled: true,
    featured: false,
    order: 4,
    published: true,
  },
  {
    title: 'SEO',
    slug: 'seo',
    iconKey: 'trending',
    shortBlurb:
      'Technical fixes, then topical authority, then link earning — compounding traffic over 12 months.',
    heroHeadline: 'SEO FOR FOUNDERS WHO WANT COMPOUNDING TRAFFIC',
    description:
      "Technical fixes first, then topical authority, then link earning. We don't sell '10 keywords in 30 days.' We build the architecture that ranks for thousands of keywords over the next 12 months. The work is slow, the payoff is permanent.",
    deliverables: [
      'Technical SEO audit & fixes',
      'Site architecture & internal linking',
      'Topical authority content plan',
      'On-page optimization',
      'Digital PR & link earning',
      'Rank & traffic reporting',
    ],
    formTitle: 'Get a Free SEO Audit',
    formEnabled: true,
    featured: false,
    order: 5,
    published: true,
  },
  {
    title: 'Video Production',
    slug: 'video-production',
    iconKey: 'video',
    shortBlurb:
      'In-house editors, not freelancers. Reels, YouTube long-form, UGC, ad creative — shipped in 5–7 days.',
    heroHeadline: 'VIDEO CONTENT WITHOUT THE AGENCY MARKUP',
    description:
      'In-house editors, not freelancers. You brief, we shoot, we cut, you approve. Reels, YouTube long-form, UGC, ad creative — same team, same pricing, no creative agency tax. Most videos ship in 5–7 business days.',
    deliverables: [
      'Creative concepting & scripting',
      'Studio & on-location shoots',
      'Reels & short-form editing',
      'YouTube long-form editing',
      'Motion graphics & captions',
      'Ad-ready creative variants',
    ],
    formTitle: 'Start a Video Project',
    formEnabled: true,
    featured: false,
    order: 6,
    published: true,
  },
  {
    title: 'Brand Systems',
    slug: 'brand-systems',
    iconKey: 'brand',
    shortBlurb:
      'Logo, color, type, voice, and a one-page brand bible + templates — a system, not a PDF.',
    heroHeadline: 'BRAND SYSTEMS, NOT JUST LOGOS',
    description:
      "We build the kit your team can actually run with: logo, color, type, voice, and a one-page brand bible. Then we hand it off with templates so your next designer doesn't reinvent it. The output isn't a PDF that lives in a folder — it's a system that lives in your day-to-day.",
    deliverables: [
      'Logo & identity design',
      'Color & typography system',
      'Brand voice & messaging',
      'One-page brand bible',
      'Editable templates (social, deck, docs)',
      'Asset handoff & guidelines',
    ],
    formTitle: 'Book a Brand Discovery Call',
    formEnabled: true,
    featured: false,
    order: 7,
    published: true,
  },
  {
    title: 'Data & Analytics',
    slug: 'data-analytics',
    iconKey: 'data',
    shortBlurb:
      'GA4, Mixpanel, attribution, server-side tracking, Looker dashboards — set up and read for you.',
    heroHeadline: 'ANALYTICS THAT TELL YOU WHAT TO DO NEXT',
    description:
      "GA4, Mixpanel, attribution models, server-side tracking, Looker dashboards — we set it up and we read it. Every Monday you get a 1-page brief: what worked, what didn't, what we're changing. No 30-page reports no one reads.",
    deliverables: [
      'GA4 & Mixpanel implementation',
      'Server-side & CAPI tracking',
      'Attribution modeling',
      'Looker Studio dashboards',
      'Event & conversion QA',
      'Weekly 1-page insight brief',
    ],
    formTitle: 'Consultation',
    formEnabled: true,
    featured: false,
    order: 8,
    published: true,
  },
  {
    title: 'Lifecycle',
    slug: 'lifecycle',
    iconKey: 'mail',
    shortBlurb:
      'Email & SMS that print repeat purchases — Klaviyo, Customer.io, Attentive flows that recover revenue.',
    heroHeadline: 'EMAIL & SMS THAT PRINT REPEAT PURCHASES',
    description:
      'Klaviyo, Customer.io, Attentive — we plug in, clean your list, and start sending. Welcome flows, abandoned cart, win-back, post-purchase, VIP. Most brands leave 30–40% of revenue on the table from lifecycle. We recover it.',
    deliverables: [
      'List cleanup & deliverability',
      'Core automated flows (welcome, cart, win-back)',
      'Post-purchase & VIP journeys',
      'Campaign calendar & sends',
      'Segmentation strategy',
      'Revenue attribution reporting',
    ],
    formTitle: 'Get a Free Lifecycle Audit',
    formEnabled: true,
    featured: false,
    order: 9,
    published: true,
  },
  {
    title: 'Growth Strategy',
    slug: 'growth-strategy',
    iconKey: 'strategy',
    shortBlurb:
      'Fractional CMO when you don’t need a full-time one — quarterly strategy, monthly reviews, weekly office hours.',
    heroHeadline: "FRACTIONAL CMO WHEN YOU DON'T NEED A FULL-TIME ONE",
    description:
      'Quarterly strategy, monthly reviews, weekly office hours. We sit in your leadership meetings, challenge your assumptions, and make sure the marketing team — internal or external — is pointed in the same direction. Most engagements pay for themselves in the first quarter.',
    deliverables: [
      'Quarterly growth roadmap',
      'Channel & budget strategy',
      'Monthly performance reviews',
      'Weekly office hours',
      'Leadership meeting presence',
      'KPI & forecasting frameworks',
    ],
    formTitle: 'Book a Strategy Call',
    formEnabled: true,
    featured: false,
    order: 10,
    published: true,
  },
];

export default services;
