import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader';
import ServiceCard from '@/components/cards/ServiceCard';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import '@/styles/services.scss';

/** "What We Offer" services grid section. */
export default function ServicesGrid({ data = {}, services = [] }) {
  const list = data.limit ? services.slice(0, data.limit) : services;

  return (
    <section className="section section--grey services-grid-section">
      <div className="container-x">
        <SectionHeader
          eyebrow={data.eyebrow || 'What We Offer'}
          heading={data.heading}
          subheading={data.subheading}
        />
        <div className="services-grid">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <div className="services-grid__foot">
          <Link href="/services" className="btn btn-ghost-dark">
            Explore all services
            <span className="btn-arrow">
              <Icon name="arrow-right" size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
