import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import '@/styles/sections.scss';

/** Three-column "Mission Checklist" content block. */
export default function MissionColumns({ data = {} }) {
  const columns = data.columns || [];
  return (
    <section className="section mission-section">
      <div className="container-x">
        <SectionHeader eyebrow={data.eyebrow || 'Mission Checklist'} heading={data.heading} />
        <div className="mission-grid">
          {columns.map((c, i) => (
            <Reveal className="mission-col" key={i} delay={i * 0.06}>
              <span className="mission-col__check">
                <Icon name="check" size={20} />
              </span>
              <h3 className="mission-col__title">{c.title}</h3>
              <p className="mission-col__body">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
