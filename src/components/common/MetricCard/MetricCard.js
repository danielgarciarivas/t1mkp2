import React from 'react';
import './MetricCard.css';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="metric-card skeleton">
        <div className="metric-icon-skeleton"></div>
        <div className="metric-info">
          <div className="metric-title-skeleton"></div>
          <div className="metric-value-skeleton"></div>
          <div className="metric-change-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="metric-card">
      <div className="metric-icon">
        {icon}
      </div>
      <div className="metric-info">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-value">{value}</div>
        {change && (
          <div className={`metric-change ${changeType}`}>
            {changeType === 'positive' && '↗'}
            {changeType === 'negative' && '↘'}
            {changeType === 'neutral' && '→'}
            {change}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;