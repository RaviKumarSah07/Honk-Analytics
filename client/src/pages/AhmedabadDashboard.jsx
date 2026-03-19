import React, { useMemo } from "react";
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

import useFetch        from "../hooks/useFetch";
import StatCard        from "../components/StatCard";
import ChartCard       from "../components/ChartCard";
import LoadingSpinner  from "../components/LoadingSpinner";

import "./AhmedabadDashboard.css";

// ─── Custom Tooltip for charts ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{label}</p>
        <p className="chart-tooltip__value">{payload[0].value} honks</p>
      </div>
    );
  }
  return null;
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AhmedabadDashboard = () => {
  const daily   = useFetch("/api/analytics/daily");
  const hourly  = useFetch("/api/analytics/peak-time");
  const peakDay = useFetch("/api/analytics/peak-day");

  // Compute total honks from daily data
  const totalHonks = useMemo(() => {
    if (!daily.data?.data) return null;
    return daily.data.data.reduce((sum, d) => sum + d.count, 0);
  }, [daily.data]);

  // Find peak hour label from hourly data
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
      <div className="dashboard-error">
        <span>⚠️</span>
        <p>Could not load analytics. Make sure the server is running.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <header className="dashboard__header">
        <div className="dashboard__header-left">
          <div className="dashboard__city-badge">🏙️ Ahmedabad</div>
          <h1 className="dashboard__title">Honk Analytics</h1>
          <p className="dashboard__subtitle">
            Real-time noise pollution insights · Last 14 days
          </p>
        </div>
        <div className="dashboard__live-dot">
          <span className="live-indicator" /> Live
        </div>
      </header>

      {/* ── Stat Cards ── */}
      <section className="dashboard__stats">
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
          subtitle={`${peakDay.data?.count?.toLocaleString() ?? 0} honks`}
          icon="📅"
          accent="#8b5cf6"
        />
        <StatCard
          title="Peak Hour"
          value={peakHour?.hour ?? "—"}
          subtitle={`${peakHour?.count?.toLocaleString() ?? 0} honks`}
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
      </section>

      {/* ── Charts ── */}
      <section className="dashboard__charts">

        {/* Daily Honks — Area Chart */}
        <ChartCard
          title="Honks Per Day"
          subtitle="Daily volume over the last 14 days"
        >
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={daily.data?.data || []} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="honkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                // Show only every other label to avoid crowding
                interval={1}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#f97316"
                strokeWidth={2.5}
                fill="url(#honkGradient)"
                dot={{ r: 3, fill: "#f97316", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Peak Hour Distribution — Bar Chart */}
        <ChartCard
          title="Hour-wise Distribution"
          subtitle="When does the city honk the most?"
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hourly.data?.data || []} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
                interval={2}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                maxBarSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </section>

      {/* ── Peak Day Highlight ── */}
      {peakDay.data?.peakDay && (
        <section className="dashboard__peak-highlight">
          <div className="peak-highlight__icon">🔥</div>
          <div>
            <p className="peak-highlight__label">Highest Traffic Day</p>
            <p className="peak-highlight__value">
              {peakDay.data.peakDay} — {peakDay.data.count?.toLocaleString()} honks recorded
            </p>
          </div>
        </section>
      )}

    </div>
  );
};

export default AhmedabadDashboard;
