import Image from 'next/image';
import '@/styles/media.scss';

/**
 * Renders a Cloudinary-backed image (via the global custom loader) inside a
 * fixed-ratio box so there is zero layout shift. When no media URL is present
 * (e.g. seed/demo content before uploads), it renders a branded gradient
 * placeholder with initials — so the site looks intentional out of the box.
 *
 * @param {object} props
 * @param {{url?:string, alt?:string, width?:number, height?:number}} props.media
 * @param {string} [props.alt]
 * @param {string} [props.ratio]  e.g. "16/9", "1", "4/5"
 * @param {string} [props.sizes]
 * @param {boolean} [props.priority]
 * @param {boolean} [props.rounded]
 * @param {string} [props.label]  text used to derive placeholder initials
 * @param {string} [props.className]
 */
export default function MediaImage({
  media,
  alt,
  ratio = '16/9',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  rounded = true,
  label = '',
  className = '',
}) {
  const url = media?.url;
  const altText = alt || media?.alt || label || 'LYRASET';
  const initials = getInitials(label || altText);

  return (
    <div
      className={`media-box ${rounded ? 'is-rounded' : ''} ${className}`}
      style={{ '--ratio': ratio }}
    >
      {url ? (
        <Image
          src={url}
          alt={altText}
          fill
          sizes={sizes}
          priority={priority}
          className="media-box__img"
        />
      ) : (
        <div className="media-box__placeholder" aria-label={altText} role="img">
          <span className="media-box__initials">{initials}</span>
          <span className="media-box__grid" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

function getInitials(str) {
  const words = String(str || '')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'LS';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
