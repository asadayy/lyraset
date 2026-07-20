import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';

/**
 * Self-hosted, subset fonts via next/font (zero layout shift, no external
 * request at runtime). Two families / four weights total to stay within the
 * performance budget. Exposed as CSS variables consumed by the SCSS tokens.
 */

// Display: extra-bold, uppercase-leaning headlines.
export const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
});

// Body: regular / medium / bold running text and UI.
export const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
});
