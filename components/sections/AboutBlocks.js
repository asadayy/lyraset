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
            <Reveal className="about-block" key={i} delay={0.04}>
              <div className="about-block__label">
                <span className="about-block__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="about-block__tag">{b.tag}</span>
              </div>
              <div className="about-block__content">
                <h3 className="about-block__title">{b.title}</h3>
                <p className="about-block__body">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
