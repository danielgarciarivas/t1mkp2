import React from 'react';
import './SellerFilters.css';

const SellerFilters = ({ 
  filters, 
  onFiltersChange, 
  onSearch,
  categories = []
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

  const handleCategoryChange = (categoryId) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    handleFilterChange('categories', newCategories);
  };

  return (
    <div className="seller-filters">
      <div className="filters-row">
        {/* Búsqueda */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar sellers por nombre, RFC o email..."
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
            <option value="bloqueado">Bloqueado</option>
          </select>
        </div>

        {/* Fecha de registro */}
        <div className="filter-group">
          <label className="filter-label">Fecha registro</label>
          <div className="date-range">
            <input
              type="date"
              value={filters.fechaDesde || ''}
              onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
              className="date-input"
            />
            <span className="date-separator">-</span>
            <input
              type="date"
              value={filters.fechaHasta || ''}
              onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
              className="date-input"
            />
          </div>
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
          if (!value || (Array.isArray(value) && value.length === 0)) return null;
          
          return (
            <span key={key} className="filter-tag">
              {getFilterLabel(key, value)}
              <button 
                onClick={() => handleFilterChange(key, Array.isArray(value) ? [] : '')}
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
    fechaDesde: `Desde: ${value}`,
    fechaHasta: `Hasta: ${value}`,
    categories: `Categorías: ${value.length}`
  };
  
  return labels[key] || `${key}: ${value}`;
};

export default SellerFilters;