/**
 * Inline SVG icon set — no icon-font or external dependency, tree-shakeable,
 * currentColor-driven. Covers service `iconKey`s and UI glyphs used site-wide.
 * Server-safe (no interactivity).
 */

const paths = {
  // --- Service icons ---
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z" />
    </>
  ),
  meta: (
    <path d="M4 15c0-3 1.4-6 3.6-6 1.7 0 2.7 1.6 3.6 3.4C11.9 10.6 13.2 9 15 9c2.4 0 3.7 3 3.7 6M4 15c0 1.7.9 3 2.4 3 2.6 0 3.4-4 4.8-6.6M20 15c0 1.7-.9 3-2.4 3-2.6 0-3.4-4-4.8-6.6" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  chat: (
    <path d="M4 5h16v10H9l-4 4V5Z" />
  ),
  trending: (
    <path d="m3 17 6-6 4 4 8-8M21 7v5m0-5h-5" />
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="m15 10 6-3v10l-6-3" />
    </>
  ),
  brand: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  data: (
    <>
      <path d="M4 20V10M9 20V4M14 20v-7M19 20V8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  sparkles: (
    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3ZM19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
  ),

  // --- UI icons ---
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-left': <path d="m15 6-6 6 6 6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  phone: (
    <path d="M4 5c0 8 7 15 15 15l1.5-3.5-4-1.5-1.5 1.5c-2-1-4-3-5-5l1.5-1.5-1.5-4L4 5Z" />
  ),
  'map-pin': (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  whatsapp: (
    <path d="M4 20l1.3-4A8 8 0 1 1 8 18l-4 2Zm5.5-11c-.3 0-.6.1-.8.5-.3.5-.9 1.2-.9 2.3 0 1.4 1 2.7 1.2 2.9.2.2 2 3.1 4.9 4.2 2.4.9 2.9.8 3.4.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7 1-.9 1.1-.1.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5Z" />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  play: <path d="M8 5v14l11-7-11-7Z" />,
  star: (
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  ),
  quote: (
    <path d="M7 7c-2 1-3 3-3 6v4h5v-5H6c0-2 1-3 3-4L7 7Zm9 0c-2 1-3 3-3 6v4h5v-5h-3c0-2 1-3 3-4l-2-1Z" />
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  'arrow-down': <path d="M12 5v14M6 13l6 6 6-6" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8.5c0-.3.2-.5.5-.5H14Z" />,
  x: <path d="M4 4l7 8-7 8h2.5L12 13l5.5 7H20l-7-8 7-8h-2.5L12 11 6.5 4H4Z" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v0M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
    </>
  ),
};

/**
 * @param {{ name: string, size?: number, className?: string, strokeWidth?: number, filled?: boolean }} props
 */
export default function Icon({ name, size = 24, className = '', strokeWidth = 1.8, filled = false }) {
  const shape = paths[name];
  if (!shape) return null;
  const solid = ['star', 'play', 'facebook', 'x', 'whatsapp', 'quote', 'meta'].includes(name) || filled;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  );
}
