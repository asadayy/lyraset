/**
 * Custom next/image loader for Cloudinary.
 *
 * Every image routed through <CldImage> is served with `f_auto,q_auto` (format
 * + quality auto), DPR awareness, and a width-limited transform so the browser
 * only ever downloads the pixels it needs. Accepts either a full Cloudinary
 * `secure_url` or a bare `public_id`.
 *
 * @param {{ src: string, width: number, quality?: number }} args
 * @returns {string} fully-qualified Cloudinary delivery URL
 */
export default function cloudinaryLoader({ src, width, quality }) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

  const transforms = [
    'f_auto',
    `q_${quality || 'auto'}`,
    'c_limit',
    `w_${width}`,
    'dpr_auto',
  ].join(',');

  // Full Cloudinary URL — inject transforms right after `/upload/`.
  if (/^https?:\/\/res\.cloudinary\.com\//.test(src)) {
    if (src.includes('/upload/')) {
      // Avoid double-inserting if a transform segment already exists.
      return src.replace(/\/upload\/(?!.*\/upload\/)/, `/upload/${transforms}/`);
    }
    return src;
  }

  // Non-Cloudinary absolute URL or local /public asset — return untouched.
  if (/^https?:\/\//.test(src) || src.startsWith('/')) {
    return src;
  }

  // Bare public_id.
  const id = src.replace(/^\/+/, '');
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${id}`;
}
