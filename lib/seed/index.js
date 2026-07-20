/**
 * Barrel for all seed content. This is the single source consumed by BOTH the
 * seed script (writes to MongoDB) and the data layer's no-DB fallback (renders
 * the public site out of the box). Editing content here changes the starter
 * dataset everywhere.
 */
export { default as settings } from './settings';
export { default as services } from './services';
export { default as caseStudies } from './caseStudies';
export { default as categories } from './categories';
export { default as team } from './team';
export { default as testimonials } from './testimonials';
export { default as jobs } from './jobs';
export { default as pages } from './pages';
export { default as seoDefault } from './seo';
