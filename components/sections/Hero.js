import Link from 'next/link';
import Icon from '@/components/Icon';
import MediaImage from '@/components/MediaImage';
import HeroHeadline from '@/components/motion/HeroHeadline';
import Reveal from '@/components/motion/Reveal';
import '@/styles/hero.scss';

/**
 * Home / page hero: oversized multi-line headline (mask-reveal via
 * HeroHeadline), supporting line, CTA pair, floating illustration, and an
 * optional bottom strip (phone + first office) sourced from Site Settings.
 */
export default function Hero({ data = {}, settings }) {
  const {
    eyebrow,
    headlineLines = [],
    subline,
    primaryCta,
    secondaryCta,
    image,
    showStrip,
  } = data;
  const office = settings?.offices?.[0];
  const phone = settings?.phones?.[0];

  return (
    <section className="hero section--dark">
      <span className="glow-blob hero__glow-1" aria-hidden="true" />
      <span className="glow-blob hero__glow-2" aria-hidden="true" />
      <div className="hero__grid-bg" aria-hidden="true" />

      <div className="container-x hero__inner">
        <div className="hero__content">
          {eyebrow && (
            <Reveal as="span" className="eyebrow hero__eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              {eyebrow}
            </Reveal>
          )}

          <HeroHeadline lines={headlineLines} className="display-hero hero__title" />

          {subline && (
            <Reveal as="p" className="hero__subline" delay={0.35}>
              {subline}
            </Reveal>
          )}

          <Reveal className="hero__ctas" delay={0.45}>
            {primaryCta?.label && (
              <Link href={primaryCta.href || '/contact'} className="btn btn-primary btn-lg">
                {primaryCta.label}
                <span className="btn-arrow">
                  <Icon name="arrow-right" size={18} />
                </span>
              </Link>
            )}
            {secondaryCta?.label && (
              <Link href={secondaryCta.href || '/portfolio'} className="btn btn-ghost btn-lg">
                <Icon name="play" size={16} /> {secondaryCta.label}
              </Link>
            )}
          </Reveal>

          {showStrip && (office || phone) && (
            <Reveal className="hero__strip" delay={0.55}>
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hero__strip-item">
                  <Icon name="phone" size={16} /> {phone}
                </a>
              )}
              {office && (
                <span className="hero__strip-item">
                  <Icon name="map-pin" size={16} /> {office.address}
                </span>
              )}
            </Reveal>
          )}
        </div>

        <div className="hero__visual">
          <div className="floaty hero__illustration">
            <MediaImage
              media={image}
              label="LYRASET"
              ratio="1"
              sizes="(max-width: 992px) 80vw, 40vw"
              priority
              rounded
            />
          </div>
          <span className="hero__scroll" aria-hidden="true">
            <Icon name="arrow-down" size={18} /> Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
