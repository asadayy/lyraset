import Reveal from '@/components/motion/Reveal';

/**
 * Shared section header: eyebrow chip + display heading + optional subheading.
 * Word-level reveal on scroll is handled by the Reveal wrapper (reduced-motion
 * safe). Used across every marketing section for a consistent rhythm.
 */
export default function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`section-header section-header--${align} ${className}`}>
      {eyebrow && (
        <Reveal as="span" className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </Reveal>
      )}
      {heading && (
        <Reveal as="h2" className="display-lg section-header__title" delay={0.05}>
          {heading}
        </Reveal>
      )}
      {subheading && (
        <Reveal as="p" className="section-header__sub" delay={0.1}>
          {subheading}
        </Reveal>
      )}
    </div>
  );
}
