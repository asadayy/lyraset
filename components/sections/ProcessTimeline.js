import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import ProcessScroll from '@/components/motion/ProcessScroll';
import '@/styles/sections.scss';

/**
 * 5-step process timeline ("Quest Sequence"). A connecting progress line runs
 * down the steps; each step reveals on scroll. GSAP pins/draws the line in the
 * animation pass — here the structure + reveal are in place.
 */
export default function ProcessTimeline({ data = {} }) {
  const steps = data.steps || [];

  return (
    <section className="section section--dark process-section">
      <div className="container-x">
        <SectionHeader eyebrow={data.eyebrow || 'Quest Sequence'} heading={data.heading} />
        <ProcessScroll />
        <ol className="process-timeline" data-process-timeline>
          <span className="process-timeline__line" aria-hidden="true">
            <span className="process-timeline__progress" data-process-progress />
          </span>
          {steps.map((step, i) => (
            <Reveal as="li" className="process-step" key={i} delay={i * 0.04}>
              <span className="process-step__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="process-step__body">
                <span className="process-step__level">{step.level}</span>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__text">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
