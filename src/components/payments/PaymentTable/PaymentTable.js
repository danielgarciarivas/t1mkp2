import React, { useState } from 'react';
import Button from '../../common/Button';
import './PaymentTable.css';

const PaymentTable = ({ 
  title,
  data = [], 
  type = 'pending', // 'pending' | 'history'
  onAction,
  onLiquidationClick,
  loading = false 
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortField, setSortField] = useState('scheduledDate');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Solo seleccionar items que pueden ser seleccionados (pending o en_curso)
      const selectableItems = data.filter(item => 
        type === 'pending' || item.status === 'en_curso'
      );
      setSelectedItems(selectableItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

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

  const getStatusBadge = (status) => {
    const badges = {
      'en_curso': { text: 'En Curso', class: 'status-en-curso' },
      'pagada': { text: 'Pagada', class: 'status-pagada' },
      'error': { text: 'Error', class: 'status-error' }
    };
    
    return badges[status] || badges['en_curso'];
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  // Solo considerar items seleccionables para el estado de "todos seleccionados"
  const selectableItems = data.filter(item => 
    type === 'pending' || item.status === 'en_curso'
  );
  const isAllSelected = selectedItems.length === selectableItems.length && selectableItems.length > 0;
  const isPartialSelected = selectedItems.length > 0 && selectedItems.length < selectableItems.length;

  if (loading) {
    return (
      <div className="payment-table-container">
        <div className="table-header">
          <h3>{title}</h3>
        </div>
        <div className="payment-table">
          <table>
            <thead>
              <tr>
                <th>Seller</th>
                <th>Ventas</th>
                <th>Comisiones</th>
                <th>Neto a Liquidar</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(i => (
                <tr key={i} className="skeleton-row">
                  <td><div className="skeleton-cell"></div></td>
                  <td><div className="skeleton-cell"></div></td>
                  <td><div className="skeleton-cell"></div></td>
                  <td><div className="skeleton-cell"></div></td>
                  <td><div className="skeleton-cell"></div></td>
                  <td><div className="skeleton-cell"></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-table-container">
      <div className="table-header">
        <div className="table-header-left">
          <h3>{title}</h3>
          <span className="table-count">({data.length} registros)</span>
        </div>
        
        <div className="table-header-right">
          {type === 'pending' && selectedItems.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">
                {selectedItems.length} seleccionados
              </span>
              <Button 
                variant="primary" 
                size="small"
                onClick={() => onAction('process_selected', selectedItems)}
              >
                Procesar Seleccionados
              </Button>
            </div>
          )}
          
          {type === 'pending' && data.length > 0 && (
            <Button 
              variant="success"
              onClick={() => onAction('process_all', [])}
            >
              Procesar Todas las Liquidaciones
            </Button>
          )}
        </div>
      </div>

      <div className="payment-table">
        <table>
          <thead>
            <tr>
              {(type === 'pending' || type === 'unified') && (
                <th className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isPartialSelected;
                    }}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              <th 
                className="sortable-header seller-col"
                onClick={() => handleSort('sellerName')}
              >
                Seller {getSortIcon('sellerName')}
              </th>
              <th 
                className="sortable-header amount-col"
                onClick={() => handleSort('grossSales')}
              >
                Ventas {getSortIcon('grossSales')}
              </th>
              <th className="amount-col">Comisiones</th>
              <th 
                className="sortable-header amount-col"
                onClick={() => handleSort('netToLiquidate')}
              >
                Neto a Liquidar {getSortIcon('netToLiquidate')}
              </th>
              <th 
                className="sortable-header date-col"
                onClick={() => handleSort(type === 'pending' ? 'scheduledDate' : 'processedDate')}
              >
                {type === 'pending' ? 'Fecha Programada' : 'Fecha Procesada'} {getSortIcon(type === 'pending' ? 'scheduledDate' : 'processedDate')}
              </th>
              {(type === 'history' || type === 'unified') && (
                <th>Estado</th>
              )}
              <th className="actions-col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              const statusInfo = (type === 'history' || type === 'unified') ? getStatusBadge(item.status) : null;
              const totalCommissions = item.marketplaceCommission + item.t1Commission + (item.adjustments || 0);
              
              return (
                <tr key={item.id} className={`payment-row ${selectedItems.includes(item.id) ? 'selected' : ''}`}>
                  {(type === 'pending' || type === 'unified') && (
                    <td className="checkbox-col">
                      {(type === 'pending' || item.status === 'en_curso') && (
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                        />
                      )}
                    </td>
                  )}
                  
                  <td className="seller-info-col">
                    <div className="seller-info">
                      <div 
                        className="seller-name clickable" 
                        onClick={() => onLiquidationClick && onLiquidationClick(item)}
                      >
                        {item.liquidationNumber || `#${item.id}`}
                      </div>
                      <div className="seller-details">
                        <span className="seller-name-small">{item.sellerName}</span>
                        <span className="order-count">{item.orderCount} pedidos</span>
                        {type === 'pending' && (
                          <span className="cycle-period">
                            {formatDate(item.cycleStart)} - {formatDate(item.cycleEnd)}
                          </span>
                        )}
                        {type === 'history' && item.transactionId && (
                          <span className="transaction-id">
                            ID: {item.transactionId}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="amount-col">
                    <div className="amount-info">
                      <span className="amount-value">{formatCurrency(item.grossSales)}</span>
                    </div>
                  </td>
                  
                  <td className="amount-col">
                    <div className="commission-breakdown">
                      <div className="commission-item">
                        <span className="commission-label">Marketplace:</span>
                        <span className="commission-value">{formatCurrency(item.marketplaceCommission)}</span>
                      </div>
                      <div className="commission-item">
                        <span className="commission-label">T1:</span>
                        <span className="commission-value">{formatCurrency(item.t1Commission)}</span>
                      </div>
                      {item.adjustments > 0 && (
                        <div className="commission-item">
                          <span className="commission-label">Ajustes:</span>
                          <span className="commission-value adjustment">{formatCurrency(item.adjustments)}</span>
                        </div>
                      )}
                      <div className="commission-total">
                        <span className="commission-label">Total:</span>
                        <span className="commission-value">{formatCurrency(totalCommissions)}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="amount-col">
                    <div className="net-amount">
                      <span className="net-value">{formatCurrency(type === 'pending' ? item.netToLiquidate : item.netLiquidated)}</span>
                    </div>
                  </td>
                  
                  <td className="date-col">
                    <div className="date-info">
                      <span className="date-value">
                        {formatDate(type === 'pending' ? item.scheduledDate : item.processedDate)}
                      </span>
                    </div>
                  </td>
                  
                  {(type === 'history' || type === 'unified') && (
                    <td>
                      <div className="status-container">
                        <span className={`status-badge ${statusInfo.class}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </td>
                  )}
                  
                  <td className="actions-col">
                    <div className="action-buttons">
                      <Button 
                        variant="secondary"
                        size="small"
                        onClick={() => onLiquidationClick && onLiquidationClick(item)}
                      >
                        Ver Liquidación
                      </Button>
                      
                      {(type === 'pending' || (type === 'unified' && item.status === 'en_curso')) && (
                        <Button 
                          variant="primary"
                          size="small"
                          onClick={() => onAction('process_selected', [item.id])}
                        >
                          Procesar
                        </Button>
                      )}
                      
                      {((type === 'history' && item.status === 'failed') || (type === 'unified' && item.status === 'error')) && (
                        <Button 
                          variant="warning"
                          size="small"
                          onClick={() => onAction('retry_failed', [item.id])}
                        >
                          Reintentar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💰</div>
          <h3>No se encontraron liquidaciones</h3>
          <p>
            {type === 'pending' 
              ? 'No hay liquidaciones pendientes en este momento'
              : 'No hay historial de liquidaciones disponible'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;