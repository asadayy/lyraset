import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, ok, fail, json, readJson, revalidate } from '@/lib/apiHelpers';
import { plain, slugify } from '@/lib/utils';

/**
 * Factory that builds admin CRUD route handlers for a Mongoose model, so the
 * ~7 content collections share one battle-tested implementation: admin guard,
 * DB guard, slug generation + uniqueness, and cache-tag revalidation on write.
 */

const RESERVED = ['_id', '__v', 'createdAt', 'updatedAt'];

function sanitize(body) {
  const out = { ...body };
  for (const k of RESERVED) delete out[k];
  return out;
}

async function ensureUniqueSlug(Model, base, excludeId) {
  let slug = slugify(base) || 'item';
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const q = { slug };
    if (excludeId) q._id = { $ne: excludeId };
    const clash = await Model.exists(q);
    if (!clash) return slug;
    n += 1;
    slug = `${slugify(base)}-${n}`;
  }
}

function noDb() {
  return fail(
    'Database not configured. Set MONGODB_URI to enable admin editing.',
    503
  );
}

/**
 * @param {object} opts
 * @param {import('mongoose').Model} opts.Model
 * @param {string[]} opts.tags - cache tags to revalidate on write
 * @param {boolean} [opts.hasSlug]
 * @param {string} [opts.slugSource] - field to derive slug from (default title)
 * @param {object} [opts.sort]
 */
export function collectionHandlers({ Model, tags, hasSlug, slugSource = 'title', sort = { order: 1, createdAt: -1 } }) {
  async function GET() {
    const denied = await guardAdmin();
    if (denied) return denied;
    if (!isDbConfigured()) return noDb();
    await connectToDatabase();
    const items = await Model.find({}).sort(sort).lean();
    return json({ ok: true, items: items.map(plain) });
  }

  async function POST(req) {
    const denied = await guardAdmin();
    if (denied) return denied;
    if (!isDbConfigured()) return noDb();
    await connectToDatabase();
    const body = sanitize((await readJson(req)) || {});
    if (hasSlug) {
      body.slug = await ensureUniqueSlug(Model, body.slug || body[slugSource] || 'item', null);
    }
    try {
      const created = await Model.create(body);
      revalidate(tags);
      return ok({ item: plain(created) });
    } catch (err) {
      return fail(err.message || 'Create failed', 422);
    }
  }

  return { GET, POST };
}

/**
 * @param {object} opts (same shape as collectionHandlers)
 */
export function itemHandlers({ Model, tags, hasSlug, slugSource = 'title' }) {
  async function GET(_req, ctx) {
    const denied = await guardAdmin();
    if (denied) return denied;
    if (!isDbConfigured()) return noDb();
    await connectToDatabase();
    const { id } = await ctx.params;
    const item = await Model.findById(id).lean();
    if (!item) return fail('Not found', 404);
    return json({ ok: true, item: plain(item) });
  }

  async function PUT(req, ctx) {
    const denied = await guardAdmin();
    if (denied) return denied;
    if (!isDbConfigured()) return noDb();
    await connectToDatabase();
    const { id } = await ctx.params;
    const body = sanitize((await readJson(req)) || {});
    if (hasSlug && (body.slug || body[slugSource])) {
      body.slug = await ensureUniqueSlug(Model, body.slug || body[slugSource], id);
    }
    try {
      const updated = await Model.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!updated) return fail('Not found', 404);
      revalidate(tags);
      return ok({ item: plain(updated) });
    } catch (err) {
      return fail(err.message || 'Update failed', 422);
    }
  }

  async function DELETE(_req, ctx) {
    const denied = await guardAdmin();
    if (denied) return denied;
    if (!isDbConfigured()) return noDb();
    await connectToDatabase();
    const { id } = await ctx.params;
    const deleted = await Model.findByIdAndDelete(id);
    if (!deleted) return fail('Not found', 404);
    revalidate(tags);
    return ok({ id });
  }

  return { GET, PUT, DELETE };
}
