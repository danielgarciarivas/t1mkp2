import React from 'react';
import './ProductFilters.css';

const ProductFilters = ({ 
  filters, 
  onFiltersChange, 
  onSearch
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="product-filters">
      <div className="filters-row">
        {/* Búsqueda */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos por nombre, SKU o seller..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Estado */}
        <div className="filter-group">
          <label className="filter-label">Estado</label>
          <select
            value={filters.estado || 'todos'}
            onChange={(e) => handleFilterChange('estado', e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="activo">Activo</option>
            <option value="suspendido">Suspendido</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>

        {/* Categoría */}
        <div className="filter-group">
          <label className="filter-label">Categoría</label>
          <select
            value={filters.categoria || 'todas'}
            onChange={(e) => handleFilterChange('categoria', e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas</option>
            <option value="electronicos">Electrónicos</option>
            <option value="ropa">Ropa</option>
            <option value="hogar">Hogar</option>
            <option value="deportes">Deportes</option>
            <option value="salud">Salud y Belleza</option>
          </select>
        </div>

        {/* Seller */}
        <div className="filter-group">
          <label className="filter-label">Seller</label>
          <select
            value={filters.seller || 'todos'}
            onChange={(e) => handleFilterChange('seller', e.target.value)}
            className="filter-select"
          >
            <option value="todos">Todos</option>
            <option value="techstore">TechStore Pro</option>
            <option value="fashion">Fashion Boutique</option>
            <option value="homedecor">Home Decor Plus</option>
            <option value="sports">Sports World</option>
          </select>
        </div>

        {/* Botón limpiar filtros */}
        <button 
          onClick={() => onFiltersChange({})}
          className="clear-filters-btn"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Resumen de filtros activos */}
      <div className="active-filters">
        {Object.entries(filters).map(([key, value]) => {
          if (!value || value === 'todos' || value === 'todas') return null;
          
          return (
            <span key={key} className="filter-tag">
              {getFilterLabel(key, value)}
              <button 
                onClick={() => handleFilterChange(key, key === 'categoria' ? 'todas' : 'todos')}
                className="remove-filter"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const getFilterLabel = (key, value) => {
  const labels = {
    estado: `Estado: ${value}`,
    categoria: `Categoría: ${value}`,
    seller: `Seller: ${value}`
  };
  
  return labels[key] || `${key}: ${value}`;
};

export default ProductFilters;