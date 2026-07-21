import Icon from '@/components/Icon';

/**
 * Purpose-built hero graphic — an on-brand "campaign performance" dashboard
 * with a rising area chart and floating KPI chips. Shown when no hero image is
 * uploaded so the hero looks intentional out of the box (the Hero defers to a
 * real image when the admin adds one). Pure CSS animation, no client JS.
 */
export default function HeroVisual() {
  return (
    <div className="hero-viz" aria-hidden="true">
      <div className="hero-viz__card floaty">
        <div className="hero-viz__head">
          <span className="hero-viz__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="hero-viz__title">Campaign Performance</span>
          <span className="hero-viz__live">
            <span className="hero-viz__live-dot" /> Live
          </span>
        </div>

        <div className="hero-viz__metric">
          <span className="hero-viz__metric-label">Revenue · last 30 days</span>
          <span className="hero-viz__metric-row">
            <span className="hero-viz__metric-value">$412,900</span>
            <span className="hero-viz__delta">
              <Icon name="trending" size={14} /> +218%
            </span>
          </span>
        </div>

        <div className="hero-viz__chart">
          <svg viewBox="0 0 340 150" preserveAspectRatio="none" role="presentation">
            <defs>
              <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(47,132,255,0.42)" />
                <stop offset="100%" stopColor="rgba(47,132,255,0)" />
              </linearGradient>
            </defs>
            <path
              className="hero-viz__area"
              d="M0,126 L38,116 L76,120 L114,92 L152,100 L190,64 L228,72 L266,42 L304,30 L340,14 L340,150 L0,150 Z"
              fill="url(#heroArea)"
            />
            <path
              className="hero-viz__line"
              d="M0,126 L38,116 L76,120 L114,92 L152,100 L190,64 L228,72 L266,42 L304,30 L340,14"
              fill="none"
              stroke="var(--blue-500)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hero-viz__peak" />
        </div>

        <div className="hero-viz__stats">
          <div>
            <span>ROAS</span>
            <strong>4.8×</strong>
          </div>
          <div>
            <span>CTR</span>
            <strong>3.2%</strong>
          </div>
          <div>
            <span>Spend</span>
            <strong>$86K</strong>
          </div>
        </div>
      </div>

      <div className="hero-viz__chip hero-viz__chip--a">
        <span className="hero-viz__chip-icon">
          <Icon name="meta" size={16} />
        </span>
        <span className="hero-viz__chip-text">
          <strong>Meta Ads</strong>
          <em>+$128K revenue</em>
        </span>
      </div>

      <div className="hero-viz__chip hero-viz__chip--b">
        <span className="hero-viz__chip-icon">
          <Icon name="search" size={16} />
        </span>
        <span className="hero-viz__chip-text">
          <strong>Google Ads</strong>
          <em>4.8× ROAS</em>
        </span>
      </div>
    </div>
  );
}
