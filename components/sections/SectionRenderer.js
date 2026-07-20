import dynamic from 'next/dynamic';
import { getServices, getCaseStudies, getTestimonials, getSettings } from '@/lib/data';
import PlatformMarquee from './PlatformMarquee';
import ServicesGrid from './ServicesGrid';
import PortfolioPreview from './PortfolioPreview';
import ProcessTimeline from './ProcessTimeline';
import MissionColumns from './MissionColumns';
import ValuesBand from './ValuesBand';
import WorkWithUsForm from './WorkWithUsForm';
import AboutBlocks from './AboutBlocks';
import RichText from './RichText';
import CtaMarquee from './CtaMarquee';

// Framer-Motion-heavy sections are code-split so pages that don't use them
// (e.g. privacy/terms) never ship the animation runtime. They still SSR.
const Hero = dynamic(() => import('./Hero'));
const StatsBar = dynamic(() => import('./StatsBar'));
const TestimonialSlider = dynamic(() => import('./TestimonialSlider'));

/**
 * Maps a page's ordered section records to components, fetching only the data
 * the present section types require. This is the runtime half of the "every
 * page is composable" model — adding a new section instance in the CMS renders
 * with zero code changes.
 */
export default async function SectionRenderer({ sections = [], settings }) {
  const types = new Set(sections.map((s) => s.type));

  const [services, caseStudies, testimonials, site] = await Promise.all([
    types.has('servicesGrid') ? getServices() : Promise.resolve([]),
    types.has('portfolioPreview') ? getCaseStudies() : Promise.resolve([]),
    types.has('testimonialSlider') ? getTestimonials() : Promise.resolve([]),
    settings ? Promise.resolve(settings) : getSettings(),
  ]);

  return (
    <>
      {sections.map((section) => {
        const key = section._id;
        const data = section.data || {};
        switch (section.type) {
          case 'hero':
            return <Hero key={key} data={data} settings={site} />;
          case 'statsBar':
            return <StatsBar key={key} stats={site?.stats || []} />;
          case 'platformMarquee':
            return <PlatformMarquee key={key} platforms={site?.platforms || []} />;
          case 'servicesGrid':
            return <ServicesGrid key={key} data={data} services={services} />;
          case 'portfolioPreview':
            return <PortfolioPreview key={key} data={data} caseStudies={caseStudies} />;
          case 'processTimeline':
            return <ProcessTimeline key={key} data={data} />;
          case 'testimonialSlider':
            return <TestimonialSlider key={key} data={data} testimonials={testimonials} />;
          case 'missionColumns':
            return <MissionColumns key={key} data={data} />;
          case 'valuesBand':
            return <ValuesBand key={key} data={data} />;
          case 'workWithUsForm':
            return <WorkWithUsForm key={key} data={data} id="contact" />;
          case 'aboutBlocks':
            return <AboutBlocks key={key} data={data} />;
          case 'richText':
            return <RichText key={key} data={data} />;
          case 'ctaMarquee':
            return <CtaMarquee key={key} data={data} />;
          default:
            return null;
        }
      })}
    </>
  );
}
