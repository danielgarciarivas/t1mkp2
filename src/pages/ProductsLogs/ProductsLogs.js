import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import './ProductsLogs.css';

const ProductsLogs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [filters, setFilters] = useState({
    sku: '',
    productId: '',
    date: '',
    sellerId: '',
    status: 'todos'
  });

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, filters]);

  const loadLogs = async () => {
    setLoading(true);
    // Simular carga de logs
    setTimeout(() => {
      const mockLogs = [
        {
          id: 1,
          timestamp: '2024-08-16T14:30:15.123Z',
          sellerId: 1,
          sellerName: 'TechStore Pro',
          productId: 'PROD-001',
          productName: 'iPhone 15 Pro Max 256GB',
          sku: 'IP15PM-256-BLU',
          endpoint: '/api/products/update-price-stock',
          method: 'PUT',
          statusCode: 200,
          statusText: 'OK',
          operation: 'price_stock_update',
          requestData: {
            sku: 'IP15PM-256-BLU',
            price: 24999.00,
            stock: 15,
            currency: 'MXN'
          },
          responseData: {
            success: true,
            message: 'Precio y stock actualizados correctamente',
            updatedAt: '2024-08-16T14:30:15.123Z'
          },
          processingTime: 245
        },
        {
          id: 2,
          timestamp: '2024-08-16T14:25:42.456Z',
          sellerId: 2,
          sellerName: 'Fashion Boutique',
          productId: 'PROD-002',
          productName: 'Vestido Casual Primavera',
          sku: 'VCP-MED-AZL',
          endpoint: '/api/products/update-stock',
          method: 'PATCH',
          statusCode: 200,
          statusText: 'OK',
          operation: 'stock_update',
          requestData: {
            sku: 'VCP-MED-AZL',
            stock: 8
          },
          responseData: {
            success: true,
            message: 'Stock actualizado',
            previousStock: 12,
            newStock: 8,
            updatedAt: '2024-08-16T14:25:42.456Z'
          },
          processingTime: 156
        },
        {
          id: 3,
          timestamp: '2024-08-16T14:20:18.789Z',
          sellerId: 1,
          sellerName: 'TechStore Pro',
          productId: 'PROD-003',
          productName: 'Samsung Galaxy S24 Ultra',
          sku: 'SGS24U-512-BLK',
          endpoint: '/api/products/update-price',
          method: 'PATCH',
          statusCode: 400,
          statusText: 'Bad Request',
          operation: 'price_update',
          requestData: {
            sku: 'SGS24U-512-BLK',
            price: -1500.00,  // Precio inválido
            currency: 'MXN'
          },
          responseData: {
            success: false,
            error: 'INVALID_PRICE',
            message: 'El precio no puede ser negativo o cero',
            validationErrors: ['price must be greater than 0']
          },
          processingTime: 89
        },
        {
          id: 4,
          timestamp: '2024-08-16T14:15:33.012Z',
          sellerId: 8,
          sellerName: 'Mega Sports Store',
          productId: 'PROD-004',
          productName: 'Tenis Nike Air Max 270',
          sku: 'TNK-AM270-42-BLK',
          endpoint: '/api/products/bulk-update',
          method: 'POST',
          statusCode: 207,
          statusText: 'Multi-Status',
          operation: 'bulk_update',
          requestData: {
            updates: [
              { sku: 'TNK-AM270-42-BLK', price: 2899.00, stock: 25 },
              { sku: 'TNK-AM270-43-BLK', price: 2899.00, stock: 18 },
              { sku: 'TNK-AM270-44-BLK', price: 2899.00, stock: 12 }
            ]
          },
          responseData: {
            success: true,
            message: 'Actualización masiva procesada',
            results: {
              successful: 3,
              failed: 0,
              total: 3
            },
            details: [
              { sku: 'TNK-AM270-42-BLK', status: 'updated' },
              { sku: 'TNK-AM270-43-BLK', status: 'updated' },
              { sku: 'TNK-AM270-44-BLK', status: 'updated' }
            ]
          },
          processingTime: 1245
        },
        {
          id: 5,
          timestamp: '2024-08-16T14:10:55.345Z',
          sellerId: 5,
          sellerName: 'Beauty Corner',
          productId: 'PROD-005',
          productName: 'Serum Facial Vitamina C',
          sku: 'SFC-VC-30ML',
          endpoint: '/api/products/update-stock',
          method: 'PATCH',
          statusCode: 404,
          statusText: 'Not Found',
          operation: 'stock_update',
          requestData: {
            sku: 'SFC-VC-30ML-OLD',  // SKU incorrecto
            stock: 45
          },
          responseData: {
            success: false,
            error: 'PRODUCT_NOT_FOUND',
            message: 'No se encontró un producto con el SKU especificado',
            requestedSku: 'SFC-VC-30ML-OLD'
          },
          processingTime: 67
        },
        {
          id: 6,
          timestamp: '2024-08-16T13:55:22.678Z',
          sellerId: 2,
          sellerName: 'Fashion Boutique',
          productId: 'PROD-006',
          productName: 'Jeans Skinny Mujer',
          sku: 'JSM-28-IND',
          endpoint: '/api/products/update-price-stock',
          method: 'PUT',
          statusCode: 500,
          statusText: 'Internal Server Error',
          operation: 'price_stock_update',
          requestData: {
            sku: 'JSM-28-IND',
            price: 899.99,
            stock: 22,
            currency: 'MXN'
          },
          responseData: {
            success: false,
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Error interno del servidor al procesar la actualización',
            errorId: 'ERR-2024081613552267'
          },
          processingTime: 5432
        }
      ];

      setLogs(mockLogs);
      setLoading(false);
    }, 800);
  };

  const applyFilters = () => {
    let filtered = [...logs];

    // Filtro por SKU
    if (filters.sku) {
      const sku = filters.sku.toLowerCase();
      filtered = filtered.filter(log => 
        log.sku.toLowerCase().includes(sku)
      );
    }

    // Filtro por ID de producto
    if (filters.productId) {
      const productId = filters.productId.toLowerCase();
      filtered = filtered.filter(log => 
        log.productId.toLowerCase().includes(productId) ||
        log.productName.toLowerCase().includes(productId)
      );
    }

    // Filtro por seller
    if (filters.sellerId) {
      const sellerId = filters.sellerId.toLowerCase();
      filtered = filtered.filter(log => 
        log.sellerName.toLowerCase().includes(sellerId)
      );
    }

    // Filtro por fecha
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      filtered = filtered.filter(log => 
        new Date(log.timestamp).toDateString() === filterDate
      );
    }

    // Filtro por status HTTP
    if (filters.status && filters.status !== 'todos') {
      if (filters.status === 'success') {
        filtered = filtered.filter(log => log.statusCode >= 200 && log.statusCode < 300);
      } else if (filters.status === 'error') {
        filtered = filtered.filter(log => log.statusCode >= 400);
      }
    }

    setFilteredLogs(filtered);
  };

  const handleViewLogDetail = (log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  const getStatusBadgeClass = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) return 'status-success';
    if (statusCode >= 400 && statusCode < 500) return 'status-client-error';
    if (statusCode >= 500) return 'status-server-error';
    return 'status-info';
  };

  const getOperationIcon = (operation) => {
    switch (operation) {
      case 'price_update': return '💰';
      case 'stock_update': return '📦';
      case 'price_stock_update': return '🔄';
      case 'bulk_update': return '📊';
      default: return '📝';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Logs de Productos</h1>
          <p className="module-subtitle">
            Visualice los logs de actualizaciones de precios y stock de los últimos 6 meses
          </p>
        </div>
      </div>

      {/* Filtros de búsqueda */}
      <div className="logs-filters">
        <div className="filters-grid">
          <div className="filter-group">
            <label>SKU</label>
            <input
              type="text"
              placeholder="Buscar por SKU..."
              value={filters.sku}
              onChange={(e) => setFilters(prev => ({ ...prev, sku: e.target.value }))}
            />
          </div>
          
          <div className="filter-group">
            <label>Producto</label>
            <input
              type="text"
              placeholder="ID o nombre del producto..."
              value={filters.productId}
              onChange={(e) => setFilters(prev => ({ ...prev, productId: e.target.value }))}
            />
          </div>
          
          <div className="filter-group">
            <label>Seller</label>
            <input
              type="text"
              placeholder="Nombre del seller..."
              value={filters.sellerId}
              onChange={(e) => setFilters(prev => ({ ...prev, sellerId: e.target.value }))}
            />
          </div>
          
          <div className="filter-group">
            <label>Fecha</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          
          <div className="filter-group">
            <label>Estado</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="todos">Todos</option>
              <option value="success">Exitosos (2xx)</option>
              <option value="error">Errores (4xx, 5xx)</option>
            </select>
          </div>
          
          <div className="filter-actions">
            <Button
              variant="secondary"
              onClick={() => setFilters({ sku: '', productId: '', date: '', sellerId: '', status: 'todos' })}
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla de logs */}
      <div className="logs-table-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando logs...</p>
          </div>
        ) : (
          <>
            <div className="logs-summary">
              <span className="logs-count">
                Mostrando {filteredLogs.length} de {logs.length} logs
              </span>
              <small className="logs-retention">
                Solo se conservan logs de los últimos 6 meses
              </small>
            </div>
            
            <div className="logs-table">
              <table>
                <thead>
                  <tr>
                    <th>Fecha/Hora</th>
                    <th>Seller</th>
                    <th>Producto</th>
                    <th>SKU</th>
                    <th>Operación</th>
                    <th>Estado HTTP</th>
                    <th>Tiempo (ms)</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="no-logs">
                        <div className="empty-state">
                          <span className="empty-icon">📋</span>
                          <p>No se encontraron logs con los filtros aplicados</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log.id} className="log-row">
                        <td className="timestamp-cell">
                          {formatTimestamp(log.timestamp)}
                        </td>
                        <td className="seller-cell">
                          <div className="seller-info">
                            <span className="seller-name">{log.sellerName}</span>
                            <small className="seller-id">ID: {log.sellerId}</small>
                          </div>
                        </td>
                        <td className="product-cell">
                          <div className="product-info">
                            <span className="product-name">{log.productName}</span>
                            <small className="product-id">{log.productId}</small>
                          </div>
                        </td>
                        <td className="sku-cell">
                          <code className="sku-code">{log.sku}</code>
                        </td>
                        <td className="operation-cell">
                          <div className="operation-info">
                            <span className="operation-icon">{getOperationIcon(log.operation)}</span>
                            <span className="operation-name">
                              {log.operation.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="status-cell">
                          <span className={`status-badge ${getStatusBadgeClass(log.statusCode)}`}>
                            {log.statusCode} {log.statusText}
                          </span>
                        </td>
                        <td className="time-cell">
                          <span className="processing-time">{log.processingTime}ms</span>
                        </td>
                        <td className="actions-cell">
                          <Button
                            variant="ghost"
                            size="small"
                            onClick={() => handleViewLogDetail(log)}
                          >
                            Ver Detalle
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Modal de detalle del log */}
      {showLogModal && selectedLog && (
        <div className="modal-overlay" onClick={() => setShowLogModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalle del Log</h3>
              <button 
                className="close-button"
                onClick={() => setShowLogModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="log-detail">
                <div className="log-detail-section">
                  <h4>Información General</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Timestamp:</label>
                      <span>{formatTimestamp(selectedLog.timestamp)}</span>
                    </div>
                    <div className="detail-item">
                      <label>Seller:</label>
                      <span>{selectedLog.sellerName} (ID: {selectedLog.sellerId})</span>
                    </div>
                    <div className="detail-item">
                      <label>Producto:</label>
                      <span>{selectedLog.productName}</span>
                    </div>
                    <div className="detail-item">
                      <label>SKU:</label>
                      <code>{selectedLog.sku}</code>
                    </div>
                    <div className="detail-item">
                      <label>Endpoint:</label>
                      <code>{selectedLog.method} {selectedLog.endpoint}</code>
                    </div>
                    <div className="detail-item">
                      <label>Estado HTTP:</label>
                      <span className={`status-badge ${getStatusBadgeClass(selectedLog.statusCode)}`}>
                        {selectedLog.statusCode} {selectedLog.statusText}
                      </span>
                    </div>
                    <div className="detail-item">
                      <label>Tiempo de procesamiento:</label>
                      <span>{selectedLog.processingTime}ms</span>
                    </div>
                  </div>
                </div>

                <div className="log-detail-section">
                  <h4>Request Data</h4>
                  <div className="code-block">
                    <pre><code>{JSON.stringify(selectedLog.requestData, null, 2)}</code></pre>
                  </div>
                </div>

                <div className="log-detail-section">
                  <h4>Response Data</h4>
                  <div className="code-block">
                    <pre><code>{JSON.stringify(selectedLog.responseData, null, 2)}</code></pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <Button 
                variant="secondary"
                onClick={() => setShowLogModal(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsLogs;