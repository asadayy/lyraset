import { getCaseStudies, getCategories } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import PortfolioGrid from '@/components/PortfolioGrid';
import '@/styles/portfolio.scss';

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata({
    path: '/portfolio',
    fallbackTitle: 'Portfolio',
    fallbackDescription:
      "A curated showcase of campaigns, visuals, and digital experiences we've crafted for brands that mean business.",
  });
}

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([getCaseStudies(), getCategories()]);

  return (
    <>
      <PageHero
        eyebrow="Creative Work"
        title="Measurable growth stories"
        subtitle="A curated showcase of campaigns, visuals, and digital experiences we've crafted for brands that mean business."
      />
      <section className="section">
        <div className="container-x">
          <PortfolioGrid items={items} categories={categories} />
        </div>
      </section>
    </>
  );
}
