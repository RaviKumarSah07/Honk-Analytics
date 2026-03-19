import React from "react";
import "./StatCard.css";

/**
 * StatCard — displays a single metric with a label and icon
 * Props: title, value, subtitle, icon (emoji or text), accent (CSS color)
 */
const StatCard = ({ title, value, subtitle, icon, accent = "#f97316" }) => {
  return (
    <div className="stat-card" style={{ "--accent": accent }}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <p className="stat-card__title">{title}</p>
        <h2 className="stat-card__value">{value ?? "—"}</h2>
        {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
      </div>
      <div className="stat-card__bar" />
    </div>
  );
};

export default StatCard;
