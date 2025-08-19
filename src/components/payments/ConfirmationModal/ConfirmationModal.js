import React, { useState } from 'react';
import Button from '../../common/Button';
import './ConfirmationModal.css';

const ConfirmationModal = ({ 
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "default", // default, warning, danger
  liquidationData = null,
  liquidationConfig = null
}) => {
  const [processing, setProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTypeClass = () => {
    switch (type) {
      case 'warning': return 'confirmation-warning';
      case 'danger': return 'confirmation-danger';
      default: return 'confirmation-default';
    }
  };

  const handleConfirm = async () => {
    setProcessing(true);
    
    // Determinar el mensaje basado en la configuración de liquidación
    if (liquidationConfig?.deliveryMethod === 'webhook') {
      setProcessingMessage('Enviando transacciones al sistema ERP del marketplace...');
    } else {
      setProcessingMessage('Generando interfaz y enviándola...');
    }
    
    // Simular proceso de 1 segundo
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 1000);
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-content confirmation-modal ${getTypeClass()}`}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>

        <div className="modal-body">
          <div className="confirmation-message">
            {message}
          </div>

          {/* Mostrar detalles de liquidación si está disponible */}
          {liquidationData && (
            <div className="liquidation-details">
              {liquidationData.length === 1 ? (
                <div className="single-liquidation">
                  <h4>Liquidación a procesar:</h4>
                  <div className="liquidation-item">
                    <div className="seller-info">
                      <strong>{liquidationData[0].sellerName}</strong>
                      <span>{liquidationData[0].orderCount} pedidos</span>
                    </div>
                    <div className="amount-info">
                      <span className="amount">{formatCurrency(liquidationData[0].netToLiquidate)}</span>
                      <span className="date">
                        Programada: {new Date(liquidationData[0].scheduledDate).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="multiple-liquidations">
                  <h4>Liquidaciones a procesar ({liquidationData.length}):</h4>
                  <div className="liquidations-summary">
                    <div className="summary-item">
                      <span>Total Sellers:</span>
                      <span>{liquidationData.length}</span>
                    </div>
                    <div className="summary-item">
                      <span>Total Pedidos:</span>
                      <span>{liquidationData.reduce((sum, l) => sum + l.orderCount, 0)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Monto Total:</span>
                      <span className="total-amount">
                        {formatCurrency(liquidationData.reduce((sum, l) => sum + l.netToLiquidate, 0))}
                      </span>
                    </div>
                  </div>
                  
                  <div className="liquidations-list">
                    {liquidationData.slice(0, 3).map((liquidation, index) => (
                      <div key={index} className="liquidation-item small">
                        <span className="seller">{liquidation.sellerName}</span>
                        <span className="amount">{formatCurrency(liquidation.netToLiquidate)}</span>
                      </div>
                    ))}
                    {liquidationData.length > 3 && (
                      <div className="more-items">
                        +{liquidationData.length - 3} más...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {processing && (
            <div className="processing-status">
              <div className="processing-icon">⏳</div>
              <div className="processing-text">
                {processingMessage}
              </div>
              <div className="processing-spinner"></div>
            </div>
          )}
          
          {!processing && (
            <div className="confirmation-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-text">
                Esta acción iniciará el proceso de transferencia bancaria y no podrá deshacerse.
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button 
            variant={type === 'danger' ? 'danger' : 'primary'}
            onClick={handleConfirm}
            disabled={processing}
          >
            {processing ? 'Procesando...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;