import React from 'react';
import './ActivityFeed.css';

const ActivityFeed = ({ activities, loading = false }) => {
  if (loading) {
    return (
      <div className="activity-feed">
        <div className="activity-feed-header">
          <h3>Actividad Reciente</h3>
        </div>
        <div className="activity-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="activity-item skeleton">
              <div className="activity-icon-skeleton"></div>
              <div className="activity-content">
                <div className="activity-title-skeleton"></div>
                <div className="activity-details-skeleton"></div>
                <div className="activity-time-skeleton"></div>
              </div>
              <div className="activity-value-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="activity-feed">
      <div className="activity-feed-header">
        <h3>Actividad Reciente</h3>
        <div className="feed-controls">
          <button className="refresh-btn" onClick={() => window.location.reload()}>
            🔄
          </button>
        </div>
      </div>
      
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className={`activity-icon ${activity.type}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="activity-content">
              <div className="activity-title">
                <span className="activity-id" onClick={() => handleViewOrder(activity.orderId)}>
                  #{activity.orderId}
                </span>
                {activity.title}
              </div>
              
              <div className="activity-details">
                <span className="product-name">{activity.productName}</span>
                {activity.seller && (
                  <>
                    <span className="separator">•</span>
                    <span className="seller-name">{activity.seller}</span>
                  </>
                )}
                {activity.marketplace && (
                  <>
                    <span className="separator">•</span>
                    <span className="marketplace-name">{activity.marketplace}</span>
                  </>
                )}
              </div>
              
              <div className="activity-time">
                {formatTimeAgo(activity.timestamp)}
              </div>
            </div>
            
            <div className="activity-value">
              <div className={`activity-amount ${activity.type}`}>
                {activity.amount}
              </div>
              <div className={`activity-status ${activity.status.toLowerCase()}`}>
                {activity.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="activity-feed-footer">
        <button 
          className="view-all-activity"
          onClick={() => window.location.href = '/pedidos'}
        >
          Ver toda la actividad
        </button>
      </div>
    </div>
  );
};

const getActivityIcon = (type) => {
  const icons = {
    order: '📦',
    validation: '✅',
    confirmation: '✅',
    shipment: '🚛',
    shipping: '📦',
    transit: '🚚',
    delivery: '✅',
    cancellation: '❌',
    return: '↩️',
    payment: '💰',
    approval: '✅',
    rejection: '❌'
  };
  return icons[type] || '📋';
};

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    return `hace ${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `hace ${diffInHours}h`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays}d`;
  }
};

const handleViewOrder = (orderId) => {
  console.log('Ver orden:', orderId);
  // Implementar navegación a detalle de orden
};

export default ActivityFeed;