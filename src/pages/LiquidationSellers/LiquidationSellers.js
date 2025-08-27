import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './LiquidationSellers.css';

const LiquidationSellers = () => {
  const { liquidationNumber } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [liquidationData, setLiquidationData] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage] = useState(5);
  const [showConfirmPayment, setShowConfirmPayment] = useState(false);

  useEffect(() => {
    loadLiquidationSellers();
  }, [liquidationNumber]);

  const loadLiquidationSellers = async () => {
    setLoading(true);
    
    // Simular carga de datos de sellers por liquidación
    setTimeout(() => {
      const mockLiquidationData = {
        liquidationNumber: liquidationNumber,
        date: '2025-08-12',
        status: 'en_curso',
        totalSellers: 3,
        totalOrders: 105,
        totalNetToLiquidate: 252520,
        summary: {
          grossSales: 374690,
          marketplaceCommission: 37469,
          guidesCommission: 18500,
          adjustments: 0,
          netToLiquidate: 318721
        }
      };

      const mockSellers = [
        {
          sellerId: 1,
          sellerName: 'TechnoMax SA',
          orderCount: 45,
          grossSales: 124500,
          marketplaceCommission: 12450,
          adjustments: 125,
          netToLiquidate: 112055,
          status: 'en_curso'
        },
        {
          sellerId: 2,
          sellerName: 'HomeStyle México',
          orderCount: 32,
          grossSales: 89200,
          marketplaceCommission: 8920,
          adjustments: 695,
          netToLiquidate: 79699,
          status: 'en_curso'
        },
        {
          sellerId: 3,
          sellerName: 'FashionHub',
          orderCount: 28,
          grossSales: 67800,
          marketplaceCommission: 6780,
          adjustments: 288,
          netToLiquidate: 60766,
          status: 'error'
        },
        {
          sellerId: 4,
          sellerName: 'Beauty Corner',
          orderCount: 38,
          grossSales: 95600,
          marketplaceCommission: 9560,
          adjustments: 450,
          netToLiquidate: 85590,
          status: 'en_curso'
        },
        {
          sellerId: 5,
          sellerName: 'Sports World',
          orderCount: 52,
          grossSales: 143200,
          marketplaceCommission: 14320,
          adjustments: 0,
          netToLiquidate: 128880,
          status: 'en_curso'
        },
        {
          sellerId: 6,
          sellerName: 'ElectroMax',
          orderCount: 29,
          grossSales: 78900,
          marketplaceCommission: 7890,
          adjustments: 320,
          netToLiquidate: 70690,
          status: 'en_curso'
        },
        {
          sellerId: 7,
          sellerName: 'GamerZone',
          orderCount: 41,
          grossSales: 112300,
          marketplaceCommission: 11230,
          adjustments: 580,
          netToLiquidate: 100490,
          status: 'en_curso'
        },
        {
          sellerId: 8,
          sellerName: 'BookStore Plus',
          orderCount: 22,
          grossSales: 45600,
          marketplaceCommission: 4560,
          adjustments: 150,
          netToLiquidate: 40890,
          status: 'error'
        },
        {
          sellerId: 9,
          sellerName: 'PetShop Express',
          orderCount: 35,
          grossSales: 67800,
          marketplaceCommission: 6780,
          adjustments: 230,
          netToLiquidate: 60790,
          status: 'en_curso'
        },
        {
          sellerId: 10,
          sellerName: 'KitchenPro',
          orderCount: 48,
          grossSales: 134500,
          marketplaceCommission: 13450,
          adjustments: 670,
          netToLiquidate: 120380,
          status: 'en_curso'
        },
        {
          sellerId: 11,
          sellerName: 'AutoParts México',
          orderCount: 26,
          grossSales: 89400,
          marketplaceCommission: 8940,
          adjustments: 0,
          netToLiquidate: 80460,
          status: 'en_curso'
        },
        {
          sellerId: 12,
          sellerName: 'GardenCenter',
          orderCount: 33,
          grossSales: 56700,
          marketplaceCommission: 5670,
          adjustments: 340,
          netToLiquidate: 50690,
          status: 'en_curso'
        }
      ];
      
      setLiquidationData(mockLiquidationData);
      setSellers(mockSellers);
      setLoading(false);
    }, 1000);
  };

  const handleViewLiquidationDetail = (sellerId, sellerName) => {
    navigate(`/liquidaciones/${liquidationNumber}/seller/${sellerId}`, {
      state: { sellerName }
    });
  };

  const handleDownloadSellerLiquidation = (sellerId, sellerName) => {
    const fileName = `liquidacion_${liquidationNumber}_${sellerName.replace(/\s+/g, '_')}.zip`;
    console.log(`Descargando archivo: ${fileName}`);
    alert(`Descargando ${fileName}`);
  };

  const handleDownloadAllLiquidation = () => {
    const fileName = `liquidacion_completa_${liquidationNumber}.zip`;
    console.log(`Descargando archivo: ${fileName}`);
    alert(`Descargando ${fileName}`);
  };

  const handleMarkLiquidationAsPaid = () => {
    setShowConfirmPayment(true);
  };

  const confirmMarkLiquidationAsPaid = () => {
    console.log(`Marcando como pagada la liquidación ${liquidationNumber}`);
    // Aquí iría la lógica para marcar como pagada toda la liquidación
    setLiquidationData(prev => ({
      ...prev,
      status: 'pagada'
    }));
    
    // Marcar todos los sellers como pagados también
    setSellers(prev => prev.map(seller => ({
      ...seller,
      status: 'pagada'
    })));
    
    setShowConfirmPayment(false);
    alert('Liquidación completa marcada como pagada');
  };

  const handleMarkSellerAsPaid = (sellerId, sellerName) => {
    console.log(`Marcando como pagado el seller ${sellerId}`);
    // Marcar el seller específico como pagado
    setSellers(prev => prev.map(seller => 
      seller.sellerId === sellerId 
        ? { ...seller, status: 'pagada' }
        : seller
    ));
    
    // Verificar si todos los sellers están pagados
    const updatedSellers = sellers.map(seller => 
      seller.sellerId === sellerId 
        ? { ...seller, status: 'pagada' }
        : seller
    );
    
    const allPaid = updatedSellers.every(seller => seller.status === 'pagada');
    const somePaid = updatedSellers.some(seller => seller.status === 'pagada');
    
    // Actualizar el estado de la liquidación según la lógica de pagos parciales
    let newLiquidationStatus = 'en_curso';
    if (allPaid) {
      newLiquidationStatus = 'pagada';
    } else if (somePaid) {
      newLiquidationStatus = 'parcialmente_pagada';
    }
    
    setLiquidationData(prev => ({
      ...prev,
      status: newLiquidationStatus
    }));
    
    alert(`Seller ${sellerName} marcado como pagado`);
  };

  // Paginación
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellers.slice(indexOfFirstSeller, indexOfLastSeller);
  const totalPages = Math.ceil(sellers.length / sellersPerPage);

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
      'parcialmente_pagada': { label: 'Parcialmente Pagada', class: 'status-partial' },
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
          <p>Cargando detalle de liquidación...</p>
        </div>
      </div>
    );
  }

  if (!liquidationData) {
    return (
      <div className="module">
        <div className="error-container">
          <h2>Liquidación no encontrada</h2>
          <p>No se pudo encontrar la liquidación {liquidationNumber}</p>
          <Button onClick={() => navigate('/pagos')}>
            Volver a Liquidaciones
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      {/* Header */}
      <div className="liquidation-sellers-header">
        <div className="header-content">
          <button 
            onClick={() => navigate('/pagos')}
            className="btn btn--secondary btn--small back-button"
          >
            ← Volver a Liquidaciones
          </button>
          <div className="header-info">
            <h1 className="liquidation-title">{liquidationData.liquidationNumber}</h1>
            <div className="liquidation-meta">
              <span>Fecha: {formatDate(liquidationData.date)}</span>
              <span>•</span>
              <span>{liquidationData.totalSellers} sellers</span>
              <span>•</span>
              <span>{liquidationData.totalOrders} pedidos</span>
            </div>
          </div>
          <div className="header-status">
            {getStatusBadge(liquidationData.status)}
            <Button 
              variant="secondary" 
              size="small"
              onClick={handleDownloadAllLiquidation}
            >
              Descargar Liquidación Completa
            </Button>
            <Button 
              variant="primary" 
              size="small"
              onClick={handleMarkLiquidationAsPaid}
              disabled={liquidationData.status === 'pagada'}
            >
              {liquidationData.status === 'pagada' ? 'Pagada' : 'Marcar como Pagada'}
            </Button>
          </div>
        </div>
        
        {/* Summary Card */}
        <div className="liquidation-summary-card">
          <div className="summary-main">
            <div className="summary-title">
              <span className="summary-label">Total Neto a Liquidar</span>
              <span className="summary-value">{formatPrice(liquidationData.summary.netToLiquidate)}</span>
            </div>
            
            <div className="summary-details">
              <div className="detail-item">
                <span className="detail-label">Ventas Brutas:</span>
                <span className="detail-amount gross">{formatPrice(liquidationData.summary.grossSales)}</span>
              </div>
              <span className="detail-separator">•</span>
              <div className="detail-item">
                <span className="detail-label">Comisión Marketplace:</span>
                <span className="detail-amount deduction">-{formatPrice(liquidationData.summary.marketplaceCommission)}</span>
              </div>
              <span className="detail-separator">•</span>
              <div className="detail-item">
                <span className="detail-label">Cobro x envío:</span>
                <span className="detail-amount deduction">-{formatPrice(liquidationData.summary.guidesCommission)}</span>
              </div>
              {liquidationData.summary.adjustments !== 0 && (
                <>
                  <span className="detail-separator">•</span>
                  <div className="detail-item">
                    <span className="detail-label">Ajustes:</span>
                    <span className={`detail-amount ${liquidationData.summary.adjustments > 0 ? 'positive' : 'negative'}`}>
                      {liquidationData.summary.adjustments > 0 ? '+' : ''}{formatPrice(liquidationData.summary.adjustments)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="sellers-content">
        <div className="sellers-table-container">
          <div className="table-header">
            <h2>Sellers en esta Liquidación</h2>
          </div>
          
          <div className="sellers-table">
            <div className="table-header-row">
              <div className="table-header-cell">Seller</div>
              <div className="table-header-cell">Pedidos</div>
              <div className="table-header-cell">Ventas Brutas</div>
              <div className="table-header-cell">Comisiones</div>
              <div className="table-header-cell">Neto a Liquidar</div>
              <div className="table-header-cell">Acciones</div>
            </div>
            
            {currentSellers.map((seller) => (
              <div key={seller.sellerId} className="table-row">
                <div className="table-cell">
                  <div className="seller-info">
                    <span className="seller-name">{seller.sellerName}</span>
                    <span className="seller-id">ID: {seller.sellerId}</span>
                  </div>
                </div>
                <div className="table-cell">
                  <span className="order-count">{seller.orderCount}</span>
                </div>
                <div className="table-cell">
                  <span className="gross-sales">{formatPrice(seller.grossSales)}</span>
                </div>
                <div className="table-cell">
                  <span className="commission-amount">{formatPrice(seller.marketplaceCommission)}</span>
                </div>
                <div className="table-cell">
                  <span className="net-amount">{formatPrice(seller.netToLiquidate)}</span>
                </div>
                <div className="table-cell">
                  <div className="action-buttons">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleViewLiquidationDetail(seller.sellerId, seller.sellerName)}
                    >
                      Ver Detalle
                    </Button>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => handleDownloadSellerLiquidation(seller.sellerId, seller.sellerName)}
                    >
                       Descargar
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => handleMarkSellerAsPaid(seller.sellerId, seller.sellerName)}
                      disabled={seller.status === 'pagada'}
                    >
                      {seller.status === 'pagada' ? 'Pagada' : 'Marcar Pagada'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Paginación */}
            {!loading && totalPages > 1 && (
              <div className="pagination">
                <div className="pagination-info">
                  Mostrando {(currentPage - 1) * sellersPerPage + 1} - {Math.min(currentPage * sellersPerPage, sellers.length)} de {sellers.length} sellers
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

      {/* Confirmation Modal */}
      {showConfirmPayment && (
        <div className="modal-overlay" onClick={() => setShowConfirmPayment(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirmar Pago de Liquidación</h3>
              <button 
                className="modal-close"
                onClick={() => setShowConfirmPayment(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que quieres marcar como pagada toda la liquidación <strong>{liquidationData.liquidationNumber}</strong>?</p>
              <p>Total a liquidar: <strong>{formatPrice(liquidationData.summary.netToLiquidate)}</strong></p>
              <p>Esto marcará como pagados todos los sellers de esta liquidación.</p>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowConfirmPayment(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmMarkLiquidationAsPaid}
              >
                Confirmar Pago Completo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiquidationSellers;