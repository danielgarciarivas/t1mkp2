import React from 'react';
import './TopPerformers.css';

const TopPerformers = ({ 
  data, 
  type = 'sellers', 
  loading = false, 
  allData = [], 
  currentPage = 1, 
  itemsPerPage = 10, 
  onPageChange, 
  onViewAll 
}) => {
  if (loading) {
    return (
      <div className="top-performers">
        <div className="top-performers-header">
          
        </div>
        <div className="performers-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="performer-item skeleton">
              <div className="performer-rank-skeleton"></div>
              <div className="performer-avatar-skeleton"></div>
              <div className="performer-info">
                <div className="performer-name-skeleton"></div>
                <div className="performer-metrics-skeleton"></div>
              </div>
              <div className="performer-value-skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="top-performers">
      <div className="top-performers-header">
        <h3>Todos los {type === 'sellers' ? 'Sellers' : 'Productos'}</h3>
        <button 
          className="view-all-btn"
          onClick={() => onViewAll && onViewAll()}
        >
          Ver todos
        </button>
      </div>
      
      <div className="performers-list">
        {data.map((item, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
          return (
            <div key={item.id} className="performer-item">
              <div className={`performer-rank rank-${globalIndex <= 3 ? globalIndex : 'other'}`}>
                #{globalIndex}
              </div>
              
              <div className="performer-avatar">
                {type === 'sellers' ? '🏪' : '📦'}
              </div>
              
              <div className="performer-info">
                <div className="performer-name">{item.name}</div>
                <div className="performer-metrics">
                  {type === 'sellers' ? (
                    <span>Reputación: {item.rating} •</span>
                  ) : (
                    <span>Categoría: {item.category}</span>
                  )}
                </div>
              </div>
              
            
              
              <div className="performer-value">
                <div className="value-amount">{item.value}</div>
                {item.growth && (
                  <div className={`value-growth ${item.growth > 0 ? 'positive' : 'negative'}`}>
                    {item.growth > 0 ? '+' : ''}{item.growth}%
                  </div>
                )}
              </div>
              
              <button className="performer-action" onClick={() => handleViewDetails(item.id)}>
                Ver detalles
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Paginador */}
      <div className="pagination">
        <div className="pagination-info">
          Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, allData.length)} de {allData.length} {type === 'sellers' ? 'sellers' : 'productos'}
        </div>
        
        <div className="pagination-controls">
          <button 
            className="pagination-btn prev"
            disabled={currentPage === 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
          >
            ← Anterior
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: Math.ceil(allData.length / itemsPerPage) }, (_, i) => i + 1)
              .filter(page => {
                const totalPages = Math.ceil(allData.length / itemsPerPage);
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                return false;
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;
                
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className="pagination-ellipsis">...</span>}
                    <button
                      className={`pagination-btn page ${currentPage === page ? 'active' : ''}`}
                      onClick={() => onPageChange && onPageChange(page)}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })
            }
          </div>
          
          <button 
            className="pagination-btn next"
            disabled={currentPage === Math.ceil(allData.length / itemsPerPage)}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
};

const handleViewDetails = (id) => {
  console.log('Ver detalles de:', id);
  // Implementar navegación a detalle
};

export default TopPerformers;