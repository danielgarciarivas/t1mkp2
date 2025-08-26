import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Button from '../../components/common/Button';
import MetricCard from '../../components/common/MetricCard';
import './Payments.css';

const Payments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [liquidationsPerPage] = useState(5);
  
  // Estados para filtros
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [statusOptions] = useState([
    { value: 'all', label: 'Todos los Estados' },
    { value: 'en_curso', label: 'En Curso' },
    { value: 'pagada', label: 'Pagada' },
    { value: 'error', label: 'Error' },
    { value: 'vencida', label: 'Vencida' }
  ]);
  
  // Datos del dashboard de liquidaciones
  const [liquidationMetrics, setLiquidationMetrics] = useState({
    totalLiquidations: { value: '23', description: 'Total de Liquidaciones' },
    pendingLiquidations: { value: '5', description: 'Liquidaciones Pendientes' },
    completedLiquidations: { value: '18', description: 'Liquidaciones Completadas' }
  });

  // Liquidaciones resumidas para la pantalla principal
  const [liquidationSummaries, setLiquidationSummaries] = useState([]);

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    setLoading(true);
    
    // Simular carga de datos de liquidaciones resumidas
    setTimeout(() => {
      // Datos de resumen de liquidaciones para la pantalla principal
      const mockLiquidationSummaries = [
        {
          liquidationNumber: 'LIQ-000001',
          date: '2025-08-12',
          sellerCount: 3,
          orderCount: 105,
          status: 'en_curso',
          netToLiquidate: 249145
        },
        {
          liquidationNumber: 'LIQ-000002',
          date: '2025-08-11',
          sellerCount: 2,
          orderCount: 67,
          status: 'en_curso',
          netToLiquidate: 189159
        },
        {
          liquidationNumber: 'LIQ-202508-003',
          date: '2025-08-05',
          sellerCount: 5,
          orderCount: 128,
          status: 'pagada',
          netToLiquidate: 456780
        },
        {
          liquidationNumber: 'LIQ-202508-002',
          date: '2025-08-01',
          sellerCount: 2,
          orderCount: 90,
          status: 'pagada',
          netToLiquidate: 223495
        },
        {
          liquidationNumber: 'LIQ-202507-015',
          date: '2025-07-28',
          sellerCount: 4,
          orderCount: 156,
          status: 'error',
          netToLiquidate: 389245
        },
        {
          liquidationNumber: 'LIQ-202507-010',
          date: '2025-07-20',
          sellerCount: 2,
          orderCount: 78,
          status: 'vencida',
          netToLiquidate: 156890
        }
      ];

      setLiquidationSummaries(mockLiquidationSummaries);
      setLoading(false);
    }, 1000);
  };

  const handleViewLiquidation = (liquidationNumber) => {
    navigate(`/liquidaciones/${liquidationNumber}/sellers`);
  };

  const handleDownloadLiquidation = (liquidationNumber) => {
    const fileName = `liquidacion_${liquidationNumber}.zip`;
    console.log(`Descargando archivo: ${fileName}`);
    alert(`Descargando ${fileName}`);
  };


  // Función para filtrar liquidaciones por status
  const getFilteredLiquidations = () => {
    let filtered = liquidationSummaries;
    
    // Filtrar por status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(liquidation => liquidation.status === selectedStatus);
    }
    
    return filtered;
  };

  // Paginación
  const filteredLiquidations = getFilteredLiquidations();
  const indexOfLastLiquidation = currentPage * liquidationsPerPage;
  const indexOfFirstLiquidation = indexOfLastLiquidation - liquidationsPerPage;
  const currentLiquidations = filteredLiquidations.slice(indexOfFirstLiquidation, indexOfLastLiquidation);
  const totalPages = Math.ceil(filteredLiquidations.length / liquidationsPerPage);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'en_curso': { label: 'En Curso', class: 'status-pending' },
      'pagada': { label: 'Pagada', class: 'status-completed' },
      'error': { label: 'Error', class: 'status-error' },
      'vencida': { label: 'Vencida', class: 'status-expired' }
    };
    
    const config = statusConfig[status] || { label: status, class: 'status-default' };
    return (
      <span className={`status-badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando módulo de pagos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Liquidaciones</h1>
          <p className="module-subtitle">
            Gestione todas las liquidaciones del marketplace
          </p>
        </div>
        
        <div className="module-actions">
          <div className="status-filter">
            <label htmlFor="status-select">Filtrar por Estado:</label>
            <select 
              id="status-select"
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dashboard de métricas */}
      <div className="payment-metrics">
        <div className="metrics-grid">
          <MetricCard
            title={liquidationMetrics.totalLiquidations.description}
            value={liquidationMetrics.totalLiquidations.value}
            icon="📊"
            loading={loading}
          />
          <MetricCard
            title={liquidationMetrics.pendingLiquidations.description}
            value={liquidationMetrics.pendingLiquidations.value}
            icon="⏳"
            loading={loading}
          />
       
        </div>
      </div>

      {/* Tabla de liquidaciones */}
      <div className="payment-content">
        <div className="liquidation-table-container">
          <div className="table-header">
            <h2>Lista de Liquidaciones</h2>
          </div>
          
          <div className="liquidation-table">
            <div className="table-header-row">
              <div className="table-header-cell">Número de Liquidación</div>
              <div className="table-header-cell">Neto a Liquidar</div>
              <div className="table-header-cell">Sellers</div>
              <div className="table-header-cell">Pedidos</div>
              <div className="table-header-cell">Estado</div>
              <div className="table-header-cell">Fecha</div>
              <div className="table-header-cell">Acciones</div>
            </div>
            
            {loading ? (
              <div className="table-loading">
                <div className="loading-spinner"></div>
                <p>Cargando liquidaciones...</p>
              </div>
            ) : (
              currentLiquidations.map((liquidation) => (
                <div key={liquidation.liquidationNumber} className="table-row">
                  <div className="table-cell">
                    <span className="liquidation-number">{liquidation.liquidationNumber}</span>
                  </div>
                  
                   <div className="table-cell">
                    <span className="net-amount">{formatPrice(liquidation.netToLiquidate)}</span>
                  </div>
                  <div className="table-cell">
                    <span className="seller-count">{liquidation.sellerCount} sellers</span>
                  </div>
                  <div className="table-cell">
                    <span className="order-count">{liquidation.orderCount} pedidos</span>
                  </div>
                  <div className="table-cell">
                    {getStatusBadge(liquidation.status)}
                  </div>
                 <div className="table-cell">
                    {formatDate(liquidation.date)}
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleViewLiquidation(liquidation.liquidationNumber)}
                      >
                        Ver Sellers
                      </Button>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleDownloadLiquidation(liquidation.liquidationNumber)}
                      >
                        📁 ZIP
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Paginación */}
            {!loading && totalPages > 1 && (
              <div className="pagination">
                <div className="pagination-info">
                  Mostrando {(currentPage - 1) * liquidationsPerPage + 1} - {Math.min(currentPage * liquidationsPerPage, filteredLiquidations.length)} de {filteredLiquidations.length} liquidaciones
                </div>
                
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn prev"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    ← Anterior
                  </button>
                  
                  <div className="pagination-pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        if (totalPages <= 7) return true;
                        if (page === 1 || page === totalPages) return true;
                        if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                        return false;
                      })
                      .map((page, index, array) => {
                        const prevPage = array[index - 1];
                        const showEllipsis = prevPage && page - prevPage > 1;
                        
                        return (
                          <React.Fragment key={page}>
                            {showEllipsis && <span className="pagination-ellipsis">...</span>}
                            <button
                              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })
                    }
                  </div>
                  
                  <button 
                    className="pagination-btn next"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;