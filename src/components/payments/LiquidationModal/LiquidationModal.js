import React, { useState } from 'react';
import Button from '../../common/Button';
import './LiquidationModal.css';

const LiquidationModal = ({ 
  pendingLiquidations = [],
  onProcess,
  onClose 
}) => {
  const [selectedLiquidations, setSelectedLiquidations] = useState(pendingLiquidations.map(l => l.id));
  const [processing, setProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleToggleLiquidation = (liquidationId) => {
    setSelectedLiquidations(prev => {
      if (prev.includes(liquidationId)) {
        return prev.filter(id => id !== liquidationId);
      } else {
        return [...prev, liquidationId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedLiquidations.length === pendingLiquidations.length) {
      setSelectedLiquidations([]);
    } else {
      setSelectedLiquidations(pendingLiquidations.map(l => l.id));
    }
  };

  const getSelectedLiquidations = () => {
    return pendingLiquidations.filter(l => selectedLiquidations.includes(l.id));
  };

  const getTotalAmount = () => {
    return getSelectedLiquidations().reduce((total, liquidation) => {
      return total + liquidation.netToLiquidate;
    }, 0);
  };

  const handleProcessLiquidations = async () => {
    if (selectedLiquidations.length === 0) return;
    
    setProcessing(true);
    
    try {
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await onProcess(selectedLiquidations);
      onClose();
    } catch (error) {
      console.error('Error procesando liquidaciones:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleConfirmProcess = () => {
    setShowConfirmation(true);
  };

  const selectedLiquidationData = getSelectedLiquidations();
  const totalAmount = getTotalAmount();
  const isAllSelected = selectedLiquidations.length === pendingLiquidations.length;

  return (
    <div className="modal-overlay">
      <div className="liquidation-modal">
        <div className="modal-header">
          <h3>Procesar Liquidaciones</h3>
          <button 
            className="modal-close"
            onClick={onClose}
            disabled={processing}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {!showConfirmation ? (
            <>
              {/* Resumen */}
              <div className="liquidation-summary">
                <div className="summary-stats">
                  <div className="stat-item">
                    <span className="stat-label">Liquidaciones Disponibles:</span>
                    <span className="stat-value">{pendingLiquidations.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Seleccionadas:</span>
                    <span className="stat-value">{selectedLiquidations.length}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total a Liquidar:</span>
                    <span className="stat-value total-amount">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Controles de selección */}
              <div className="selection-controls">
                <label className="select-all-control">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  <span>Seleccionar todas las liquidaciones</span>
                </label>
              </div>

              {/* Lista de liquidaciones */}
              <div className="liquidations-list">
                <div className="list-header">
                  <h4>Liquidaciones Pendientes</h4>
                </div>
                
                <div className="liquidations-table">
                  {pendingLiquidations.map(liquidation => (
                    <div 
                      key={liquidation.id} 
                      className={`liquidation-item ${selectedLiquidations.includes(liquidation.id) ? 'selected' : ''}`}
                    >
                      <div className="liquidation-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedLiquidations.includes(liquidation.id)}
                          onChange={() => handleToggleLiquidation(liquidation.id)}
                        />
                      </div>
                      
                      <div className="liquidation-info">
                        <div className="seller-info">
                          <div className="seller-name">{liquidation.sellerName}</div>
                          <div className="seller-details">
                            {liquidation.orderCount} pedidos • {formatDate(liquidation.cycleStart)} - {formatDate(liquidation.cycleEnd)}
                          </div>
                        </div>
                        
                        <div className="financial-info">
                          <div className="financial-item">
                            <span className="financial-label">Ventas Brutas:</span>
                            <span className="financial-value">{formatCurrency(liquidation.grossSales)}</span>
                          </div>
                          <div className="financial-item">
                            <span className="financial-label">Comisiones:</span>
                            <span className="financial-value commission">
                              -{formatCurrency(liquidation.marketplaceCommission + liquidation.t1Commission)}
                            </span>
                          </div>
                          {liquidation.adjustments > 0 && (
                            <div className="financial-item">
                              <span className="financial-label">Ajustes:</span>
                              <span className="financial-value adjustment">
                                -{formatCurrency(liquidation.adjustments)}
                              </span>
                            </div>
                          )}
                          <div className="financial-item total">
                            <span className="financial-label">Neto a Liquidar:</span>
                            <span className="financial-value">{formatCurrency(liquidation.netToLiquidate)}</span>
                          </div>
                        </div>
                        
                        <div className="schedule-info">
                          <div className="schedule-date">
                            <span className="schedule-label">Programada:</span>
                            <span className="schedule-value">
                              {liquidation.frequencySource === 'individual' 
                                ? `Individual - Diario` 
                                : `Global - Semanal`}
                            </span>
                          </div>
                          <div className="schedule-next">
                            <span className="schedule-next-label">Próxima:</span>
                            <span className="schedule-next-value">{formatDate(liquidation.scheduledDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Confirmación */
            <div className="confirmation-content">
              <div className="confirmation-icon">
                <span>⚠️</span>
              </div>
              
              <div className="confirmation-message">
                <h4>Confirmar Procesamiento</h4>
                <p>
                  Está a punto de procesar <strong>{selectedLiquidations.length} liquidaciones</strong> por un total de <strong>{formatCurrency(totalAmount)}</strong>.
                </p>
                <p>
                  Las transferencias se ejecutarán a través de T1Pagos y se enviarán las notificaciones correspondientes a los sellers.
                </p>
              </div>

              <div className="confirmation-details">
                <h5>Resumen del Procesamiento:</h5>
                <div className="confirmation-stats">
                  <div className="confirmation-stat">
                    <span className="stat-label">Sellers a liquidar:</span>
                    <span className="stat-value">{selectedLiquidations.length}</span>
                  </div>
                  <div className="confirmation-stat">
                    <span className="stat-label">Monto total:</span>
                    <span className="stat-value">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="confirmation-stat">
                    <span className="stat-label">Método:</span>
                    <span className="stat-value">Transferencia SPEI</span>
                  </div>
                  <div className="confirmation-stat">
                    <span className="stat-label">Tiempo estimado:</span>
                    <span className="stat-value">2-4 horas</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {!showConfirmation ? (
            <>
              <Button 
                variant="ghost"
                onClick={onClose}
                disabled={processing}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary"
                onClick={handleConfirmProcess}
                disabled={selectedLiquidations.length === 0 || processing}
              >
                Continuar ({selectedLiquidations.length} seleccionadas)
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={() => setShowConfirmation(false)}
                disabled={processing}
              >
                Volver
              </Button>
              <Button 
                variant="success"
                onClick={handleProcessLiquidations}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="processing-spinner"></span>
                    Procesando...
                  </>
                ) : (
                  'Procesar Liquidaciones'
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiquidationModal;