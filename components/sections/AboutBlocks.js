import Reveal from '@/components/motion/Reveal';
import '@/styles/about.scss';

/** About blocks — alternating tag + display title + body, one per value/story. */
export default function AboutBlocks({ data = {} }) {
  const blocks = data.blocks || [];
  return (
    <section className="section about-blocks">
      <div className="container-x">
        {data.heading && (
          <Reveal as="h2" className="display-lg about-blocks__heading">
            {data.heading}
          </Reveal>
        )}
        <div className="about-blocks__list">
          {blocks.map((b, i) => (
            <Reveal className="about-card" key={i} delay={Math.min(i * 0.06, 0.3)}>
              <span className="about-card__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {b.tag && <span className="about-card__tag">{b.tag}</span>}
              <h3 className="about-card__title">{b.title}</h3>
              <p className="about-card__body">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
