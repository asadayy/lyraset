import Link from 'next/link';
import Icon from '@/components/Icon';

/**
 * Service card for the "What We Offer" grid: icon chip, title, 2-line blurb,
 * "Learn More". A featured card gets the animated gradient border.
 */
export default function ServiceCard({ service }) {
  const featured = service.featured;
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card ${featured ? 'is-featured gradient-border' : ''}`}
    >
      <span className="icon-chip service-card__icon">
        <Icon name={service.iconKey || 'sparkles'} size={24} />
      </span>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__blurb">{service.shortBlurb}</p>
      <span className="service-card__more">
        Learn More <Icon name="arrow-right" size={16} />
      </span>
      {featured && <span className="service-card__badge">Most popular</span>}
    </Link>
  );
}
