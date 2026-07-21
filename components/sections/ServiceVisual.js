import Icon from '@/components/Icon';
import '@/styles/service-visual.scss';

/** Card-window traffic-light dots. */
function Dots() {
  return (
    <span className="svc-dots">
      <i />
      <i />
      <i />
    </span>
  );
}

/** Floating KPI chip. `pos` is one of tl | tr | bl | br. */
function Chip({ pos, icon, title, sub }) {
  return (
    <div className={`svc-chip svc-chip--${pos}`}>
      <span className="svc-chip__icon">
        <Icon name={icon} size={15} />
      </span>
      <span className="svc-chip__text">
        <strong>{title}</strong>
        <em>{sub}</em>
      </span>
    </div>
  );
}

// --- Per-service graphics --------------------------------------------------
const VISUALS = {
  // Web & Landing Pages — a page building itself in a browser + perf score.
  'web-development': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-browser">
          <div className="svc-browser__bar">
            <Dots />
            <span className="svc-browser__url">
              <Icon name="globe" size={11} /> lyraset.com
            </span>
          </div>
          <div className="svc-browser__view">
            <span className="svc-wire svc-wire--nav" />
            <span className="svc-wire svc-wire--hero" />
            <span className="svc-wire svc-wire--l1" />
            <span className="svc-wire svc-wire--l2" />
            <span className="svc-wire svc-wire--btn" />
            <span className="svc-wire svc-wire--c1" />
            <span className="svc-wire svc-wire--c2" />
            <span className="svc-wire svc-wire--c3" />
          </div>
        </div>
      </div>
      <div className="svc-chip svc-chip--tr">
        <span className="svc-gauge">100</span>
        <span className="svc-chip__text">
          <strong>Performance</strong>
          <em>Lighthouse</em>
        </span>
      </div>
      <Chip pos="bl" icon="check" title="SEO 98" sub="Accessible · Fast" />
    </>
  ),

  // Paid Social — a Meta ad post with engagement + ROAS.
  'paid-social': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-ad__head">
          <span className="svc-ad__avatar">
            <Icon name="meta" size={16} />
          </span>
          <span className="svc-ad__who">
            <strong>LYRASET</strong>
            <em>Sponsored · Meta Ads</em>
          </span>
        </div>
        <div className="svc-ad__media">
          <Icon name="trending" size={30} />
          <span className="svc-shimmer" />
        </div>
        <div className="svc-ad__row">
          <span className="svc-ad__stat">
            <b>2,847</b> Likes
          </span>
          <span className="svc-ad__stat">
            <b>412</b> Shares
          </span>
          <span className="svc-ad__cta">Shop Now</span>
        </div>
      </div>
      <Chip pos="tl" icon="trending" title="ROAS 4.8×" sub="+218% revenue" />
      <Chip pos="br" icon="check" title="1,284" sub="Conversions" />
    </>
  ),

  // Search — a SERP with a typed query and a highlighted ad result.
  search: () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-serp__bar">
          <Icon name="search" size={16} />
          <span className="svc-serp__query">
            digital marketing agency
            <span className="svc-caret" />
          </span>
        </div>
        <div className="svc-serp__result svc-serp__result--ad">
          <span className="svc-serp__tag">Ad</span>
          <span className="svc-serp__lines">
            <b />
            <i />
          </span>
        </div>
        <div className="svc-serp__result">
          <span className="svc-serp__lines">
            <b />
            <i />
          </span>
        </div>
        <div className="svc-serp__result">
          <span className="svc-serp__lines">
            <b />
            <i />
          </span>
        </div>
      </div>
      <Chip pos="tr" icon="trending" title="Top of Page" sub="Position 1" />
      <Chip pos="bl" icon="check" title="CTR 8.4%" sub="Quality Score 9" />
    </>
  ),

  // Social Content — a content calendar with scheduled posts/reels.
  'social-content': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-cal__head">
          <strong>Content Calendar</strong>
          <span className="svc-cal__pill">6 platforms</span>
        </div>
        <div className="svc-cal__grid">
          {Array.from({ length: 21 }).map((_, i) => {
            const post = [2, 8, 15, 18].includes(i);
            const reel = [5, 11].includes(i);
            return (
              <span
                key={i}
                className={`svc-cal__cell${post ? ' is-post' : ''}${reel ? ' is-reel' : ''}`}
                style={{ '--d': `${(i % 7) * 0.08 + Math.floor(i / 7) * 0.1}s` }}
              />
            );
          })}
        </div>
        <div className="svc-cal__legend">
          <span className="svc-cal__key svc-cal__key--post" /> Posts
          <span className="svc-cal__key svc-cal__key--reel" /> Reels
        </div>
      </div>
      <Chip pos="tr" icon="chat" title="+312%" sub="Engagement" />
      <Chip pos="bl" icon="instagram" title="Scheduled" sub="30 days out" />
    </>
  ),

  // SEO — keyword rankings climbing to the top.
  seo: () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-seo__head">
          <strong>Keyword Rankings</strong>
          <span className="svc-seo__live">
            <i /> Climbing
          </span>
        </div>
        <ul className="svc-seo__list">
          <li>
            <span className="svc-seo__kw">marketing agency</span>
            <span className="svc-seo__rank">
              #1 <em>▲ 7</em>
            </span>
          </li>
          <li>
            <span className="svc-seo__kw">meta ads services</span>
            <span className="svc-seo__rank">
              #2 <em>▲ 5</em>
            </span>
          </li>
          <li>
            <span className="svc-seo__kw">seo consultant</span>
            <span className="svc-seo__rank">
              #3 <em>▲ 9</em>
            </span>
          </li>
        </ul>
        <div className="svc-seo__bars">
          {[38, 52, 61, 78, 88, 100].map((h, i) => (
            <span key={i} style={{ '--h': `${h}%`, '--d': `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
      <Chip pos="tr" icon="trending" title="+240%" sub="Organic traffic" />
      <Chip pos="bl" icon="search" title="1,847" sub="Keywords ranked" />
    </>
  ),

  // Video Production — a player with scrubber, timeline, delivery badge.
  'video-production': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-video__screen">
          <span className="svc-video__ring" />
          <span className="svc-video__play">
            <Icon name="play" size={22} />
          </span>
          <span className="svc-video__badge">5-Day Delivery</span>
        </div>
        <div className="svc-video__scrub">
          <span className="svc-video__progress" />
        </div>
        <div className="svc-video__timeline">
          <span className="clip a" />
          <span className="clip b" />
          <span className="clip c" />
          <span className="clip a" />
          <span className="clip b" />
        </div>
      </div>
      <Chip pos="tr" icon="video" title="4K · Reels" sub="UGC · YouTube" />
      <Chip pos="bl" icon="check" title="On time" sub="18-mo streak" />
    </>
  ),

  // Brand Systems — a brand kit: mark, type specimen, palette.
  'brand-systems': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-brand__head">
          <span className="svc-brand__mark" />
          <strong>Brand Kit</strong>
        </div>
        <div className="svc-brand__specimen">Aa</div>
        <div className="svc-brand__swatches">
          {['#0A1628', '#1B6FF2', '#2F84FF', '#E8F1FF', '#0B1220'].map((c, i) => (
            <span key={c} style={{ background: c, '--d': `${i * 0.08}s` }} />
          ))}
        </div>
        <div className="svc-brand__meta">
          <span>Manrope · Display</span>
          <span>#1B6FF2</span>
        </div>
      </div>
      <Chip pos="tr" icon="brand" title="Logo Suite" sub="Primary · Mono" />
      <Chip pos="bl" icon="sparkles" title="Brand Bible" sub="1-page system" />
    </>
  ),

  // Data & Analytics — a dashboard with bars + donut.
  'data-analytics': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-an__head">
          <strong>Analytics</strong>
          <span className="svc-an__live">
            <i /> GA4
          </span>
        </div>
        <div className="svc-an__body">
          <div className="svc-an__bars">
            {[45, 68, 55, 82, 72, 96].map((h, i) => (
              <span key={i} style={{ '--h': `${h}%`, '--d': `${i * 0.09}s` }} />
            ))}
          </div>
          <div className="svc-an__donut">
            <svg viewBox="0 0 36 36">
              <circle className="svc-an__donut-track" cx="18" cy="18" r="15.9" />
              <circle className="svc-an__donut-val" cx="18" cy="18" r="15.9" />
            </svg>
            <b>68%</b>
          </div>
        </div>
        <div className="svc-an__row">
          <span>
            Sessions <b>128K</b>
          </span>
          <span>
            Conv. rate <b>4.2%</b>
          </span>
        </div>
      </div>
      <Chip pos="tr" icon="data" title="Live" sub="Server-side" />
      <Chip pos="bl" icon="trending" title="Attribution" sub="Multi-touch" />
    </>
  ),

  // Lifecycle — an email automation flow.
  lifecycle: () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-flow__head">
          <Icon name="mail" size={15} />
          <strong>Automation Flow</strong>
        </div>
        <div className="svc-flow__nodes">
          <span className="svc-flow__node is-on" style={{ '--d': '0s' }}>
            Welcome
          </span>
          <span className="svc-flow__conn" style={{ '--d': '0.3s' }} />
          <span className="svc-flow__node is-on" style={{ '--d': '0.5s' }}>
            Abandoned Cart
          </span>
          <span className="svc-flow__conn" style={{ '--d': '0.8s' }} />
          <span className="svc-flow__node is-on" style={{ '--d': '1s' }}>
            Win-back
          </span>
        </div>
        <div className="svc-flow__email">
          <span className="svc-flow__subject" />
          <span className="svc-flow__line" />
          <span className="svc-flow__line svc-flow__line--short" />
        </div>
      </div>
      <Chip pos="tr" icon="mail" title="+38%" sub="Revenue recovered" />
      <Chip pos="bl" icon="check" title="Klaviyo" sub="Flows live" />
    </>
  ),

  // Growth Strategy — a conversion funnel.
  'growth-strategy': () => (
    <>
      <div className="svc-card floaty">
        <div className="svc-funnel__head">
          <strong>Growth Funnel</strong>
          <span className="svc-funnel__q">Q1 Plan</span>
        </div>
        <div className="svc-funnel__stages">
          {[
            ['Awareness', '128K', 100],
            ['Leads', '18.4K', 78],
            ['Trials', '4.2K', 54],
            ['Customers', '1.1K', 32],
          ].map(([label, val, w], i) => (
            <span key={label} className="svc-funnel__stage" style={{ '--w': `${w}%`, '--d': `${i * 0.12}s` }}>
              <span className="svc-funnel__label">{label}</span>
              <b>{val}</b>
            </span>
          ))}
        </div>
      </div>
      <Chip pos="tr" icon="strategy" title="Fractional CMO" sub="Weekly cadence" />
      <Chip pos="bl" icon="trending" title="+3.4×" sub="Pipeline" />
    </>
  ),
};

// Icon-key fallback so a service with a custom slug still gets a fitting visual.
const BY_ICON = {
  globe: 'web-development',
  meta: 'paid-social',
  search: 'search',
  chat: 'social-content',
  trending: 'seo',
  video: 'video-production',
  brand: 'brand-systems',
  data: 'data-analytics',
  mail: 'lifecycle',
  strategy: 'growth-strategy',
};

/**
 * Purpose-built, service-specific hero graphic (shown when a service has no
 * uploaded hero image). Pure CSS animation, server component.
 *
 * @param {{ slug?: string, iconKey?: string }} props
 */
export default function ServiceVisual({ slug, iconKey }) {
  const key = VISUALS[slug] ? slug : BY_ICON[iconKey] || 'data-analytics';
  const render = VISUALS[key];
  return (
    <div className={`svc-viz svc-viz--${key}`} aria-hidden="true">
      {render()}
    </div>
  );
}
