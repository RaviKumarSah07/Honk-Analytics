import React from "react";
import "./ChartCard.css";

/**
 * ChartCard — a titled card wrapper for Recharts charts
 * Props: title, subtitle, children
 */
const ChartCard = ({ title, subtitle, children }) => {
  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
        {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
      </div>
      <div className="chart-card__body">{children}</div>
    </div>
  );
};

export default ChartCard;
