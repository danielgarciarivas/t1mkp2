import React, { useState } from 'react';
import Button from '../../common/Button';
import './ProductTable.css';

const ProductTable = ({ 
  products, 
  loading = false, 
  onProductAction,
  onProductSelect,
  selectedProducts = [],
  filters,
  onFiltersChange,
  onSearch
}) => {
  const [sortField, setSortField] = useState('fechaCreacion');
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
      <div className="product-table-container">
        <div className="table-header">
          <h3>Lista de Productos</h3>
        </div>
        <div className="product-table">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Seller</th>
                <th>Precio</th>
                <th>Categoría</th>
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
      onProductSelect(products.map(p => p.id));
    } else {
      onProductSelect([]);
    }
  };

  const handleProductCheck = (productId) => {
    if (selectedProducts.includes(productId)) {
      onProductSelect(selectedProducts.filter(id => id !== productId));
    } else {
      onProductSelect([...selectedProducts, productId]);
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pendiente': { 
        text: 'Pendiente', 
        class: 'status-pending',
        actions: ['ver', 'aprobar', 'rechazar']
      },
      'activo': { 
        text: 'Activo', 
        class: 'status-active',
        actions: ['ver', 'suspender', 'editar']
      },
      'freepass': { 
        text: 'Freepass', 
        class: 'status-freepass',
        actions: ['ver', 'suspender', 'editar']
      },
      'suspendido': { 
        text: 'Suspendido', 
        class: 'status-suspended',
        actions: ['ver', 'reactivar']
      },
      'rechazado': { 
        text: 'Rechazado', 
        class: 'status-rejected',
        actions: ['ver', 'revisar']
      }
    };
    
    return badges[status] || badges['pendiente'];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getProductIcon = (categoria) => {
    const icons = {
      'electronicos': '📱',
      'ropa': '👗',
      'hogar': '🛋️',
      'deportes': '⚽',
      'salud': '💄'
    };
    return icons[categoria] || '📦';
  };

  const isAllSelected = selectedProducts.length === products.length && products.length > 0;
  const isPartialSelected = selectedProducts.length > 0 && selectedProducts.length < products.length;

  return (
    <div className="product-table-container">
      <div className="table-header">
        <div className="table-header-left">
          <h3>Lista de Productos ({products.length})</h3>
        </div>
        
        <div className="table-header-right">
          {selectedProducts.length > 0 && (
            <div className="bulk-actions">
              <span className="selected-count">
                {selectedProducts.length} seleccionados
              </span>
              <Button 
                variant="secondary" 
                size="small"
                onClick={() => onProductAction('bulk-approve', selectedProducts)}
              >
                Aprobar seleccionados
              </Button>
              <Button 
                variant="danger" 
                size="small"
                onClick={() => onProductAction('bulk-reject', selectedProducts)}
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
            placeholder="Buscar productos por nombre, SKU o seller..."
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
            <option value="freepass">Freepass</option>
            <option value="suspendido">Suspendido</option>
            <option value="rechazado">Rechazado</option>
          </select>

          <select
            value={filters.categoria || 'todas'}
            onChange={(e) => handleFilterChange('categoria', e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas las categorías</option>
            <option value="electronicos">Electrónicos</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="deportes">Deportes</option>
            <option value="salud">Salud y Belleza</option>
          </select>

          <select
            value={filters.seller || 'todos'}
            onChange={(e) => handleFilterChange('seller', e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos los sellers</option>
            <option value="techstore">TechStore Pro</option>
            <option value="fashion">Fashion Boutique</option>
            <option value="homedecor">Home Decor Plus</option>
            <option value="sports">Sports World</option>
          </select>

          {(filters.estado !== 'todos' || filters.categoria !== 'todas' || filters.seller !== 'todos' || filters.search) && (
            <button 
              onClick={() => onFiltersChange({})}
              className="clear-filters-btn"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="product-table">
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
                Producto {getSortIcon('nombre')}
              </th>
              <th>Seller</th>
              <th 
                className="sortable-header"
                onClick={() => handleSort('precio')}
              >
                Precio {getSortIcon('precio')}
              </th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const statusInfo = getStatusBadge(product.estado);
              
              return (
                <tr key={product.id} className={`product-row ${selectedProducts.includes(product.id) ? 'selected' : ''}`}>
                  <td className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductCheck(product.id)}
                    />
                  </td>
                  
                  <td className="product-info-col">
                    <div className="product-info">
                      <div className="product-icon">
                        {getProductIcon(product.categoria)}
                      </div>
                      <div className="product-details">
                        <div className="product-name">{product.nombre}</div>
                        <div className="product-sku">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td>
                    <div className="seller-info">
                      <span className="seller-name">{product.seller}</span>
                    </div>
                  </td>
                  
                  <td>
                    <div className="price-info">
                      <span className="price-value">{formatPrice(product.precio)}</span>
                    </div>
                  </td>
                  
                  
                  <td>
                    <span className="category-pill">
                      {product.categoria}
                    </span>
                  </td>
                  
                  <td>
                    <div className="status-container">
                      <span className={`status-badge ${statusInfo.class}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </td>
                  
                  <td>
                    <div className="action-buttons">
                      {statusInfo.actions.includes('ver') && (
                        <Button 
                          variant="secondary"
                          size="small"
                          onClick={() => onProductAction('view', product.id)}
                        >
                          Ver
                        </Button>
                      )}
                      {statusInfo.actions.includes('aprobar') && (
                        <Button 
                          variant="success"
                          size="small"
                          onClick={() => onProductAction('approve', product.id)}
                        >
                          Aprobar
                        </Button>
                      )}
                      {statusInfo.actions.includes('rechazar') && (
                        <Button 
                          variant="danger"
                          size="small"
                          onClick={() => onProductAction('reject', product.id)}
                        >
                          Rechazar
                        </Button>
                      )}
                      {statusInfo.actions.includes('suspender') && (
                        <Button 
                          variant="warning"
                          size="small"
                          onClick={() => onProductAction('suspend', product.id)}
                        >
                          Suspender
                        </Button>
                      )}
                      {statusInfo.actions.includes('reactivar') && (
                        <Button 
                          variant="success"
                          size="small"
                          onClick={() => onProductAction('reactivate', product.id)}
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

      {products.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No se encontraron productos</h3>
          <p>Ajusta los filtros o espera a que los sellers sincronicen productos</p>
        </div>
      )}
    </div>
  );
};

export default ProductTable;