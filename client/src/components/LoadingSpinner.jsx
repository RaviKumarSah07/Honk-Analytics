import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ message = "Loading data..." }) => (
  <div className="spinner-wrap">
    <div className="spinner" />
    <p className="spinner-text">{message}</p>
  </div>
);

export default LoadingSpinner;
