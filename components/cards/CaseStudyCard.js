import Link from 'next/link';
import MediaImage from '@/components/MediaImage';
import Icon from '@/components/Icon';

/**
 * Portfolio card: cover image (or branded placeholder), category tag, title,
 * and a "View Project" affordance. Image zooms on hover (see portfolio.scss).
 */
export default function CaseStudyCard({ item, priority = false }) {
  return (
    <Link href={`/portfolio/${item.slug}`} className="case-card" data-category={item.categorySlug}>
      <div className="case-card__media">
        <MediaImage
          media={item.coverImage}
          label={item.client || item.title}
          ratio="4/3"
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          priority={priority}
          rounded={false}
        />
        {item.categoryName && <span className="case-card__tag">{item.categoryName}</span>}
      </div>
      <div className="case-card__body">
        <h3 className="case-card__title">{item.title}</h3>
        <p className="case-card__summary">{item.summary}</p>
        <span className="case-card__more">
          View Project <Icon name="arrow-up-right" size={16} />
        </span>
      </div>
    </Link>
  );
}
