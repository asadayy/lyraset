import { getTeam } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import PageHero from '@/components/PageHero';
import TeamCard from '@/components/cards/TeamCard';
import MediaImage from '@/components/MediaImage';
import Reveal from '@/components/motion/Reveal';
import '@/styles/team.scss';

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata({
    path: '/team',
    fallbackTitle: 'Team',
    fallbackDescription:
      'Meet the creative minds and growth strategists driving real results for brands.',
  });
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="Meet the Wizards"
        title="The team that actually does the work"
        subtitle="Small team, big seniority. Every strategist on your account has 5+ years in the trenches — the person in your kickoff call is the person shipping the work."
      />

      <section className="section">
        <div className="container-x">
          <div className="team-grid">
            {team.map((m) => (
              <Reveal key={m._id || m.name}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>

          <div className="team-bios">
            {team.map((m) => (
              <Reveal as="article" className="team-bio" key={`bio-${m._id || m.name}`}>
                <MediaImage media={m.photo} label={m.name} ratio="1" rounded sizes="220px" />
                <div>
                  <h2 className="team-bio__name">{m.name}</h2>
                  <p className="team-bio__role">{m.role}</p>
                  <p className="team-bio__text">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
