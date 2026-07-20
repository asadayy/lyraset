import 'server-only';
import { unstable_cache } from 'next/cache';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { plain } from '@/lib/utils';
import * as seed from '@/lib/seed';

/**
 * Public data-access layer.
 *
 * Every public page reads content through these functions. When MONGODB_URI is
 * set they query MongoDB (results wrapped in `unstable_cache` so on-demand
 * `revalidateTag` from the CMS updates static pages within seconds). When no
 * database is configured they return the bundled seed content, so the site
 * renders fully out of the box. The return shapes are identical either way.
 */

export const TAGS = {
  settings: 'settings',
  seo: 'seo',
  services: 'services',
  caseStudies: 'case-studies',
  categories: 'categories',
  team: 'team',
  testimonials: 'testimonials',
  jobs: 'jobs',
  pages: 'pages',
};

const bySortOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

/** Give seed objects a stable synthetic id so React keys/links are consistent. */
function withId(obj, i) {
  return { _id: obj.slug || obj.key || `seed-${i}`, ...obj };
}

/**
 * Wrap a DB reader in unstable_cache with tags; used only on the DB path.
 * @template T
 * @param {() => Promise<T>} fn
 * @param {string[]} keyParts
 * @param {string[]} tags
 * @returns {Promise<T>}
 */
function cached(fn, keyParts, tags) {
  return unstable_cache(fn, keyParts, { tags, revalidate: 3600 })();
}

// ---- Site settings --------------------------------------------------------
export async function getSettings() {
  if (!isDbConfigured()) return seed.settings;
  return cached(
    async () => {
      await connectToDatabase();
      const { default: SiteSettings } = await import('@/models/SiteSettings');
      const doc = await SiteSettings.findOne({ key: 'singleton' }).lean();
      return doc ? plain(doc) : seed.settings;
    },
    ['settings'],
    [TAGS.settings]
  );
}

// ---- SEO defaults ---------------------------------------------------------
export async function getSeoDefault() {
  if (!isDbConfigured()) return seed.seoDefault;
  return cached(
    async () => {
      await connectToDatabase();
      const { default: SeoDefault } = await import('@/models/SeoDefault');
      const doc = await SeoDefault.findOne({ key: 'singleton' }).lean();
      return doc ? plain(doc) : seed.seoDefault;
    },
    ['seo'],
    [TAGS.seo]
  );
}

// ---- Services -------------------------------------------------------------
export async function getServices() {
  if (!isDbConfigured()) {
    return seed.services
      .filter((s) => s.published !== false)
      .map(withId)
      .sort(bySortOrder);
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Service } = await import('@/models/Service');
      const docs = await Service.find({ published: true }).sort({ order: 1 }).lean();
      return docs.map(plain);
    },
    ['services'],
    [TAGS.services]
  );
}

export async function getServiceBySlug(slug) {
  if (!isDbConfigured()) {
    const s = seed.services.find((x) => x.slug === slug && x.published !== false);
    return s ? withId(s, 0) : null;
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Service } = await import('@/models/Service');
      const doc = await Service.findOne({ slug, published: true }).lean();
      return doc ? plain(doc) : null;
    },
    ['service', slug],
    [TAGS.services]
  );
}

// ---- Case studies (portfolio) ---------------------------------------------
export async function getCaseStudies() {
  if (!isDbConfigured()) {
    return seed.caseStudies
      .filter((c) => c.published !== false)
      .map(withId)
      .sort(bySortOrder);
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: CaseStudy } = await import('@/models/CaseStudy');
      const docs = await CaseStudy.find({ published: true }).sort({ order: 1 }).lean();
      return docs.map(plain);
    },
    ['case-studies'],
    [TAGS.caseStudies]
  );
}

export async function getCaseStudyBySlug(slug) {
  if (!isDbConfigured()) {
    const c = seed.caseStudies.find((x) => x.slug === slug && x.published !== false);
    return c ? withId(c, 0) : null;
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: CaseStudy } = await import('@/models/CaseStudy');
      const doc = await CaseStudy.findOne({ slug, published: true }).lean();
      return doc ? plain(doc) : null;
    },
    ['case-study', slug],
    [TAGS.caseStudies]
  );
}

// ---- Categories -----------------------------------------------------------
export async function getCategories() {
  if (!isDbConfigured()) return seed.categories.map(withId).sort(bySortOrder);
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Category } = await import('@/models/Category');
      const docs = await Category.find({}).sort({ order: 1 }).lean();
      return docs.map(plain);
    },
    ['categories'],
    [TAGS.categories]
  );
}

// ---- Team -----------------------------------------------------------------
export async function getTeam() {
  if (!isDbConfigured()) {
    return seed.team
      .filter((t) => t.visible !== false)
      .map(withId)
      .sort(bySortOrder);
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: TeamMember } = await import('@/models/TeamMember');
      const docs = await TeamMember.find({ visible: true }).sort({ order: 1 }).lean();
      return docs.map(plain);
    },
    ['team'],
    [TAGS.team]
  );
}

// ---- Testimonials ---------------------------------------------------------
export async function getTestimonials() {
  if (!isDbConfigured()) {
    return seed.testimonials
      .filter((t) => t.visible !== false)
      .map(withId)
      .sort(bySortOrder);
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Testimonial } = await import('@/models/Testimonial');
      const docs = await Testimonial.find({ visible: true }).sort({ order: 1 }).lean();
      return docs.map(plain);
    },
    ['testimonials'],
    [TAGS.testimonials]
  );
}

// ---- Jobs -----------------------------------------------------------------
export async function getJobs() {
  if (!isDbConfigured()) {
    return seed.jobs
      .filter((j) => j.open !== false)
      .map(withId)
      .sort(bySortOrder);
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Job } = await import('@/models/Job');
      const docs = await Job.find({ open: true }).sort({ order: 1 }).lean();
      return docs.map(plain);
    },
    ['jobs'],
    [TAGS.jobs]
  );
}

export async function getJobBySlug(slug) {
  if (!isDbConfigured()) {
    const j = seed.jobs.find((x) => x.slug === slug);
    return j ? withId(j, 0) : null;
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Job } = await import('@/models/Job');
      const doc = await Job.findOne({ slug }).lean();
      return doc ? plain(doc) : null;
    },
    ['job', slug],
    [TAGS.jobs]
  );
}

// ---- Pages (composable section documents) ---------------------------------
export async function getPage(slug) {
  if (!isDbConfigured()) {
    const p = seed.pages.find((x) => x.slug === slug && x.published !== false);
    if (!p) return null;
    return {
      ...p,
      sections: (p.sections || [])
        .filter((s) => s.visible !== false)
        .sort(bySortOrder)
        .map((s, i) => ({ _id: `${slug}-sec-${i}`, ...s })),
    };
  }
  return cached(
    async () => {
      await connectToDatabase();
      const { default: Page } = await import('@/models/Page');
      const doc = await Page.findOne({ slug, published: true }).lean();
      if (!doc) return null;
      const p = plain(doc);
      p.sections = (p.sections || []).filter((s) => s.visible !== false).sort(bySortOrder);
      return p;
    },
    ['page', slug],
    [TAGS.pages]
  );
}
