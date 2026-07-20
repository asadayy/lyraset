/**
 * Infinite platform ticker — pure CSS marquee (no JS, no layout thrash). The
 * track is duplicated so the scroll is seamless; it pauses on hover. Items come
 * from Site Settings.
 */
export default function PlatformMarquee({ platforms = [] }) {
  if (!platforms.length) return null;
  const items = [...platforms, ...platforms];

  return (
    <section className="platform-marquee section--dark" aria-label="Platforms we work with">
      <div className="marquee">
        <div className="marquee__track">
          {items.map((p, i) => (
            <span className="platform-marquee__item" key={i} aria-hidden={i >= platforms.length}>
              <span className="platform-marquee__dot" /> {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
