import Lead from '@/models/Lead';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, ok, fail, readJson } from '@/lib/apiHelpers';
import { plain } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function PUT(req, ctx) {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return fail('Database not configured.', 503);
  await connectToDatabase();
  const { id } = await ctx.params;
  const body = (await readJson(req)) || {};
  const update = {};
  if (body.status) update.status = body.status;
  if (typeof body.notes === 'string') update.notes = body.notes;
  const updated = await Lead.findByIdAndUpdate(id, update, { new: true });
  if (!updated) return fail('Not found', 404);
  return ok({ item: plain(updated) });
}

export async function DELETE(_req, ctx) {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return fail('Database not configured.', 503);
  await connectToDatabase();
  const { id } = await ctx.params;
  const deleted = await Lead.findByIdAndDelete(id);
  if (!deleted) return fail('Not found', 404);
  return ok({ id });
}
