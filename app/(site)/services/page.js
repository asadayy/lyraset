import Link from 'next/link';
import { getServices } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/cards/ServiceCard';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import '@/styles/services.scss';

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata({
    path: '/services',
    fallbackTitle: 'Services',
    fallbackDescription:
      '360° digital marketing — paid ads, social, SEO, video, brand, data, lifecycle, and growth strategy.',
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Services engineered for growth"
        subtitle="360° digital marketing — social media, paid ads, video production, design, growth strategy, and web development. Pick a service to see how we run it."
      >
        <Link href="/contact" className="btn btn-primary">
          Start Your Growth <span className="btn-arrow"><Icon name="arrow-right" size={16} /></span>
        </Link>
      </PageHero>

      <section className="section section--grey">
        <div className="container-x">
          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
