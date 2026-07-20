import { revalidateTag, revalidatePath } from 'next/cache';
import { json, fail, readJson } from '@/lib/apiHelpers';

export const dynamic = 'force-dynamic';

/**
 * Internal, secret-protected on-demand revalidation. Useful for external
 * triggers (e.g. a webhook). In-app CMS mutations revalidate directly.
 * Body: { secret, tags?: string[], paths?: string[] }
 */
export async function POST(req) {
  const body = (await readJson(req)) || {};
  if (!process.env.REVALIDATE_SECRET || body.secret !== process.env.REVALIDATE_SECRET) {
    return fail('Unauthorized', 401);
  }
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const paths = Array.isArray(body.paths) ? body.paths : [];
  for (const t of tags) revalidateTag(t);
  for (const p of paths) revalidatePath(p);
  return json({ ok: true, revalidated: { tags, paths } });
}
