import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import './LiquidationDetail.css';

const LiquidationDetail = () => {
  const { liquidationNumber, sellerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [liquidation, setLiquidation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const sellerName = location.state?.sellerName;

  useEffect(() => {
    loadLiquidationDetail();
  }, [liquidationNumber, sellerId]);

  const loadLiquidationDetail = async () => {
    setLoading(true);
    
    // Simular carga del detalle de liquidación
    setTimeout(() => {
      const mockLiquidation = {
        id: parseInt(sellerId) || 1,
        liquidationNumber: liquidationNumber,
        sellerId: parseInt(sellerId) || 1,
        sellerName: sellerName || 'TechnoMax SA',
        status: 'processed',
        totalAmount: 337221,
        processedDate: '01 Ago - 31 Ago 2025',
        paymentMethod: 'Transferencia Bancaria',
        accountInfo: 'Cuenta Fondeadora BBVA •••• 5678',
        timeline: {
          liquidationGenerated: {
            status: 'completed',
            description: 'Liquidación generada con 45 pedidos del período',
            timestamp: '11 Ago 2025 - 09:00 AM'
          },
          ordersValidated: {
            status: 'completed', 
            description: 'Todos los pedidos validados y en estado "Entregado"',
            timestamp: '11 Ago 2025 - 08:30 AM'
          },
          periodClosed: {
            status: 'completed',
            description: 'Período de liquidación cerrado',
            timestamp: '10 Ago 2025 - 11:59 PM'
          }
        },
        orders: [
          {
            id: 'ORD-001',
            date: '2025-08-02',
            productName: 'iPhone 15 Pro Max 256GB',
            quantity: 1,
            unitPrice: 32500,
            totalAmount: 32500,
            commission: 3250,
            netAmount: 29250,
            status: 'Entregado'
          },
          {
            id: 'ORD-002',
            date: '2025-08-03',
            productName: 'MacBook Air M2 13" 512GB',
            quantity: 1,
            unitPrice: 28900,
            totalAmount: 28900,
            commission: 2890,
            netAmount: 26010,
            status: 'Entregado'
          },
          {
            id: 'ORD-003',
            date: '2025-08-05',
            productName: 'iPad Pro 11" M4 1TB',
            quantity: 2,
            unitPrice: 20600,
            totalAmount: 41200,
            commission: 4120,
            netAmount: 37080,
            status: 'Entregado'
          },
          {
            id: 'ORD-004',
            date: '2025-08-07',
            productName: 'Apple Watch Ultra 2',
            quantity: 1,
            unitPrice: 21900,
            totalAmount: 21900,
            commission: 2190,
            netAmount: 19710,
            status: 'Entregado'
          },
          {
            id: 'ORD-005',
            date: '2025-08-04',
            productName: 'AirPods Pro 2',
            quantity: 3,
            unitPrice: 4990,
            totalAmount: 14970,
            commission: 1497,
            netAmount: 13473,
            status: 'Entregado'
          },
          {
            id: 'ORD-006',
            date: '2025-08-06',
            productName: 'Magic Keyboard',
            quantity: 1,
            unitPrice: 3290,
            totalAmount: 3290,
            commission: 329,
            netAmount: 2961,
            status: 'Entregado'
          },
          {
            id: 'ORD-007',
            date: '2025-08-08',
            productName: 'iPhone 15 Pro 128GB',
            quantity: 2,
            unitPrice: 27990,
            totalAmount: 55980,
            commission: 5598,
            netAmount: 50382,
            status: 'Entregado'
          },
          {
            id: 'ORD-008',
            date: '2025-08-09',
            productName: 'iPad Air 5',
            quantity: 1,
            unitPrice: 18990,
            totalAmount: 18990,
            commission: 1899,
            netAmount: 17091,
            status: 'Entregado'
          },
          {
            id: 'ORD-009',
            date: '2025-08-01',
            productName: 'MacBook Pro 14" M3',
            quantity: 1,
            unitPrice: 45990,
            totalAmount: 45990,
            commission: 4599,
            netAmount: 41391,
            status: 'Entregado'
          },
          {
            id: 'ORD-010',
            date: '2025-08-10',
            productName: 'Apple TV 4K',
            quantity: 2,
            unitPrice: 4490,
            totalAmount: 8980,
            commission: 898,
            netAmount: 8082,
            status: 'Entregado'
          },
          {
            id: 'ORD-011',
            date: '2025-08-11',
            productName: 'HomePod mini',
            quantity: 4,
            unitPrice: 2490,
            totalAmount: 9960,
            commission: 996,
            netAmount: 8964,
            status: 'Entregado'
          },
          {
            id: 'ORD-012',
            date: '2025-08-12',
            productName: 'iPhone 14 Plus',
            quantity: 1,
            unitPrice: 24990,
            totalAmount: 24990,
            commission: 2499,
            netAmount: 22491,
            status: 'Entregado'
          },
          {
            id: 'ORD-013',
            date: '2025-08-13',
            productName: 'Apple Pencil 2',
            quantity: 3,
            unitPrice: 3490,
            totalAmount: 10470,
            commission: 1047,
            netAmount: 9423,
            status: 'Entregado'
          },
          {
            id: 'ORD-014',
            date: '2025-08-14',
            productName: 'MagSafe Charger',
            quantity: 5,
            unitPrice: 1290,
            totalAmount: 6450,
            commission: 645,
            netAmount: 5805,
            status: 'Entregado'
          },
          {
            id: 'ORD-015',
            date: '2025-08-15',
            productName: 'iPhone 13',
            quantity: 1,
            unitPrice: 19990,
            totalAmount: 19990,
            commission: 1999,
            netAmount: 17991,
            status: 'Entregado'
          }
        ],
        summary: {
          grossSales: 374690,
          marketplaceCommission: 37469,
          guidesCommission: 18500,
          adjustments: 0,
          netToLiquidate: 337221
        }
      };
      
      setLiquidation(mockLiquidation);
      setLoading(false);
    }, 1000);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const handleDownloadLiquidation = () => {
    // Simular descarga de archivo ZIP
    const fileName = `liquidacion_${liquidationNumber}_seller_${sellerId}.zip`;
    console.log(`Descargando archivo: ${fileName}`);
    // Aquí iría la lógica real de descarga
    alert(`Descargando ${fileName}`);
  };

  // Paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = liquidation?.orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((liquidation?.orders?.length || 0) / ordersPerPage);

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

  if (!liquidation) {
    return (
      <div className="module">
        <div className="error-container">
          <h2>Liquidación no encontrada</h2>
          <p>No se pudo encontrar la liquidación {liquidationNumber}</p>
          <Button onClick={() => navigate(`/liquidaciones/${liquidationNumber}/sellers`)}>
            Volver a Sellers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      {/* Header */}
      <div className="liquidation-header">
        <div className="header-content">
          <button 
            onClick={() => navigate(`/liquidaciones/${liquidationNumber}/sellers`)}
            className="btn btn--secondary btn--small back-button"
          >
            ← Volver a Sellers - {liquidation.liquidationNumber}
          </button>
          <div className="header-status">
            <span className="status-badge status-processed">En curso</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="liquidation-content">
        {/* Total Amount */}
        <div className="total-section">
          <div className="total-label">Total</div>
          <div className="total-amount">{formatPrice(liquidation.totalAmount)}</div>
          <div className="period-info">
            <span>Período: {liquidation.processedDate}</span>
            <span className="payment-method">
              <i className="visa-icon">🏦</i> {liquidation.accountInfo}
            </span>
          </div>
        </div>

    

        {/* Orders Details */}
        <div className="orders-section">
          <div className="section-header">
            <div className="section-title-with-actions">
              <h3>Detalle de pedidos ({liquidation.orders.length} pedidos)</h3>
                <div className="section-amount">{formatPrice(liquidation.summary.grossSales)}</div>
              <Button 
                variant="secondary" 
                size="small"
                onClick={handleDownloadLiquidation}
              >
                Descargar Liquidacion ZIP
              </Button>
            </div>
          
          </div>
          
          <div className="orders-list">
            {currentOrders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="order-info">
                  <div className="order-id">{order.id}</div>
                  <div className="order-status">{order.status}</div>
                  <div className="order-product">{order.productName}</div>
                  <div className="order-details">
                    <span>{new Date(order.date).toLocaleDateString('es-ES')}</span>
                    <span>•</span>
                    <span>Cant: {order.quantity}</span>
                    <span>•</span>
                    <span>{formatPrice(order.unitPrice)} c/u</span>
                  </div>
                </div>
                <div className="order-amounts">
                  <div className="total-amount">{formatPrice(order.totalAmount)}</div>
                  <div className="commission-amount">- {formatPrice(order.commission)} comisión</div>
                  <div className="net-amount">{formatPrice(order.netAmount)} neto</div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-info">
                Mostrando {(currentPage - 1) * ordersPerPage + 1} - {Math.min(currentPage * ordersPerPage, liquidation.orders.length)} de {liquidation.orders.length} pedidos
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

        {/* Summary */}
        <div className="summary-section">
          <div className="section-header">
            <h3>Resumen de liquidación</h3>
          </div>
          
          <div className="summary-items">
            <div className="summary-item">
              <span className="summary-label">Ventas brutas</span>
              <span className="summary-value">{formatPrice(liquidation.summary.grossSales)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Comisión Marketplace (10%)</span>
              <span className="summary-value">- {formatPrice(liquidation.summary.marketplaceCommission)}</span>
            </div>
             <div className="summary-item">
              <span className="summary-label">Comisiones Guias (8%)</span>
              <span className="summary-value">- {formatPrice(liquidation.summary.guidesCommission)}</span>
            </div>
           
            <div className="summary-item total-item">
              <span className="summary-label">Neto a liquidar</span>
              <span className="summary-value">{formatPrice(liquidation.summary.netToLiquidate)}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="footer-note">
          Esta liquidación incluye todos los pedidos entregados (o en el estatus configurado) durante el período especificado.
        </div>
      </div>
    </div>
  );
};

export default LiquidationDetail;