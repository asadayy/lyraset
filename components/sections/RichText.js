import { sanitizeHtml } from '@/lib/sanitize';
import '@/styles/sections.scss';

/** Rich-text section (privacy / terms / generic prose). HTML is sanitized. */
export default function RichText({ data = {} }) {
  return (
    <section className="section rich-text-section">
      <div className="container-x rich-text__inner">
        {data.heading && <h1 className="display-lg rich-text__heading">{data.heading}</h1>}
        <div
          className="rich-text__body"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.html) }}
        />
      </div>
    </section>
  );
}
