import Reveal from '@/components/motion/Reveal';
import '@/styles/about.scss';

/** Compact hero for index/detail pages (services, portfolio, team, careers…). */
export default function PageHero({ eyebrow, title, subtitle, children, dark = true }) {
  return (
    <section className={`page-hero ${dark ? 'page-hero--dark' : 'page-hero--light'}`}>
      {dark && <span className="glow-blob page-hero__glow" aria-hidden="true" />}
      <div className="container-x page-hero__inner">
        {eyebrow && (
          <Reveal as="span" className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h1" className="display-xl page-hero__title" delay={0.05}>
          {title}
        </Reveal>
        {subtitle && (
          <Reveal as="p" className="page-hero__sub" delay={0.1}>
            {subtitle}
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.15} className="mt-4">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
