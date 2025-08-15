import React, { useState } from 'react';
import Button from '../../common/Button';
import './SellerTable.css';

const SellerTable = ({ 
  sellers, 
  loading = false, 
  onSellerAction,
  onSellerSelect,
  selectedSellers = [],
  filters,
  onFiltersChange,
  onSearch,
  pendingOnly = false
}) => {
  const [sortField, setSortField] = useState('fechaSolicitud');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  if (loading) {
    return (
      <div className="seller-table-container">
        <div className="table-header">
          <h3>Lista de Sellers</h3>
        </div>
        <div className="seller-table">
          <table>
            <thead>
              <tr>
                <th>Seller</th>
                <th>Categorías</th>
                <th>Fecha Solicitud</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="skeleton-row">
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
      onSellerSelect(sellers.map(s => s.id));
    } else {
      onSellerSelect([]);
    }
  };

  const handleSellerCheck = (sellerId) => {
    if (selectedSellers.includes(sellerId)) {
      onSellerSelect(selectedSellers.filter(id => id !== sellerId));
    } else {
      onSellerSelect([...selectedSellers, sellerId]);
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getStatusBadge = (status, validationState) => {
    const badges = {
      'pendiente': { 
        text: 'Pendiente', 
        class: 'status-pending',
        actions: ['revisar', 'aprobar', 'rechazar']
      },
      'under-review-legal': { 
        text: 'Revisión Legal', 
        class: 'status-review',
        actions: ['aprobar', 'rechazar', 'solicitar-info']
      },
      'under-review-finanzas': { 
        text: 'Revisión Finanzas', 
        class: 'status-review',
        actions: ['aprobar', 'rechazar', 'solicitar-info']
      },
      'activo': { 
        text: 'Activo', 
        class: 'status-active',
        actions: ['ver', 'suspender', 'editar']
      },
      'suspendido': { 
        text: 'Suspendido', 
        class: 'status-suspended',
        actions: ['reactivar', 'ver', 'bloquear']
      },
      'bloqueado': { 
        text: 'Bloqueado', 
        class: 'status-blocked',
        actions: ['ver', 'escalamiento']
      },
      'rechazado': { 
        text: 'Rechazado', 
        class: 'status-rejected',
        actions: ['ver', 'reactivar']
      }
    };
    
    return badges[status] || badges['pendiente'];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isAllSelected = selectedSellers.length === sellers.length && sellers.length > 0;
  const isPartialSelected = selectedSellers.length > 0 && selectedSellers.length < sellers.length;

  return (
    <div className="seller-table-container">
      <div className="table-header">
        <div className="table-header-left">
          <h3>Lista de Tiendas ({sellers.length})</h3>
        </div>
        
        <div className="table-header-right">
          {selectedSellers.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">
                {selectedSellers.length} seleccionados
              </span>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => onSellerAction('bulk-approve', selectedSellers)}
              >
                Aprobar seleccionados
              </Button>
              <Button 
                variant="danger" 
                size="small"
                onClick={() => onSellerAction('bulk-reject', selectedSellers)}
              >
                Rechazar seleccionados
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filtros integrados */}
      <div className="table-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Buscar tiendas por nombre o email..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="inline-filters">
          <select
            value={filters.estado || 'todos'}
            onChange={(e) => handleFilterChange('estado', e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="activo">Activo</option>
            <option value="suspendido">Suspendido</option>
            <option value="bloqueado">Bloqueado</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <input
            type="date"
            value={filters.fechaDesde || ''}
            onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
            className="filter-select date-input"
            placeholder="Fecha desde"
          />

          <input
            type="date"
            value={filters.fechaHasta || ''}
            onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
            className="filter-select date-input"
            placeholder="Fecha hasta"
          />

          {(filters.estado !== 'todos' || filters.fechaDesde || filters.fechaHasta || filters.search) && (
            <button 
              onClick={() => onFiltersChange({})}
              className="clear-filters-btn"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="seller-table">
        <table>
          <thead>
            <tr>
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
              <th 
                className="sortable-header"
                onClick={() => handleSort('nombre')}
              >
                Seller {getSortIcon('nombre')}
              </th>
              <th>Categorías</th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('fechaSolicitud')}
              >
                Fecha Solicitud {getSortIcon('fechaSolicitud')}
              </th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(seller => {
              const statusInfo = getStatusBadge(seller.estado, seller.validationState);
              
              return (
                <tr key={seller.id} className={`seller-row ${selectedSellers.includes(seller.id) ? 'selected' : ''}`}>
                  <td className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedSellers.includes(seller.id)}
                      onChange={() => handleSellerCheck(seller.id)}
                    />
                  </td>
                  
                  <td className="seller-info-col">
                    <div className="seller-info">
                      <div className="seller-avatar">
                        {seller.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div className="seller-details">
                        <div className="seller-name">{seller.nombre}</div>
                        <div className="seller-contact">
                          <span className="seller-email">{seller.email}</span>
                          {seller.telefono && (
                            <span className="seller-phone">• {seller.telefono}</span>
                          )}
                        </div>
                        {seller.alerts && seller.alerts.length > 0 && (
                          <div className="seller-alerts">
                            {seller.alerts.slice(0, 2).map((alert, index) => (
                              <div key={index} className={`alert-badge alert-${alert.severity}`} title={alert.message}>
                                {alert.severity === 'critical' && '🚨'}
                                {alert.severity === 'warning' && '⚠️'}
                                {alert.severity === 'info' && 'ℹ️'}
                                <span className="alert-text">{alert.message}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  
                  <td>
                    <div className="categories-list">
                      {seller.categorias.slice(0, 2).map((cat, index) => (
                        <span key={cat.id || index} className="category-pill">
                          {cat.nombre || cat}
                        </span>
                      ))}
                      {seller.categorias.length > 2 && (
                        <span className="category-more">
                          +{seller.categorias.length - 2} más
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td>
                    <div className="date-info">
                      <span className="date-text">{formatDate(seller.fechaSolicitud || seller.fechaRegistro)}</span>
                      <span className="date-full">{new Date(seller.fechaSolicitud || seller.fechaRegistro).toLocaleDateString('es-ES')}</span>
                    </div>
                  </td>
                  
                  <td>
                    <div className="status-container">
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                      {seller.urgente && (
                        <span className="urgency-badge">⚡ Urgente</span>
                      )}
                    </div>
                  </td>
                  
                  
                  <td>
                    <div className="action-buttons">
                      {statusInfo.actions.includes('revisar') && (
                        <Button 
                          size="small"
                          onClick={() => onSellerAction('review', seller.id)}
                        >
                          Revisar
                        </Button>
                      )}
                      {statusInfo.actions.includes('aprobar') && (
                        <Button 
                          variant="success"
                          size="small"
                          onClick={() => onSellerAction('approve', seller.id)}
                        >
                          Aprobar
                        </Button>
                      )}
                      {statusInfo.actions.includes('rechazar') && (
                        <Button 
                          variant="danger"
                          size="small"
                          onClick={() => onSellerAction('reject', seller.id)}
                        >
                          Rechazar
                        </Button>
                      )}
                      {statusInfo.actions.includes('ver') && (
                        <Button 
                          variant="secondary"
                          size="small"
                          onClick={() => onSellerAction('view', seller.id)}
                        >
                          Ver
                        </Button>
                      )}
                      {statusInfo.actions.includes('suspender') && (
                        <Button 
                          variant="warning"
                          size="small"
                          onClick={() => onSellerAction('suspend', seller.id)}
                        >
                          Suspender
                        </Button>
                      )}
                      {statusInfo.actions.includes('reactivar') && (
                        <Button 
                          variant="success"
                          size="small"
                          onClick={() => onSellerAction('reactivate', seller.id)}
                        >
                          Reactivar
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

      {sellers.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏪</div>
          <h3>No se encontraron sellers</h3>
          <p>Ajusta los filtros o agrega nuevos sellers al marketplace</p>
        </div>
      )}
    </div>
  );
};

export default SellerTable;