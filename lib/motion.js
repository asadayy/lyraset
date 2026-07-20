/**
 * Centralized Framer Motion tokens + variants.
 *
 * Keeping every duration, easing, and variant here makes the whole site feel
 * like one motion system. Values mirror the CSS tokens in styles/_tokens.scss.
 * All variants animate only transform/opacity to stay on the compositor.
 */

export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: { type: 'spring', stiffness: 320, damping: 30, mass: 0.8 },
};

export const DUR = {
  fast: 0.18,
  base: 0.42,
  slow: 0.7,
};

/** Container that staggers its children into view. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Fade + rise, the workhorse entrance. */
export const fadeRise = (y = 24, duration = DUR.base) => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE.out },
  },
});

/** Mask-reveal upward — used for hero headline lines. */
export const lineReveal = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: DUR.slow, ease: EASE.out },
  },
};

/** Word-level reveal for section headlines. */
export const wordReveal = {
  hidden: { opacity: 0, y: '0.6em' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE.out },
  },
};

/** Soft scale-in for cards / media. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.base, ease: EASE.out },
  },
};

/** Standard once-per-view viewport config. */
export const inView = { once: true, amount: 0.3, margin: '0px 0px -10% 0px' };
