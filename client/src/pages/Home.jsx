import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";
import "./Home.css";

const API = "http://localhost:5000";

// ─── Colour palette for pie/bar slices ───────────────────────────────────────
const SLICE_COLORS = ["#f97316", "#8b5cf6", "#06b6d4", "#10b981", "#f43f5e", "#eab308"];

// ─── Custom dark tooltip ──────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="home-tooltip">
        <p className="home-tooltip__label">{label}</p>
        <p className="home-tooltip__value">{payload[0].value} honks</p>
      </div>
    );
  }
  return null;
};

// ─── Animated count-up number ─────────────────────────────────────────────────
const CountUp = ({ target }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <>{display.toLocaleString()}</>;
};

// ─── Home Page ────────────────────────────────────────────────────────────────
function Home() {
  const [total, setTotal]         = useState(0);
  const [locations, setLocations] = useState([]);
  const [topLocation, setTop]     = useState(null);
  const [uniqueVehicles, setUniq] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countRes, locRes, allRes] = await Promise.all([
          axios.get(`${API}/api/honks/count`),
          axios.get(`${API}/api/honks/by-location`),
          axios.get(`${API}/api/honks`),
        ]);

        setTotal(countRes.data.totalHonks);
        setLocations(locRes.data);

        // Derive top location
        const sorted = [...locRes.data].sort((a, b) => b.count - a.count);
        setTop(sorted[0] || null);

        // Count unique vehicles from full honk list
        const uniq = new Set(allRes.data.map(h => h.vehicleID)).size;
        setUniq(uniq);

      } catch (err) {
        console.error("Home fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">

      {/* ── Hero / Intro ── */}
      <section className="home__hero">
        <div className="home__hero-text">
          <span className="home__eyebrow">🔊 Real-time noise intelligence</span>
          <h1 className="home__headline">
            Every honk tells<br />
            <span className="home__headline--accent">a story.</span>
          </h1>
          <p className="home__description">
            Honk Analytics captures vehicle horn data across Indian cities in real
            time — helping urban planners, researchers, and citizens understand
            noise pollution patterns, peak traffic hours, and hotspot locations.
          </p>
          <div className="home__tags">
            <span className="tag">🏙️ Multi-city</span>
            <span className="tag">📡 Live data</span>
            <span className="tag">🚗 Vehicle tracking</span>
            <span className="tag">📊 Aggregated insights</span>
          </div>
        </div>

        {/* Live pulse graphic */}
        <div className="home__hero-visual">
          <div className="pulse-ring pulse-ring--1" />
          <div className="pulse-ring pulse-ring--2" />
          <div className="pulse-ring pulse-ring--3" />
          <div className="pulse-core">
            <span>📢</span>
          </div>
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <section className="home__stats">
        <div className="hstat-card hstat-card--orange">
          <p className="hstat-card__label">Total Honks</p>
          <h2 className="hstat-card__value">
            <CountUp target={total} />
          </h2>
          <p className="hstat-card__sub">Recorded so far</p>
        </div>

        <div className="hstat-card hstat-card--violet">
          <p className="hstat-card__label">Locations Tracked</p>
          <h2 className="hstat-card__value">
            <CountUp target={locations.length} />
          </h2>
          <p className="hstat-card__sub">Unique zones</p>
        </div>

        <div className="hstat-card hstat-card--cyan">
          <p className="hstat-card__label">Unique Vehicles</p>
          <h2 className="hstat-card__value">
            <CountUp target={uniqueVehicles} />
          </h2>
          <p className="hstat-card__sub">Active contributors</p>
        </div>

        <div className="hstat-card hstat-card--green">
          <p className="hstat-card__label">Noisiest Zone</p>
          <h2 className="hstat-card__value hstat-card__value--sm">
            {topLocation?.location ?? "—"}
          </h2>
          <p className="hstat-card__sub">{topLocation?.count ?? 0} honks</p>
        </div>
      </section>

      {/* ── Charts ── */}
      <section className="home__charts">

        {/* Bar chart — honks by location */}
        <div className="home__chart-card">
          <div className="home__chart-header">
            <h3 className="home__chart-title">Honks by Location</h3>
            <p className="home__chart-sub">Which zones are loudest right now?</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={locations} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis
                dataKey="location"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
                {locations.map((_, i) => (
                  <Cell key={i} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — share by location */}
        <div className="home__chart-card">
          <div className="home__chart-header">
            <h3 className="home__chart-title">Location Share</h3>
            <p className="home__chart-sub">Proportional noise distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={locations}
                dataKey="count"
                nameKey="location"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {locations.map((_, i) => (
                  <Cell key={i} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "12px", color: "#6b7280" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </section>

      {/* ── Location leaderboard ── */}
      {locations.length > 0 && (
        <section className="home__leaderboard">
          <h3 className="home__leaderboard-title">📍 Location Leaderboard</h3>
          <div className="leaderboard__list">
            {[...locations]
              .sort((a, b) => b.count - a.count)
              .map((item, i) => {
                const maxCount = locations.reduce((m, l) => Math.max(m, l.count), 1);
                const pct = Math.round((item.count / maxCount) * 100);
                return (
                  <div className="leaderboard__row" key={item.location}>
                    <span className="leaderboard__rank">#{i + 1}</span>
                    <span className="leaderboard__name">{item.location}</span>
                    <div className="leaderboard__bar-wrap">
                      <div
                        className="leaderboard__bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: SLICE_COLORS[i % SLICE_COLORS.length],
                        }}
                      />
                    </div>
                    <span className="leaderboard__count">{item.count.toLocaleString()}</span>
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* ── Footer note ── */}
      <footer className="home__footer">
        <span className="live-dot" /> Data refreshes every 5 seconds &nbsp;·&nbsp; Built with MERN Stack
      </footer>

    </div>
  );
}

export default Home;
