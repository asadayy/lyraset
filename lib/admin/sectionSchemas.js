/**
 * Field schemas for every section type. The Pages editor uses these to render
 * an editor for whatever sections a page contains — and to offer the full set
 * when adding a new section. Adding a new section type here (plus a component in
 * SectionRenderer) is all it takes to expand the CMS.
 */

const ctaFields = [
  { name: 'label', label: 'Label', type: 'text' },
  { name: 'href', label: 'Link', type: 'text' },
  {
    name: 'style',
    label: 'Style',
    type: 'select',
    options: [
      { value: 'primary', label: 'Primary' },
      { value: 'ghost', label: 'Ghost' },
      { value: 'ghost-dark', label: 'Ghost (light bg)' },
    ],
  },
];

export const SECTION_SCHEMAS = {
  hero: {
    label: 'Hero',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'headlineLines', label: 'Headline lines', type: 'stringList' },
      { name: 'subline', label: 'Subline', type: 'textarea', full: true },
      { name: 'primaryCta', label: 'Primary CTA', type: 'object', fields: ctaFields },
      { name: 'secondaryCta', label: 'Secondary CTA', type: 'object', fields: ctaFields },
      { name: 'image', label: 'Illustration', type: 'media', full: true },
      { name: 'showStrip', label: 'Show phone/office strip', type: 'boolean' },
    ],
  },
  statsBar: { label: 'Stats Bar', fields: [], note: 'Values come from Site Settings → Stats.' },
  platformMarquee: {
    label: 'Platform Ticker',
    fields: [],
    note: 'Items come from Site Settings → Platform ticker.',
  },
  servicesGrid: {
    label: 'Services Grid',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'subheading', label: 'Subheading', type: 'textarea', full: true },
      { name: 'limit', label: 'Max services shown', type: 'number' },
    ],
  },
  portfolioPreview: {
    label: 'Portfolio Preview',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'subheading', label: 'Subheading', type: 'textarea', full: true },
      { name: 'limit', label: 'Max projects shown', type: 'number' },
    ],
  },
  processTimeline: {
    label: 'Process Timeline',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'heading', label: 'Heading', type: 'text' },
      {
        name: 'steps',
        label: 'Steps',
        type: 'objectList',
        itemLabel: 'Step',
        full: true,
        fields: [
          { name: 'level', label: 'Level label', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'body', label: 'Body', type: 'textarea' },
        ],
      },
    ],
  },
  testimonialSlider: {
    label: 'Testimonials',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'heading', label: 'Heading', type: 'text' },
    ],
    note: 'Testimonials are managed in the Testimonials module.',
  },
  missionColumns: {
    label: 'Mission Columns',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'heading', label: 'Heading', type: 'text' },
      {
        name: 'columns',
        label: 'Columns',
        type: 'objectList',
        itemLabel: 'Column',
        full: true,
        fields: [
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'body', label: 'Body', type: 'textarea' },
        ],
      },
    ],
  },
  valuesBand: {
    label: 'Values Band',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'body', label: 'Body', type: 'textarea', full: true },
      { name: 'values', label: 'Values', type: 'stringList', full: true },
    ],
  },
  workWithUsForm: {
    label: 'Work With Us Band',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'body', label: 'Body', type: 'textarea', full: true },
      { name: 'buttonLabel', label: 'Button label', type: 'text' },
    ],
  },
  aboutBlocks: {
    label: 'About Blocks',
    fields: [
      { name: 'heading', label: 'Section heading', type: 'text' },
      {
        name: 'blocks',
        label: 'Blocks',
        type: 'objectList',
        itemLabel: 'Block',
        full: true,
        fields: [
          { name: 'tag', label: 'Tag', type: 'text' },
          { name: 'title', label: 'Title', type: 'text' },
          { name: 'body', label: 'Body', type: 'textarea' },
        ],
      },
    ],
  },
  richText: {
    label: 'Rich Text',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'html', label: 'HTML content', type: 'richtext', full: true },
    ],
  },
  ctaMarquee: {
    label: 'CTA Marquee',
    fields: [
      { name: 'text', label: 'Text', type: 'text' },
      { name: 'href', label: 'Link', type: 'text' },
    ],
  },
};

export const SECTION_TYPE_OPTIONS = Object.entries(SECTION_SCHEMAS).map(([value, s]) => ({
  value,
  label: s.label,
}));
