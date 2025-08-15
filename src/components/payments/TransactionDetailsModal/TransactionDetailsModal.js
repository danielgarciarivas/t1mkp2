import React from 'react';
import Button from '../../common/Button';
import './TransactionDetailsModal.css';

const TransactionDetailsModal = ({ 
  liquidation, 
  onClose,
  isOpen 
}) => {
  if (!isOpen || !liquidation) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const totalTransactions = liquidation.transactions?.reduce((sum, tx) => sum + tx.amount, 0) || 0;
  const totalCommissions = liquidation.transactions?.reduce((sum, tx) => sum + tx.commission, 0) || 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content transaction-details-modal">
        <div className="modal-header">
          <h2>Detalles de Transacciones</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {/* Información del seller y liquidación */}
          <div className="liquidation-summary">
            <div className="summary-item">
              <label>Seller:</label>
              <span>{liquidation.sellerName}</span>
            </div>
            <div className="summary-item">
              <label>Período:</label>
              <span>
                {formatDate(liquidation.cycleStart)} - {formatDate(liquidation.cycleEnd)}
              </span>
            </div>
            <div className="summary-item">
              <label>Total de Pedidos:</label>
              <span>{liquidation.orderCount}</span>
            </div>
            <div className="summary-item">
              <label>Monto a Liquidar:</label>
              <span className="amount-highlight">
                {formatCurrency(liquidation.netToLiquidate || liquidation.netLiquidated)}
              </span>
            </div>
          </div>

          {/* Tabla de transacciones */}
          <div className="transactions-section">
            <h3>Transacciones Detalladas</h3>
            
            {liquidation.transactions && liquidation.transactions.length > 0 ? (
              <>
                <div className="transactions-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Monto Bruto</th>
                        <th>Comisión</th>
                        <th>Monto Neto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liquidation.transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td className="order-id">{transaction.id}</td>
                          <td>{formatDate(transaction.date)}</td>
                          <td>{formatCurrency(transaction.amount)}</td>
                          <td className="commission">
                            -{formatCurrency(transaction.commission)}
                          </td>
                          <td className="net-amount">
                            {formatCurrency(transaction.amount - transaction.commission)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Resumen de totales */}
                <div className="transactions-summary">
                  <div className="summary-row">
                    <span>Total Transacciones:</span>
                    <span>{formatCurrency(totalTransactions)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Total Comisiones:</span>
                    <span className="commission">-{formatCurrency(totalCommissions)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Neto:</span>
                    <span>{formatCurrency(totalTransactions - totalCommissions)}</span>
                  </div>
                  
                  {/* Verificación de concordancia */}
                  <div className="verification-note">
                    <span className="verification-label">
                      {Math.abs((totalTransactions - totalCommissions) - (liquidation.netToLiquidate || liquidation.netLiquidated)) < 1
                        ? "✅ Los montos concuerdan"
                        : "⚠️ Diferencia detectada en los montos"
                      }
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-transactions">
                <p>No hay transacciones detalladas disponibles para esta liquidación.</p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;