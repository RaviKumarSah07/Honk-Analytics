import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";
import StatCard       from "../components/StatCard";
import ChartCard      from "../components/ChartCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Home.css";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const COLORS = [
  "var(--chart-1)", "var(--chart-2)", "var(--chart-3)",
  "var(--chart-4)", "var(--chart-5)", "var(--chart-6)",
];

// Use raw hex for Recharts (CSS vars don't resolve inside SVG attrs reliably)
const HEX_COLORS = ["#f97316", "#6366f1", "#06b6d4", "#10b981", "#f43f5e", "#eab308"];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="home-tooltip">
      <p className="home-tooltip__label">{label}</p>
      <p className="home-tooltip__value">{payload[0].value} honks</p>
    </div>
  );
};

// Animated count-up
const CountUp = ({ target }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!target) return;
    let val = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const t = setInterval(() => {
      val += step;
      if (val >= target) { setDisplay(target); clearInterval(t); }
      else setDisplay(val);
    }, 28);
    return () => clearInterval(t);
  }, [target]);
  return <>{display.toLocaleString()}</>;
};

function Home() {
  const [total,     setTotal]     = useState(0);
  const [locations, setLocations] = useState([]);
  const [allHonks,  setAllHonks]  = useState([]);
  const [loading,   setLoading]   = useState(true);

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
        setAllHonks(allRes.data);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const topLocation  = useMemo(() =>
    [...locations].sort((a, b) => b.count - a.count)[0] || null,
  [locations]);

  const uniqueVehicles = useMemo(() =>
    new Set(allHonks.map(h => h.vehicleID)).size,
  [allHonks]);

  if (loading) return <LoadingSpinner message="Loading overview..." />;

  return (
    <div className="home page-container">

      {/* ── Header ── */}
      <div className="home__header anim-1">
        <div>
          <p className="section-label">Overview</p>
          <h1 className="home__title">Honk Analytics</h1>
          <p className="home__subtitle">Real-time noise intelligence across Indian cities</p>
        </div>
        <div className="home__live-badge">
          <span className="live-dot" /> Live · refreshes every 5s
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="home__stats anim-2">
        <StatCard
          title="Total Honks"
          value={<CountUp target={total} />}
          subtitle="All time recorded"
          icon="📢"
          accent="#f97316"
        />
        <StatCard
          title="Locations"
          value={locations.length}
          subtitle="Unique zones tracked"
          icon="📍"
          accent="#6366f1"
        />
        <StatCard
          title="Unique Vehicles"
          value={<CountUp target={uniqueVehicles} />}
          subtitle="Active contributors"
          icon="🚗"
          accent="#06b6d4"
        />
        <StatCard
          title="Noisiest Zone"
          value={topLocation?.location ?? "—"}
          subtitle={`${(topLocation?.count ?? 0).toLocaleString()} honks`}
          icon="🔥"
          accent="#10b981"
        />
      </div>

      {/* ── Charts ── */}
      <div className="home__charts anim-3">
        <ChartCard
          title="Honks by Location"
          subtitle="Which zones are loudest right now?"
          badge="Live"
        >
          <ResponsiveContainer width="100%" height={268}>
            <BarChart data={locations} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <XAxis
                dataKey="location"
                tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                tickLine={false} axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                tickLine={false} axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(249,115,22,0.06)" }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={42}>
                {locations.map((_, i) => (
                  <Cell key={i} fill={HEX_COLORS[i % HEX_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Location Share"
          subtitle="Proportional noise distribution"
        >
          <ResponsiveContainer width="100%" height={268}>
            <PieChart>
              <Pie
                data={locations}
                dataKey="count"
                nameKey="location"
                cx="50%" cy="50%"
                innerRadius={62}
                outerRadius={100}
                paddingAngle={3}
              >
                {locations.map((_, i) => (
                  <Cell key={i} fill={HEX_COLORS[i % HEX_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Leaderboard ── */}
      {locations.length > 0 && (
        <div className="home__leaderboard glass-card anim-4">
          <h3 className="home__leaderboard-title">📍 Location Leaderboard</h3>
          <div className="leaderboard__list">
            {[...locations]
              .sort((a, b) => b.count - a.count)
              .map((item, i) => {
                const max = Math.max(...locations.map(l => l.count), 1);
                const pct = Math.round((item.count / max) * 100);
                return (
                  <div className="leaderboard__row" key={item.location}>
                    <span className="leaderboard__rank">#{i + 1}</span>
                    <span className="leaderboard__name">{item.location}</span>
                    <div className="leaderboard__bar-wrap">
                      <div
                        className="leaderboard__bar-fill"
                        style={{ width: `${pct}%`, background: HEX_COLORS[i % HEX_COLORS.length] }}
                      />
                    </div>
                    <span className="leaderboard__count">{item.count.toLocaleString()}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <footer className="home__footer">
        <span className="live-dot" />
        Auto-refreshing every 5 seconds &nbsp;·&nbsp; MERN Stack
      </footer>
    </div>
  );
}

export default Home;
