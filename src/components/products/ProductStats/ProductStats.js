import React from 'react';
import MetricCard from '../../common/MetricCard';
import './ProductStats.css';

const ProductStats = ({ loading = false, pendingOnly = false }) => {
  const stats = {
    pendientesRevision: { value: '3', change: '+2', changeType: 'neutral' },
    productosActivos: { value: '12,458', change: '+245', changeType: 'positive' },
    rechazados: { value: '156', change: '+12 (7d)', changeType: 'negative' },
    tasaAprobacion: { value: '89%', change: '+3.2%', changeType: 'positive' }
  };

  return (
    <div className="product-stats">
      <div className="stats-grid">
        <MetricCard
          title="Pendientes Revisión"
          value={stats.pendientesRevision.value}
          change={stats.pendientesRevision.change}
          changeType={stats.pendientesRevision.changeType}
          icon="⏳"
          loading={loading}
        />
        <MetricCard
          title="Productos Activos"
          value={stats.productosActivos.value}
          change={stats.productosActivos.change}
          changeType={stats.productosActivos.changeType}
          icon="✅"
          loading={loading}
        />
        <MetricCard
          title="Rechazados (7d)"
          value={stats.rechazados.value}
          change={stats.rechazados.change}
          changeType={stats.rechazados.changeType}
          icon="❌"
          loading={loading}
        />
        <MetricCard
          title="Tasa Aprobación"
          value={stats.tasaAprobacion.value}
          change={stats.tasaAprobacion.change}
          changeType={stats.tasaAprobacion.changeType}
          icon="📈"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProductStats;