import SeoDefault from '@/models/SeoDefault';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, json, ok, fail, readJson, revalidate } from '@/lib/apiHelpers';
import { plain } from '@/lib/utils';
import { seoDefault as seedSeo } from '@/lib/seed';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return json({ ok: true, item: seedSeo });
  await connectToDatabase();
  const doc = await SeoDefault.findOne({ key: 'singleton' }).lean();
  return json({ ok: true, item: doc ? plain(doc) : seedSeo });
}

export async function PUT(req) {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return fail('Database not configured.', 503);
  await connectToDatabase();
  const body = (await readJson(req)) || {};
  delete body._id;
  delete body.__v;
  body.key = 'singleton';
  try {
    const updated = await SeoDefault.findOneAndUpdate({ key: 'singleton' }, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    revalidate(['seo', 'pages']);
    return ok({ item: plain(updated) });
  } catch (err) {
    return fail(err.message || 'Update failed', 422);
  }
}
