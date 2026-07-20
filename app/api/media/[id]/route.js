import MediaAsset from '@/models/MediaAsset';
import { isDbConfigured, connectToDatabase } from '@/lib/db';
import { guardAdmin, ok, fail } from '@/lib/apiHelpers';
import { isCloudinaryConfigured, deleteAsset } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

/** Admin: delete a media asset from Cloudinary and the database. */
export async function DELETE(_req, ctx) {
  const denied = await guardAdmin();
  if (denied) return denied;
  if (!isDbConfigured()) return fail('Database not configured.', 503);
  await connectToDatabase();
  const { id } = await ctx.params;
  const asset = await MediaAsset.findById(id);
  if (!asset) return fail('Not found', 404);

  if (isCloudinaryConfigured()) {
    try {
      await deleteAsset(asset.publicId, asset.resourceType);
    } catch {
      // Continue removing the DB record even if the remote delete failed.
    }
  }
  await asset.deleteOne();
  return ok({ id });
}
