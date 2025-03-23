// components/StatCard.jsx
import React from 'react';
import Card from './Card';

const StatCard = ({ title, value, change, isPositive }) => {
  return (
    <Card className="stat-card">
      <div className="stat-card-content">
        <div className="stat-card-info">
          <div className="stat-card-value">{value}</div>
          <div className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
            {change}
            <span className="change-indicator">{isPositive ? '↑' : '↓'}</span>
          </div>
          <div className="stat-card-title">{title}</div>
        </div>
        <div className={`stat-card-icon ${isPositive ? 'positive' : 'negative'}`}>
          <span className="icon">□</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;