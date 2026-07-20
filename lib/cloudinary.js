import { v2 as cloudinary } from 'cloudinary';

/**
 * Server-side Cloudinary client. The API secret lives only here and in
 * environment variables — it never reaches the browser.
 */

let configured = false;

/**
 * Lazily configure the Cloudinary SDK from environment variables.
 * @returns {typeof cloudinary}
 */
export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
}

/**
 * True when all Cloudinary credentials are present.
 * @returns {boolean}
 */
export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Produce a signed set of parameters the browser uses for a direct, secure
 * upload to Cloudinary. Signing on the server keeps the API secret private.
 * @param {Record<string, string|number>} params - params to sign (folder, timestamp, etc.)
 * @returns {string} signature
 */
export function signUploadParams(params) {
  const cld = getCloudinary();
  return cld.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);
}

/**
 * Delete an asset from Cloudinary by public_id.
 * @param {string} publicId
 * @param {'image'|'video'|'raw'} resourceType
 * @returns {Promise<object>}
 */
export async function deleteAsset(publicId, resourceType = 'image') {
  const cld = getCloudinary();
  return cld.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
}

export default getCloudinary;
