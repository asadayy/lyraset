/* eslint-disable no-console */
/**
 * Seed the MongoDB database with LYRASET starter content.
 *
 * Usage:  npm run seed         (loads .env via --env-file)
 *   or:   node --env-file=.env scripts/seed.mjs
 *
 * Idempotent: singletons are upserted; content collections are replaced with
 * the seed set. Safe to re-run. Requires MONGODB_URI. Creates the admin user
 * from ADMIN_EMAIL + ADMIN_PASSWORD_HASH when both are present.
 */
import mongoose from 'mongoose';

import Service from '../models/Service.js';
import CaseStudy from '../models/CaseStudy.js';
import Category from '../models/Category.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import Job from '../models/Job.js';
import Page from '../models/Page.js';
import SiteSettings from '../models/SiteSettings.js';
import SeoDefault from '../models/SeoDefault.js';
import AdminUser from '../models/AdminUser.js';

import settings from '../lib/seed/settings.js';
import services from '../lib/seed/services.js';
import caseStudies from '../lib/seed/caseStudies.js';
import categories from '../lib/seed/categories.js';
import team from '../lib/seed/team.js';
import testimonials from '../lib/seed/testimonials.js';
import jobs from '../lib/seed/jobs.js';
import pages from '../lib/seed/pages.js';
import seoDefault from '../lib/seed/seo.js';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('✖ MONGODB_URI is not set. Add it to .env before seeding.');
    process.exit(1);
  }

  console.log('→ Connecting to MongoDB…');
  await mongoose.connect(uri);
  console.log('✔ Connected.');

  // Singletons ------------------------------------------------------------
  await SiteSettings.findOneAndUpdate({ key: 'singleton' }, settings, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  console.log('✔ Site settings');

  await SeoDefault.findOneAndUpdate({ key: 'singleton' }, seoDefault, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  console.log('✔ SEO defaults');

  // Content collections (replace) ----------------------------------------
  const jobsList = [
    ['Services', Service, services],
    ['Case studies', CaseStudy, caseStudies],
    ['Categories', Category, categories],
    ['Team', TeamMember, team],
    ['Testimonials', Testimonial, testimonials],
    ['Jobs', Job, jobs],
    ['Pages', Page, pages],
  ];

  for (const [label, Model, docs] of jobsList) {
    await Model.deleteMany({});
    await Model.insertMany(docs);
    console.log(`✔ ${label} (${docs.length})`);
  }

  // Admin user ------------------------------------------------------------
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
  if (email && passwordHash) {
    await AdminUser.findOneAndUpdate(
      { email },
      { email, name: 'Admin', passwordHash, role: 'admin' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`✔ Admin user (${email})`);
  } else {
    console.log('… Skipped admin user (set ADMIN_EMAIL + ADMIN_PASSWORD_HASH to create one)');
  }

  await mongoose.disconnect();
  console.log('\n✅ Seed complete.');
  process.exit(0);
}

main().catch((err) => {
  console.error('✖ Seed failed:', err);
  process.exit(1);
});
