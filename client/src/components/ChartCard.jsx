import "./ChartCard.css";

/**
 * ChartCard — titled glass card wrapping Recharts
 * Props: title, subtitle, children, badge (optional label)
 */
const ChartCard = ({ title, subtitle, badge, children }) => {
  return (
    <div className="chart-card glass-card">
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">{title}</h3>
          {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
        </div>
        {badge && <span className="chart-card__badge">{badge}</span>}
      </div>
      <div className="chart-card__body">{children}</div>
    </div>
  );
};

export default ChartCard;
