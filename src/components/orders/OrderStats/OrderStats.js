import React from 'react';
import './OrderStats.css';

const OrderStats = ({ loading = false }) => {
  const stats = {
    pedidosRecientes: { 
      value: '156', 
      change: '+12 (24h)', 
      changeType: 'positive',
      label: 'Pedidos Nuevos'
    },
    enProceso: { 
      value: '234', 
      change: '+18', 
      changeType: 'neutral',
      label: 'En Proceso'
    },
    entregados: { 
      value: '1,847', 
      change: '+89 (7d)', 
      changeType: 'positive',
      label: 'Entregados'
    },
    cancelados: { 
      value: '47', 
      change: '+3 (24h)', 
      changeType: 'negative',
      label: 'Cancelados'
    }
  };

  if (loading) {
    return (
      <div className="order-stats">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="stat-card skeleton">
            <div className="stat-content">
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="order-stats">
      {Object.entries(stats).map(([key, stat]) => (
        <div key={key} className="stat-card">
          <div className="stat-content">
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStats;