/**
 * Minimal allow-list HTML sanitizer for CMS rich-text.
 *
 * Rich text is authored by authenticated admins, so this is defense-in-depth
 * rather than the primary trust boundary: it strips script/style/iframe/object
 * tags, all inline event handlers, and javascript: URLs. For untrusted input
 * you would swap in a full library (sanitize-html) behind the same function.
 *
 * @param {string} html
 * @returns {string}
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return '';
  let out = html;

  // Remove dangerous elements entirely (including contents).
  out = out.replace(/<\s*(script|style|iframe|object|embed|form)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
  // Remove self-closing / unmatched dangerous tags.
  out = out.replace(/<\s*(script|style|iframe|object|embed|form)[^>]*\/?>/gi, '');
  // Strip inline event handlers: on*="..." / on*='...'.
  out = out.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  // Neutralize javascript: and data: (non-image) URLs in href/src.
  out = out.replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1=$2#$2');

  return out;
}

export default sanitizeHtml;
