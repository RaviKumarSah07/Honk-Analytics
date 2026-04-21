import { useMemo } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import useFetch       from "../hooks/useFetch";
import StatCard       from "../components/StatCard";
import ChartCard      from "../components/ChartCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "./AhmedabadDashboard.css";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="ahm-tooltip">
      <p className="ahm-tooltip__label">{label}</p>
      <p className="ahm-tooltip__value">{payload[0].value} honks</p>
    </div>
  );
};

function AhmedabadDashboard() {
  const daily   = useFetch("/api/analytics/daily");
  const hourly  = useFetch("/api/analytics/peak-time");
  const peakDay = useFetch("/api/analytics/peak-day");

  const totalHonks = useMemo(() =>
    daily.data?.data?.reduce((s, d) => s + d.count, 0) ?? null,
  [daily.data]);

  const peakHour = useMemo(() => {
    if (!hourly.data?.data) return null;
    return hourly.data.data.reduce(
      (max, item) => (item.count > max.count ? item : max),
      { count: 0, hour: "—" }
    );
  }, [hourly.data]);

  const isLoading = daily.loading || hourly.loading || peakDay.loading;
  const hasError  = daily.error   || hourly.error   || peakDay.error;

  if (isLoading) return <LoadingSpinner message="Fetching Ahmedabad data..." />;

  if (hasError) {
    return (
      <div className="ahm-error">
        <span>⚠️</span>
        <p>Could not load analytics. Check that the server is running.</p>
      </div>
    );
  }

  return (
    <div className="ahm page-container">

      {/* ── Header ── */}
      <div className="ahm__header anim-1">
        <div>
          <div className="ahm__city-badge">🏙️ Ahmedabad · Gujarat</div>
          <h1 className="ahm__title">City Analytics</h1>
          <p className="ahm__subtitle">Last 14 days of honk data · MongoDB aggregation</p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="ahm__stats anim-2">
        <StatCard
          title="Total Honks"
          value={totalHonks?.toLocaleString()}
          subtitle="Past 14 days"
          icon="📢"
          accent="#f97316"
        />
        <StatCard
          title="Peak Day"
          value={peakDay.data?.peakDay ?? "—"}
          subtitle={`${(peakDay.data?.count ?? 0).toLocaleString()} honks`}
          icon="📅"
          accent="#6366f1"
        />
        <StatCard
          title="Peak Hour"
          value={peakHour?.hour ?? "—"}
          subtitle={`${(peakHour?.count ?? 0).toLocaleString()} honks`}
          icon="🕐"
          accent="#06b6d4"
        />
        <StatCard
          title="City"
          value="Ahmedabad"
          subtitle="Gujarat, India"
          icon="📍"
          accent="#10b981"
        />
      </div>

      {/* ── Charts ── */}
      <div className="ahm__charts anim-3">
        <ChartCard
          title="Honks Per Day"
          subtitle="Daily volume — last 14 days"
          badge="14d"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={daily.data?.data || []} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                tickLine={false} axisLine={false} interval={1}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                tickLine={false} axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(249,115,22,0.2)", strokeWidth: 1 }} />
              <Area
                type="monotone" dataKey="count"
                stroke="#f97316" strokeWidth={2}
                fill="url(#areaGrad)"
                dot={{ r: 3, fill: "#f97316", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#f97316" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Hour-wise Distribution"
          subtitle="When does the city honk the most?"
          badge="24h"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hourly.data?.data || []} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 9, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                tickLine={false} axisLine={false} interval={2}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "Outfit" }}
                tickLine={false} axisLine={false}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(99,102,241,0.08)" }} />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Peak Day Banner ── */}
      {peakDay.data?.peakDay && (
        <div className="ahm__peak-banner glass-card anim-4">
          <span className="ahm__peak-icon">🔥</span>
          <div>
            <p className="ahm__peak-label">Highest Traffic Day</p>
            <p className="ahm__peak-value">
              {peakDay.data.peakDay} &nbsp;·&nbsp; {peakDay.data.count?.toLocaleString()} honks recorded
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default AhmedabadDashboard;
