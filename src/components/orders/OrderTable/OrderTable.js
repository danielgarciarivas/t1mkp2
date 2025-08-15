import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderTable.css';

const OrderTable = ({ 
  orders = [], 
  loading = false, 
  onOrderAction, 
  onOrderSelect, 
  selectedOrders = [], 
  filters = {},
  onFiltersChange,
  onSearch 
}) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('fecha');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleOrderClick = (orderId) => {
    navigate(`/pedidos/${orderId}`);
  };

  const handleSelectOrder = (orderId) => {
    const newSelected = selectedOrders.includes(orderId)
      ? selectedOrders.filter(id => id !== orderId)
      : [...selectedOrders, orderId];
    onOrderSelect(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onOrderSelect(orders.map(order => order.id));
    } else {
      onOrderSelect([]);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'recibido': { text: 'Recibido', class: 'status-received' },
      'validado': { text: 'Validado', class: 'status-validated' },
      'enviado_seller': { text: 'Enviado al Seller', class: 'status-sent-seller' },
      'confirmado': { text: 'Confirmado', class: 'status-confirmed' },
      'en_proceso_envio': { text: 'En Proceso de Envío', class: 'status-shipping' },
      'en_camino': { text: 'En Camino', class: 'status-transit' },
      'entregado': { text: 'Entregado', class: 'status-delivered' },
      'cancelado': { text: 'Cancelado', class: 'status-cancelled' },
      'devuelto': { text: 'Devuelto', class: 'status-returned' }
    };
    
    return badges[status] || badges['recibido'];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    onSearch('');
  };

  if (loading) {
    return (
      <div className="order-table-container">
        <div className="table-header">
          <h3>Gestión de Pedidos</h3>
        </div>
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Seller</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="skeleton-row">
                  <td><div className="skeleton-cell"></div></td>
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
    <div className="order-table-container">
      <div className="table-header">
        <div className="table-header-left">
          <h3>Gestión de Pedidos</h3>
        </div>
        <div className="table-header-right">
          {selectedOrders.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">
                {selectedOrders.length} seleccionados
              </span>
              <button
                className="bulk-action-btn"
                onClick={() => onOrderAction('bulk-export', selectedOrders)}
              >
                Exportar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filtros integrados */}
      <div className="table-filters">
        <div className="search-filter">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por ID, cliente, seller..."
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="inline-filters">
          <select
            className="filter-select"
            value={filters.estado || ''}
            onChange={(e) => handleFilterChange('estado', e.target.value)}
          >
            <option value="">Todos los estados</option>
            <option value="recibido">Recibido</option>
            <option value="validado">Validado</option>
            <option value="enviado_seller">Enviado al Seller</option>
            <option value="confirmado">Confirmado</option>
            <option value="en_proceso_envio">En Proceso de Envío</option>
            <option value="en_camino">En Camino</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
            <option value="devuelto">Devuelto</option>
          </select>

          <select
            className="filter-select"
            value={filters.seller || ''}
            onChange={(e) => handleFilterChange('seller', e.target.value)}
          >
            <option value="">Todos los sellers</option>
            <option value="TechStore Pro">TechStore Pro</option>
            <option value="Fashion Boutique">Fashion Boutique</option>
            <option value="Home Decor Plus">Home Decor Plus</option>
            <option value="Sports World">Sports World</option>
            <option value="Beauty Corner">Beauty Corner</option>
          </select>

          <input
            type="date"
            className="filter-select date-input"
            value={filters.fechaDesde || ''}
            onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
            placeholder="Fecha desde"
          />

          <input
            type="date"
            className="filter-select date-input"
            value={filters.fechaHasta || ''}
            onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
            placeholder="Fecha hasta"
          />

          <button className="clear-filters-btn" onClick={clearFilters}>
            Limpiar
          </button>
        </div>
      </div>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                />
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('numeroOrden')}
              >
                Pedido
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('cliente')}
              >
                Cliente
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('seller')}
              >
                Seller
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('total')}
              >
                Total
              </th>
              <th>
                Estado
              </th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('fecha')}
              >
                Fecha
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No hay pedidos</h3>
                  <p>No se encontraron pedidos con los filtros aplicados</p>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const statusInfo = getStatusBadge(order.estado);
                const isSelected = selectedOrders.includes(order.id);
                
                return (
                  <tr
                    key={order.id}
                    className={`order-row ${isSelected ? 'selected' : ''}`}
                  >
                    <td className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="order-info-col">
                      <div className="order-info">
                        <div className="order-icon">📦</div>
                        <div className="order-details">
                          <div className="order-number">#{order.numeroOrden}</div>
                          <div className="order-items">{order.productos.length} productos</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="customer-info">
                        <div className="customer-name">{order.cliente.nombre}</div>
                        <div className="customer-email">{order.cliente.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="seller-info">
                        <div className="seller-name">{order.seller}</div>
                      </div>
                    </td>
                    <td>
                      <div className="price-info">
                        <div className="price-value">{formatPrice(order.total)}</div>
                      </div>
                    </td>
                    <td>
                      <div className="status-container">
                        <span className={`status-badge ${statusInfo.class}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="date-info">
                        <div className="date-text">{formatDate(order.fecha)}</div>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="primary"
                          onClick={() => handleOrderClick(order.id)}
                        >
                          Ver
                        </button>
                        {order.estado !== 'en_camino' && order.estado !== 'cancelado' && (
                          <button
                            className="cancel-btn"
                            onClick={() => onOrderAction('cancel', order.id)}
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;