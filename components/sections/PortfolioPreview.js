import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import CaseStudyCard from '@/components/cards/CaseStudyCard';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import '@/styles/portfolio.scss';

/** "Creative Work" portfolio preview grid section. */
export default function PortfolioPreview({ data = {}, caseStudies = [] }) {
  const list = data.limit ? caseStudies.slice(0, data.limit) : caseStudies;

  return (
    <section className="section portfolio-section">
      <div className="container-x">
        <SectionHeader
          eyebrow={data.eyebrow || 'Creative Work'}
          heading={data.heading}
          subheading={data.subheading}
        />
        <div className="portfolio-grid">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.06}>
              <CaseStudyCard item={c} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        <div className="services-grid__foot">
          <Link href="/portfolio" className="btn btn-ghost-dark">
            View all work
            <span className="btn-arrow">
              <Icon name="arrow-right" size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
