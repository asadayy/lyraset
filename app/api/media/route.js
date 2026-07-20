import MediaAsset from '@/models/MediaAsset';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, json, ok, fail, readJson } from '@/lib/apiHelpers';
import { plain } from '@/lib/utils';

export const dynamic = 'force-dynamic';

/** Admin: list media assets (optionally filtered by ?type=image|video|raw). */
export async function GET(req) {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return json({ ok: true, items: [] });
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const q = type && ['image', 'video', 'raw'].includes(type) ? { resourceType: type } : {};
  const items = await MediaAsset.find(q).sort({ createdAt: -1 }).limit(500).lean();
  return json({ ok: true, items: items.map(plain) });
}

/** Admin: record an asset that was just uploaded directly to Cloudinary. */
export async function POST(req) {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return fail('Database not configured.', 503);
  await connectToDatabase();
  const body = (await readJson(req)) || {};
  if (!body.publicId || !body.url) return fail('publicId and url are required', 422);
  try {
    const doc = await MediaAsset.findOneAndUpdate(
      { publicId: body.publicId },
      {
        publicId: body.publicId,
        url: body.url,
        resourceType: body.resourceType || 'image',
        format: body.format || '',
        bytes: body.bytes || 0,
        width: body.width || null,
        height: body.height || null,
        alt: body.alt || '',
        folder: body.folder || 'lyraset',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return ok({ item: plain(doc) });
  } catch (err) {
    return fail(err.message || 'Save failed', 422);
  }
}
