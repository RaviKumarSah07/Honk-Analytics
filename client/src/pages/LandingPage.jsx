import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const features = [
  {
    icon: "📡",
    title: "Real-Time Capture",
    desc: "Vehicle horn data is recorded instantly across multiple city zones, with dashboards refreshing every 5 seconds.",
  },
  {
    icon: "📊",
    title: "Visual Analytics",
    desc: "Interactive charts reveal daily patterns, peak hours, and noise hotspots — all powered by MongoDB aggregation.",
  },
  {
    icon: "🏙️",
    title: "City Intelligence",
    desc: "Deep-dive into individual cities like Ahmedabad to understand hyper-local noise behaviour and traffic density.",
  },
  {
    icon: "🚗",
    title: "Vehicle Tracking",
    desc: "Track unique vehicles contributing to noise, helping identify high-frequency honkers in congested corridors.",
  },
  {
    icon: "🔥",
    title: "Peak Detection",
    desc: "Automatically surfaces the peak day and peak hour using smart aggregation — no manual analysis needed.",
  },
  {
    icon: "🌗",
    title: "Light & Dark Mode",
    desc: "A fully themed interface that respects your preference, persisted across sessions for a comfortable experience.",
  },
];

const stats = [
  { value: "5s",    label: "Refresh rate"       },
  { value: "24/7",  label: "Data collection"    },
  { value: "MERN",  label: "Tech stack"         },
  { value: "Live",  label: "Dashboard status"   },
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* ── Hero ── */}
      <section className="landing__hero">
        <div className="landing__hero-content anim-1">
          <div className="landing__eyebrow">
            <span className="landing__live-dot" />
            Live data · Indian cities
          </div>

          <h1 className="landing__headline">
            Urban noise,<br />
            <span className="landing__headline--accent">decoded.</span>
          </h1>

          <p className="landing__description">
            Honk Analytics is a real-time platform that captures, aggregates, and
            visualises vehicle horn data across Indian cities — giving researchers,
            planners, and citizens actionable insight into noise pollution.
          </p>

          <div className="landing__actions">
            <button
              className="landing__cta-btn"
              onClick={() => navigate("/dashboard")}
            >
              See Honk Statistics
              <span className="landing__cta-arrow">→</span>
            </button>
            <button
              className="landing__secondary-btn"
              onClick={() => navigate("/ahmedabad")}
            >
              Ahmedabad Dashboard
            </button>
          </div>
        </div>

        {/* Hero visual */}
        <div className="landing__hero-visual anim-2">
          <div className="landing__orb landing__orb--1" />
          <div className="landing__orb landing__orb--2" />
          <div className="landing__hero-card glass-card">
            <div className="hero-card__row">
              <span className="hero-card__label">Total Honks Today</span>
              <span className="hero-card__live">● LIVE</span>
            </div>
            <div className="hero-card__value">12,480</div>
            <div className="hero-card__bar-wrap">
              <div className="hero-card__bar-fill" />
            </div>
            <div className="hero-card__meta">↑ 18% from yesterday · Peak at 09:00</div>
          </div>
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <section className="landing__quick-stats anim-3">
        {stats.map(({ value, label }) => (
          <div key={label} className="landing__qstat glass-card">
            <div className="landing__qstat-value">{value}</div>
            <div className="landing__qstat-label">{label}</div>
          </div>
        ))}
      </section>

      {/* ── What is it ── */}
      <section className="landing__about anim-4">
        <div className="landing__about-text">
          <p className="section-label">What is Honk Analytics?</p>
          <h2 className="landing__section-title">
            The missing layer of<br />urban noise intelligence.
          </h2>
          <p className="landing__section-desc">
            Indian cities rank among the world's loudest — yet noise data remains
            fragmented and invisible. Honk Analytics bridges this gap by providing
            a structured, real-time view of honking patterns, enabling smarter
            decisions around traffic management, urban planning, and public health.
          </p>
          <button
            className="landing__cta-btn landing__cta-btn--sm"
            onClick={() => navigate("/dashboard")}
          >
            Explore the data →
          </button>
        </div>
        <div className="landing__about-graphic">
          <div className="about-graphic__ring" />
          <div className="about-graphic__inner glass-card">
            <div className="about-graphic__icon">📢</div>
            <div className="about-graphic__lines">
              {[80, 55, 90, 40, 70, 60, 95].map((h, i) => (
                <div
                  key={i}
                  className="about-graphic__line"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing__features">
        <p className="section-label" style={{ textAlign: "center" }}>Platform Features</p>
        <h2 className="landing__section-title" style={{ textAlign: "center", marginBottom: 40 }}>
          Everything you need to understand noise.
        </h2>
        <div className="landing__features-grid">
          {features.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="landing__feature-card glass-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="feature-card__icon">{icon}</div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="landing__banner glass-card">
        <div>
          <h2 className="landing__banner-title">Ready to explore Honk Analytics?</h2>
          <p className="landing__banner-sub">Live dashboards. Real data. Zero configuration needed.</p>
        </div>
        <button
          className="landing__cta-btn"
          onClick={() => navigate("/dashboard")}
        >
          See Honk Statistics →
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <span>🔊 HonkAnalytics</span>
        <span>Built with MERN Stack · Made in India 🇮🇳</span>
      </footer>

    </div>
  );
}

export default LandingPage;
