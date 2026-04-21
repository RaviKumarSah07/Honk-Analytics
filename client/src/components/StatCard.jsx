import "./StatCard.css";

/**
 * StatCard — metric display card
 * Props: title, value, subtitle, icon, accent (CSS color string)
 */
const StatCard = ({ title, value, subtitle, icon, accent = "var(--accent)" }) => {
  return (
    <div className="stat-card glass-card">
      <div className="stat-card__top">
        <p className="stat-card__title">{title}</p>
        <div className="stat-card__icon-wrap" style={{ "--card-accent": accent }}>
          <span className="stat-card__icon">{icon}</span>
        </div>
      </div>
      <h2 className="stat-card__value">{value ?? "—"}</h2>
      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
      {/* Decorative accent line */}
      <div className="stat-card__accent-line" style={{ background: accent }} />
    </div>
  );
};

export default StatCard;
