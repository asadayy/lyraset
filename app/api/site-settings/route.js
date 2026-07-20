import SiteSettings from '@/models/SiteSettings';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, json, ok, fail, readJson, revalidate } from '@/lib/apiHelpers';
import { plain } from '@/lib/utils';
import { settings as seedSettings } from '@/lib/seed';

export const dynamic = 'force-dynamic';

export async function GET() {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return json({ ok: true, item: seedSettings });
  await connectToDatabase();
  const doc = await SiteSettings.findOne({ key: 'singleton' }).lean();
  return json({ ok: true, item: doc ? plain(doc) : seedSettings });
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
    const updated = await SiteSettings.findOneAndUpdate({ key: 'singleton' }, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    // Site settings touch every page.
    revalidate(['settings', 'pages']);
    return ok({ item: plain(updated) });
  } catch (err) {
    return fail(err.message || 'Update failed', 422);
  }
}
