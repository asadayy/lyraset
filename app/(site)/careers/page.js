import Link from 'next/link';
import { getJobs } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import ApplicationForm from '@/components/forms/ApplicationForm';
import SectionHeader from '@/components/SectionHeader';
import Reveal from '@/components/motion/Reveal';
import Icon from '@/components/Icon';
import '@/styles/careers.scss';

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata({
    path: '/careers',
    fallbackTitle: 'Careers',
    fallbackDescription:
      "We're always looking for talented people passionate about digital marketing, creativity, and delivering real results.",
  });
}

export default async function CareersPage() {
  const jobs = await getJobs();
  const roles = jobs.map((j) => j.title);

  return (
    <>
      <PageHero
        eyebrow="Join the Team"
        title="Careers at LYRASET"
        subtitle="We're always looking for talented people who are passionate about digital marketing, creativity, and delivering real results."
      />

      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="Hiring Now" heading="Open roles" />
          <div className="jobs-list">
            {jobs.map((job) => (
              <Reveal as="article" className="job-card" key={job.slug}>
                <div className="job-card__main">
                  <h3 className="job-card__title">{job.title}</h3>
                  <div className="job-card__meta">
                    <span className="chip-tag">{job.employmentType}</span>
                    <span className="job-card__loc">
                      <Icon name="map-pin" size={15} /> {job.location}
                    </span>
                  </div>
                  <p className="job-card__summary">{job.summary}</p>
                </div>
                <Link href={`/careers/${job.slug}`} className="btn btn-ghost-dark job-card__cta">
                  View & Apply <Icon name="arrow-right" size={16} />
                </Link>
              </Reveal>
            ))}
            {jobs.length === 0 && <p className="lead-muted">No open roles right now — check back soon.</p>}
          </div>
        </div>
      </section>

      <section className="section section--grey" id="apply">
        <div className="container-x careers-apply">
          <div className="careers-apply__intro">
            <SectionHeader
              eyebrow="Apply"
              heading="Send us your resume"
              subheading="Tell us about yourself, what role(s) you're interested in, and paste a link to your portfolio or LinkedIn. We'll get back to you within five business days."
            />
          </div>
          <div className="careers-apply__form">
            <ApplicationForm roles={roles} />
          </div>
        </div>
      </section>
    </>
  );
}
