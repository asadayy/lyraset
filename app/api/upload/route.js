import { isCloudinaryConfigured, signUploadParams } from '@/lib/cloudinary';
import { requireAdmin } from '@/lib/auth';
import { json, ok, fail, readJson, clientIp } from '@/lib/apiHelpers';
import { rateLimit } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

// Declared-size limits enforced server-side before signing (client also checks).
const LIMITS = {
  image: 10 * 1024 * 1024, // 10MB
  video: 200 * 1024 * 1024, // 200MB
  raw: 5 * 1024 * 1024, // 5MB (PDF/CV)
};

/**
 * Returns Cloudinary signed-upload parameters so the browser can upload
 * directly (the file never passes through this function — essential on
 * serverless with small body limits). The API secret stays server-side.
 *
 * - Admin uploads: any folder / resource type.
 * - Public "cv" uploads (careers form): forced to raw + cvs folder, rate-limited.
 */
export async function POST(req) {
  if (!isCloudinaryConfigured()) {
    return fail('Cloudinary is not configured. Set CLOUDINARY_* env vars.', 503);
  }

  const body = (await readJson(req)) || {};
  const purpose = body.purpose === 'cv' ? 'cv' : 'admin';
  let resourceType = ['image', 'video', 'raw'].includes(body.resourceType)
    ? body.resourceType
    : 'image';
  let folder = typeof body.folder === 'string' && body.folder ? body.folder : 'lyraset';

  if (purpose === 'cv') {
    // Public path: constrain hard + rate limit.
    const ip = clientIp(req);
    const { allowed } = rateLimit(`upload-cv:${ip}`, 5, 60_000);
    if (!allowed) return fail('Too many uploads. Please try again shortly.', 429);
    resourceType = 'raw';
    folder = 'lyraset/cvs';
  } else {
    const auth = await requireAdmin();
    if (!auth.ok) return fail('Unauthorized', 401);
  }

  const declaredBytes = Number(body.bytes || 0);
  if (declaredBytes && declaredBytes > LIMITS[resourceType]) {
    return fail(
      `File too large. Max ${Math.round(LIMITS[resourceType] / (1024 * 1024))}MB for ${resourceType}.`,
      413
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder };
  const signature = signUploadParams(paramsToSign);

  return json({
    ok: true,
    signature,
    timestamp,
    folder,
    resourceType,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
