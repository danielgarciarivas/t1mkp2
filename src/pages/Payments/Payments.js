import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import MetricCard from '../../components/common/MetricCard';
import PaymentTable from '../../components/payments/PaymentTable';
import PaymentConfig from '../../components/payments/PaymentConfig';
import LiquidationModal from '../../components/payments/LiquidationModal';
import TransactionDetailsModal from '../../components/payments/TransactionDetailsModal';
import ConfirmationModal from '../../components/payments/ConfirmationModal';
import './Payments.css';

const Payments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLiquidationModal, setShowLiquidationModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedLiquidation, setSelectedLiquidation] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [liquidationConfig, setLiquidationConfig] = useState({
    frequency: 'each_10_days', // cada_10_dias, quincenal, mensual
    minimumAmount: 1000,
    retentionDays: 3,
    mode: 'automatic' // automatic, manual
  });
  
  // Estados para filtros
  const [selectedSeller, setSelectedSeller] = useState('all');
  const [sellerOptions, setSellerOptions] = useState([]);
  
  // Datos del dashboard de pagos
  const [paymentMetrics, setPaymentMetrics] = useState({
    pendingToLiquidate: { value: '$847K', description: 'Por Liquidar' },
    lastLiquidation: { value: '12 Ago', description: 'Última Liquidación' },
    pendingLiquidations: { value: '147', description: 'Liquidaciones Pendientes' }
  });

  // Liquidaciones pendientes
  const [pendingLiquidations, setPendingLiquidations] = useState([]);
  const [liquidationHistory, setLiquidationHistory] = useState([]);
  const [marketplaceBankConfig, setMarketplaceBankConfig] = useState(null);

  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    setLoading(true);
    
    // Simular carga de datos de pagos
    setTimeout(() => {
      // Cargar opciones de sellers
      const mockSellerOptions = [
        { value: 'all', label: 'Todos los Sellers' },
        { value: '1', label: 'TechnoMax SA' },
        { value: '2', label: 'HomeStyle México' },
        { value: '3', label: 'FashionHub' },
        { value: '4', label: 'Beauty Corner' },
        { value: '5', label: 'Sports World' }
      ];
      setSellerOptions(mockSellerOptions);
      // Datos de liquidaciones pendientes
      const mockPendingLiquidations = [
        {
          id: 1,
          sellerId: 1,
          sellerName: 'TechnoMax SA',
          orderCount: 45,
          grossSales: 124500,
          marketplaceCommission: 12450, // 10%
          t1Commission: 1370, // 1.1%
          adjustments: 125, // Reembolsos
          netToLiquidate: 110805,
          scheduledDate: '2025-08-12',
          status: 'pending',
          cycleStart: '2025-08-01',
          cycleEnd: '2025-08-10',
          transactions: [
            { id: 'ORD-001', date: '2025-08-02', amount: 32500, commission: 3250 },
            { id: 'ORD-002', date: '2025-08-03', amount: 28900, commission: 2890 },
            { id: 'ORD-003', date: '2025-08-05', amount: 41200, commission: 4120 },
            { id: 'ORD-004', date: '2025-08-07', amount: 21900, commission: 2190 }
          ]
        },
        {
          id: 2,
          sellerId: 2,
          sellerName: 'HomeStyle México',
          orderCount: 32,
          grossSales: 89200,
          marketplaceCommission: 8920,
          t1Commission: 981,
          adjustments: 695, // Devoluciones
          netToLiquidate: 77604,
          scheduledDate: '2025-08-12',
          status: 'pending',
          cycleStart: '2025-08-01',
          cycleEnd: '2025-08-10',
          transactions: [
            { id: 'ORD-005', date: '2025-08-01', amount: 25600, commission: 2560 },
            { id: 'ORD-006', date: '2025-08-04', amount: 31800, commission: 3180 },
            { id: 'ORD-007', date: '2025-08-06', amount: 31800, commission: 3180 }
          ]
        },
        {
          id: 3,
          sellerId: 3,
          sellerName: 'FashionHub',
          orderCount: 28,
          grossSales: 67800,
          marketplaceCommission: 6780,
          t1Commission: 746,
          adjustments: 288,
          netToLiquidate: 58986,
          scheduledDate: '2025-08-13',
          status: 'pending',
          cycleStart: '2025-08-01',
          cycleEnd: '2025-08-10',
          transactions: [
            { id: 'ORD-008', date: '2025-08-02', amount: 22400, commission: 2240 },
            { id: 'ORD-009', date: '2025-08-05', amount: 25200, commission: 2520 },
            { id: 'ORD-010', date: '2025-08-08', amount: 20200, commission: 2020 }
          ]
        }
      ];

      // Historial de liquidaciones
      const mockLiquidationHistory = [
        {
          id: 101,
          sellerId: 1,
          sellerName: 'TechnoMax SA',
          orderCount: 52,
          grossSales: 156000,
          netLiquidated: 139230,
          processedDate: '2025-08-01',
          status: 'completed',
          transactionId: 'TXN-202508-001',
          cycleStart: '2025-07-21',
          cycleEnd: '2025-07-31',
          deliveryMethod: 'file',
          fileUrl: 'https://marketplace.com/downloads/liquidacion_TXN-202508-001.txt',
          fileName: 'liquidacion_TXN-202508-001.txt',
          transactions: [
            { id: 'ORD-021', date: '2025-07-22', amount: 42000, commission: 4200 },
            { id: 'ORD-022', date: '2025-07-25', amount: 38500, commission: 3850 },
            { id: 'ORD-023', date: '2025-07-28', amount: 41000, commission: 4100 },
            { id: 'ORD-024', date: '2025-07-30', amount: 34500, commission: 3450 }
          ]
        },
        {
          id: 102,
          sellerId: 2,
          sellerName: 'HomeStyle México',
          orderCount: 38,
          grossSales: 95400,
          netLiquidated: 85230,
          processedDate: '2025-08-01',
          status: 'completed',
          transactionId: 'TXN-202508-002',
          cycleStart: '2025-07-21',
          cycleEnd: '2025-07-31',
          deliveryMethod: 'webhook',
          webhookRequestId: 'WHK-202508-002',
          webhookStatus: 'success',
          webhookUrl: 'https://erp.homestyle.com/api/liquidaciones',
          transactions: [
            { id: 'ORD-025', date: '2025-07-23', amount: 28900, commission: 2890 },
            { id: 'ORD-026', date: '2025-07-26', amount: 31200, commission: 3120 },
            { id: 'ORD-027', date: '2025-07-29', amount: 35300, commission: 3530 }
          ]
        }
      ];

      // Configuración bancaria del marketplace
      const mockBankConfig = {
        id: 1,
        accountName: 'SEARS OPERADORA MEXICO SA DE CV',
        bank: 'BBVA',
        clabe: '012320001252541754',
        currency: 'MXN',
        isActive: true,
        verificationStatus: 'verified',
        lastUpdated: '2025-01-15T10:30:00Z'
      };

      setPendingLiquidations(mockPendingLiquidations);
      setLiquidationHistory(mockLiquidationHistory);
      setMarketplaceBankConfig(mockBankConfig);
      setLoading(false);
    }, 1000);
  };

  const handleLiquidationAction = (action, liquidationIds) => {
    console.log(`Acción: ${action}`, liquidationIds);
    
    switch (action) {
      case 'process_selected':
        // Procesar liquidaciones seleccionadas - mostrar confirmación
        const selectedLiquidations = pendingLiquidations.filter(l => liquidationIds.includes(l.id));
        if (selectedLiquidations.length === 1) {
          setConfirmationData({
            type: 'single',
            title: 'Confirmar Procesamiento de Liquidación',
            message: `¿Está seguro de que desea procesar la liquidación del seller ${selectedLiquidations[0].sellerName}?`,
            liquidationData: selectedLiquidations,
            action: () => processLiquidations(liquidationIds),
            liquidationIds
          });
        } else {
          setConfirmationData({
            type: 'multiple',
            title: 'Confirmar Procesamiento Múltiple',
            message: `¿Está seguro de que desea procesar ${selectedLiquidations.length} liquidaciones?`,
            liquidationData: selectedLiquidations,
            action: () => processLiquidations(liquidationIds),
            liquidationIds
          });
        }
        setShowConfirmationModal(true);
        break;
      case 'process_all':
        // Procesar todas las liquidaciones pendientes - mostrar confirmación
        const allPendingIds = pendingLiquidations.map(l => l.id);
        setConfirmationData({
          type: 'all',
          title: 'Confirmar Procesamiento de Todas las Liquidaciones',
          message: `¿Está seguro de que desea procesar TODAS las liquidaciones pendientes (${pendingLiquidations.length})?`,
          liquidationData: pendingLiquidations,
          action: () => processLiquidations(allPendingIds),
          liquidationIds: allPendingIds
        });
        setShowConfirmationModal(true);
        break;
      case 'view_details':
        // Ver detalles de transacciones de una liquidación específica
        const liquidationId = liquidationIds[0];
        const liquidation = [...pendingLiquidations, ...liquidationHistory].find(l => l.id === liquidationId);
        if (liquidation) {
          setSelectedLiquidation(liquidation);
          setShowTransactionModal(true);
        }
        break;
      case 'retry_failed':
        // Reintentar liquidaciones fallidas
        retryFailedLiquidations(liquidationIds);
        break;
      default:
        break;
    }
  };

  const processLiquidations = async (liquidationIds) => {
    console.log('Procesando liquidaciones:', liquidationIds);
    
    // Simular procesamiento de liquidaciones
    const processedLiquidations = pendingLiquidations.filter(l => 
      liquidationIds.includes(l.id)
    );

    // Mover a historial y marcar como completadas
    const newHistoryEntries = processedLiquidations.map(l => {
      const timestamp = Date.now();
      const entry = {
        ...l,
        status: 'completed',
        processedDate: new Date().toISOString(),
        transactionId: `TXN-${timestamp}-${l.id}`
      };
      
      // Agregar información de envío basada en la configuración
      if (liquidationConfig.deliveryMethod === 'webhook') {
        entry.deliveryMethod = 'webhook';
        entry.webhookRequestId = `WHK-${timestamp}-${l.id}`;
        entry.webhookStatus = 'success';
        entry.webhookUrl = liquidationConfig.webhookUrl || 'https://erp.example.com/api/liquidaciones';
      } else {
        entry.deliveryMethod = 'file';
        entry.fileName = `liquidacion_TXN-${timestamp}-${l.id}.txt`;
        entry.fileUrl = `${liquidationConfig.downloadUrl || 'https://marketplace.com/downloads/'}${entry.fileName}`;
      }
      
      return entry;
    });

    setLiquidationHistory(prev => [...newHistoryEntries, ...prev]);
    setPendingLiquidations(prev => prev.filter(l => !liquidationIds.includes(l.id)));
    
    // Actualizar métricas
    setPaymentMetrics(prev => ({
      ...prev,
      pendingLiquidations: { 
        ...prev.pendingLiquidations, 
        value: String(parseInt(prev.pendingLiquidations.value) - liquidationIds.length)
      }
    }));
  };

  const retryFailedLiquidations = (liquidationIds) => {
    console.log('Reintentando liquidaciones fallidas:', liquidationIds);
    // Implementar lógica de reintento
  };

  const handleConfigSave = (newConfig) => {
    setLiquidationConfig(newConfig);
    console.log('Configuración guardada:', newConfig);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Función para filtrar liquidaciones por seller
  const getFilteredLiquidations = (liquidations) => {
    if (selectedSeller === 'all') {
      return liquidations;
    }
    return liquidations.filter(liquidation => liquidation.sellerId.toString() === selectedSeller);
  };

  // Funciones para manejar confirmación
  const handleConfirmAction = () => {
    if (confirmationData && confirmationData.action) {
      confirmationData.action();
      setShowConfirmationModal(false);
      setConfirmationData(null);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setConfirmationData(null);
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
          <h1 className="module-title">Gestión de Pagos</h1>
          <p className="module-subtitle">
            Configure cuentas bancarias y monitoree liquidaciones a sellers
          </p>
        </div>
        
        <div className="module-actions">
          <div className="seller-filter">
            <label htmlFor="seller-select">Filtrar por Seller:</label>
            <select 
              id="seller-select"
              value={selectedSeller} 
              onChange={(e) => setSelectedSeller(e.target.value)}
              className="filter-select"
            >
              {sellerOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Button 
            variant="secondary"
            onClick={() => setShowLiquidationModal(true)}
          >
            Procesar Liquidaciones
          </Button>
        </div>
      </div>

      {/* Dashboard de métricas */}
      <div className="payment-metrics">
        <div className="metrics-grid">
          <MetricCard
            title={paymentMetrics.pendingToLiquidate.description}
            value={paymentMetrics.pendingToLiquidate.value}
            icon="💰"
            loading={loading}
          />
          <MetricCard
            title={paymentMetrics.lastLiquidation.description}
            value={paymentMetrics.lastLiquidation.value}
            icon="✅"
            loading={loading}
          />
          <MetricCard
            title={paymentMetrics.pendingLiquidations.description}
            value={paymentMetrics.pendingLiquidations.value}
            icon="⏳"
            loading={loading}
          />
        </div>
      </div>

      {/* Navegación por tabs */}
      <div className="payment-tabs">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Resumen
          </button>
          <button 
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Liquidaciones Pendientes
          </button>
          <button 
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Historial
          </button>
          <button 
            className={`tab-button ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            Configuración
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-section">
              <div className="dashboard-overview">
                <h3>Resumen de Liquidaciones</h3>
                <div className="overview-stats">
                  <div className="stat-item">
                    <span className="stat-label">Total Pendiente:</span>
                    <span className="stat-value">{formatCurrency(847000)}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Sellers Activos:</span>
                    <span className="stat-value">45</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Próxima Liquidación:</span>
                    <span className="stat-value">12 Ago 2025</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Configuración:</span>
                    <span className="stat-value">
                      {liquidationConfig.frequency === 'each_10_days' ? 'Cada 10 días' :
                       liquidationConfig.frequency === 'quincenal' ? 'Quincenal' : 'Mensual'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Vista rápida de liquidaciones próximas */}
              <div className="upcoming-liquidations">
                <h4>Próximas Liquidaciones</h4>
                <div className="upcoming-list">
                  {pendingLiquidations.slice(0, 3).map(liquidation => (
                    <div key={liquidation.id} className="upcoming-item">
                      <div className="upcoming-seller">
                        <strong>{liquidation.sellerName}</strong>
                        <span>{liquidation.orderCount} pedidos</span>
                      </div>
                      <div className="upcoming-amount">
                        {formatCurrency(liquidation.netToLiquidate)}
                      </div>
                      <div className="upcoming-date">
                        {new Date(liquidation.scheduledDate).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pending' && (
            <PaymentTable
              title="Liquidaciones Pendientes"
              data={getFilteredLiquidations(pendingLiquidations)}
              type="pending"
              onAction={handleLiquidationAction}
              loading={loading}
            />
          )}

          {activeTab === 'history' && (
            <PaymentTable
              title="Historial de Liquidaciones"
              data={getFilteredLiquidations(liquidationHistory)}
              type="history"
              onAction={handleLiquidationAction}
              loading={loading}
            />
          )}

          {activeTab === 'config' && (
            <PaymentConfig
              liquidationConfig={liquidationConfig}
              marketplaceBankConfig={marketplaceBankConfig}
              onConfigSave={handleConfigSave}
              onBankConfigUpdate={setMarketplaceBankConfig}
            />
          )}
        </div>
      </div>

      {/* Modal para procesar liquidaciones */}
      {showLiquidationModal && (
        <LiquidationModal
          pendingLiquidations={pendingLiquidations}
          onProcess={processLiquidations}
          onClose={() => setShowLiquidationModal(false)}
        />
      )}

      {/* Modal para ver detalles de transacciones */}
      {showTransactionModal && (
        <TransactionDetailsModal
          liquidation={selectedLiquidation}
          isOpen={showTransactionModal}
          onClose={() => {
            setShowTransactionModal(false);
            setSelectedLiquidation(null);
          }}
        />
      )}

      {/* Modal de confirmación */}
      {showConfirmationModal && confirmationData && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title={confirmationData.title}
          message={confirmationData.message}
          liquidationData={confirmationData.liquidationData}
          liquidationConfig={liquidationConfig}
          onConfirm={handleConfirmAction}
          onClose={handleCancelConfirmation}
          confirmText="Procesar Liquidación"
          cancelText="Cancelar"
          type="warning"
        />
      )}
    </div>
  );
};

export default Payments;