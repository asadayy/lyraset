import LeadForm from '@/components/forms/LeadForm';
import Reveal from '@/components/motion/Reveal';
import '@/styles/sections.scss';

/** "Work With Us" band (navy): short pitch + compact lead form. */
export default function WorkWithUsForm({ data = {}, id }) {
  return (
    <section className="section section--dark work-band" id={id}>
      <span className="glow-blob work-band__glow" aria-hidden="true" />
      <div className="container-x work-band__inner">
        <Reveal className="work-band__intro">
          <h2 className="display-xl">{data.heading || 'Ready to grow your brand?'}</h2>
          {data.body && <p className="lead-muted work-band__body">{data.body}</p>}
        </Reveal>
        <Reveal className="work-band__form-wrap" delay={0.1}>
          <div className="work-band__card">
            <LeadForm
              source="work-with-us"
              buttonLabel={data.buttonLabel || 'Start With Us'}
              dark
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
