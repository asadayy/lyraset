/**
 * Small shared helpers used across server and client code.
 */

/**
 * Convert an arbitrary string into a URL-safe slug.
 * @param {string} input
 * @returns {string}
 */
export function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

/**
 * Build a WhatsApp deep link with a prefilled message.
 * @param {string} number - phone in international format, digits/symbols allowed
 * @param {string} [text]
 * @returns {string}
 */
export function whatsappLink(number, text) {
  const digits = String(number || '').replace(/[^\d]/g, '');
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Format a number as a compact currency-ish stat label (best-effort).
 * @param {number} n
 * @returns {string}
 */
export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return String(n);
}

/**
 * Deep-clone a plain object (safe for Mongoose lean docs / seed data).
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Normalize a Mongoose document (or seed object) into a plain, serializable
 * object suitable for passing from Server to Client Components.
 * @param {any} doc
 * @returns {any}
 */
export function plain(doc) {
  if (doc == null) return doc;
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (key === '_id' && value && value.toString) return value.toString();
      if (key === '__v') return undefined;
      return value;
    })
  );
}

/**
 * Clamp a string to a maximum length, adding an ellipsis.
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
export function truncate(str, max = 160) {
  const s = String(str || '');
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}
