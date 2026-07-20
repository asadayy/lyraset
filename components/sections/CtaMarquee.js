import Link from 'next/link';
import Icon from '@/components/Icon';
import '@/styles/sections.scss';

/** Big repeating "Let's Talk" marquee that links to contact. */
export default function CtaMarquee({ data = {} }) {
  const text = data.text || "Let's Talk";
  const href = data.href || '/contact';
  const items = Array.from({ length: 10 });

  return (
    <Link href={href} className="cta-marquee" aria-label={text}>
      <div className="marquee">
        <div className="marquee__track">
          {items.map((_, i) => (
            <span className="cta-marquee__item" key={i} aria-hidden={i > 0}>
              {text}
              <Icon name="arrow-up-right" size={28} />
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
