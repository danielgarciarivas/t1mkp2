import React from 'react';
import MetricCard from '../../common/MetricCard';
import './SellerStats.css';

const SellerStats = ({ loading = false, pendingOnly = false }) => {
  const stats = {
    sellersTotal: { value: '342', change: '+23', changeType: 'positive' },
    pendientesAprobacion: { value: '15', change: '8 urgentes', changeType: 'neutral' },
    suspendidos: { value: '5', change: '-2', changeType: 'positive' },
    ratingPromedio: { value: '4.6', change: '+0.2', changeType: 'positive' }
  };

  return (
    <div className="seller-stats">
      <div className="stats-grid">
        <MetricCard
          title="Sellers Totales"
          value={stats.sellersTotal.value}
          change={stats.sellersTotal.change}
          changeType={stats.sellersTotal.changeType}
          icon="🏪"
          loading={loading}
        />
        <MetricCard
          title="Pendientes Aprobación"
          value={stats.pendientesAprobacion.value}
          change={stats.pendientesAprobacion.change}
          changeType={stats.pendientesAprobacion.changeType}
          icon="⏳"
          loading={loading}
        />
        <MetricCard
          title="Suspendidos/Bloqueados"
          value={stats.suspendidos.value}
          change={stats.suspendidos.change}
          changeType={stats.suspendidos.changeType}
          icon="⚠️"
          loading={loading}
        />
        <MetricCard
          title="Rating Promedio"
          value={stats.ratingPromedio.value}
          change={stats.ratingPromedio.change}
          changeType={stats.ratingPromedio.changeType}
          icon="⭐"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SellerStats;