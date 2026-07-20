import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import '@/styles/sections.scss';

/** Values band (navy) — short pitch + a checklist of values. */
export default function ValuesBand({ data = {} }) {
  const values = data.values || [];
  return (
    <section className="section section--dark values-band">
      <div className="container-x values-band__inner">
        <div className="values-band__intro">
          {data.eyebrow && <span className="eyebrow">{data.eyebrow}</span>}
          <h2 className="display-lg">{data.heading}</h2>
          {data.body && <p className="lead-muted values-band__body">{data.body}</p>}
        </div>
        <ul className="values-band__list">
          {values.map((v, i) => (
            <Reveal as="li" key={i} delay={i * 0.05} className="values-band__item">
              <Icon name="check" size={18} /> {typeof v === 'string' ? v : v.title}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
