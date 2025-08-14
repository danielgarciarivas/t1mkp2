import React from 'react';
import './TopPerformers.css';

const TopPerformers = ({ data, type = 'sellers', loading = false }) => {
  if (loading) {
    return (
      <div className="top-performers">
        <div className="top-performers-header">
          <h3>Top Performers</h3>
        </div>
        <div className="performers-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="performer-item skeleton">
              <div className="performer-rank-skeleton"></div>
              <div className="performer-avatar-skeleton"></div>
              <div className="performer-info">
                <div className="performer-name-skeleton"></div>
                <div className="performer-metrics-skeleton"></div>
              </div>
              <div className="performer-value-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="top-performers">
      <div className="top-performers-header">
        <h3>Top {type === 'sellers' ? 'Sellers' : 'Productos'}</h3>
        <button className="view-all-btn">Ver todos</button>
      </div>
      
      <div className="performers-list">
        {data.map((item, index) => (
          <div key={item.id} className="performer-item">
            <div className={`performer-rank rank-${index + 1}`}>
              #{index + 1}
            </div>
            
            <div className="performer-avatar">
              {type === 'sellers' ? '🏪' : '📦'}
            </div>
            
            <div className="performer-info">
              <div className="performer-name">{item.name}</div>
              <div className="performer-metrics">
                {type === 'sellers' ? (
                  <span>Rating: {item.rating} • ODR: {item.odr}%</span>
                ) : (
                  <span>Categoría: {item.category}</span>
                )}
              </div>
            </div>
            
            <div className="performer-value">
              <div className="value-amount">{item.value}</div>
              {item.growth && (
                <div className={`value-growth ${item.growth > 0 ? 'positive' : 'negative'}`}>
                  {item.growth > 0 ? '+' : ''}{item.growth}%
                </div>
              )}
            </div>
            
            <button className="performer-action" onClick={() => handleViewDetails(item.id)}>
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const handleViewDetails = (id) => {
  console.log('Ver detalles de:', id);
  // Implementar navegación a detalle
};

export default TopPerformers;