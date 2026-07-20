import MediaImage from '@/components/MediaImage';

/**
 * Team member card: portrait with a skills panel that slides over the photo on
 * hover/focus. Supports individual members and group cards.
 */
export default function TeamCard({ member }) {
  return (
    <article className="team-card" tabIndex={0}>
      <div className="team-card__media">
        <MediaImage
          media={member.photo}
          label={member.name}
          ratio="4/5"
          sizes="(max-width: 768px) 50vw, 25vw"
          rounded={false}
        />
        {member.type === 'group' && <span className="team-card__badge">Team</span>}
        {member.skills?.length > 0 && (
          <div className="team-card__skills">
            <span className="team-card__skills-label">Skills</span>
            <ul>
              {member.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="team-card__info">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
      </div>
    </article>
  );
}
