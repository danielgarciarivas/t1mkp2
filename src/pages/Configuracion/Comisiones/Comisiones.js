import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Comisiones.css';

const Comisiones = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  
  // Estados para la configuración de comisiones
  const [commissionMode, setCommissionMode] = useState('categoria'); // 'categoria' | 'general'
  const [generalCommission, setGeneralCommission] = useState(8.0);
  const [defaultCommission, setDefaultCommission] = useState(5.0);
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Estados para precedencia
  const [precedenceOrder, setPrecedenceOrder] = useState([
    { id: 'producto', name: 'Por Producto', active: true },
    { id: 'seller', name: 'Por Seller Individual', active: true },
    { id: 'categoria', name: 'Por Categoría Padre', active: true },
    { id: 'default', name: 'Comisión por Defecto', active: true }
  ]);

  useEffect(() => {
    loadComisiones();
  }, []);

  const loadComisiones = async () => {
    setLoading(true);
    
    setTimeout(() => {
      // Solo categorías padre para configurar comisiones
      const mockCategorias = [
        {
          id: 1,
          codigo: 'ELEC001',
          nombre: 'Electrónicos',
          nivel: 1,
          padre: null,
          comisionBase: 8.5,
          fechaInicio: '2024-01-01',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 5,
          productosAsignados: 1250
        },
        {
          id: 2,
          codigo: 'ROPA001',
          nombre: 'Ropa y Accesorios',
          nivel: 1,
          padre: null,
          comisionBase: 12.0,
          fechaInicio: '2024-01-15',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 8,
          productosAsignados: 2100
        },
        {
          id: 3,
          codigo: 'HOGAR001',
          nombre: 'Hogar y Jardín',
          nivel: 1,
          padre: null,
          comisionBase: 10.0,
          fechaInicio: '2024-02-01',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 3,
          productosAsignados: 850
        },
        {
          id: 4,
          codigo: 'DEPO001',
          nombre: 'Deportes y Recreación',
          nivel: 1,
          padre: null,
          comisionBase: 9.5,
          fechaInicio: '2024-03-01',
          fechaFin: null,
          activa: false,
          totalSubcategorias: 6,
          productosAsignados: 420
        },
        {
          id: 5,
          codigo: 'SALUD001',
          nombre: 'Salud y Belleza',
          nivel: 1,
          padre: null,
          comisionBase: 15.0,
          fechaInicio: '2024-01-01',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 4,
          productosAsignados: 680
        },
        {
          id: 6,
          codigo: 'AUTO001',
          nombre: 'Automotriz',
          nivel: 1,
          padre: null,
          comisionBase: 7.5,
          fechaInicio: '2024-01-10',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 12,
          productosAsignados: 3200
        },
        {
          id: 7,
          codigo: 'LIBRO001',
          nombre: 'Libros y Medios',
          nivel: 1,
          padre: null,
          comisionBase: 6.0,
          fechaInicio: '2024-02-15',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 7,
          productosAsignados: 1800
        },
        {
          id: 8,
          codigo: 'JUGUETE001',
          nombre: 'Juguetes y Juegos',
          nivel: 1,
          padre: null,
          comisionBase: 11.0,
          fechaInicio: '2024-01-20',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 9,
          productosAsignados: 1500
        },
        {
          id: 9,
          codigo: 'MASCOTA001',
          nombre: 'Mascotas',
          nivel: 1,
          padre: null,
          comisionBase: 8.0,
          fechaInicio: '2024-03-05',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 6,
          productosAsignados: 920
        },
        {
          id: 10,
          codigo: 'ARTE001',
          nombre: 'Arte y Manualidades',
          nivel: 1,
          padre: null,
          comisionBase: 13.5,
          fechaInicio: '2024-02-28',
          fechaFin: null,
          activa: false,
          totalSubcategorias: 5,
          productosAsignados: 650
        },
        {
          id: 11,
          codigo: 'MUSIC001',
          nombre: 'Instrumentos Musicales',
          nivel: 1,
          padre: null,
          comisionBase: 9.0,
          fechaInicio: '2024-01-05',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 8,
          productosAsignados: 480
        },
        {
          id: 12,
          codigo: 'INDUS001',
          nombre: 'Industrial y Científico',
          nivel: 1,
          padre: null,
          comisionBase: 5.5,
          fechaInicio: '2024-03-10',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 15,
          productosAsignados: 2800
        },
        {
          id: 13,
          codigo: 'JOYA001',
          nombre: 'Joyería y Relojes',
          nivel: 1,
          padre: null,
          comisionBase: 16.0,
          fechaInicio: '2024-01-12',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 4,
          productosAsignados: 340
        },
        {
          id: 14,
          codigo: 'COMIDA001',
          nombre: 'Alimentos y Bebidas',
          nivel: 1,
          padre: null,
          comisionBase: 4.5,
          fechaInicio: '2024-02-20',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 11,
          productosAsignados: 5200
        },
        {
          id: 15,
          codigo: 'BEBE001',
          nombre: 'Bebés y Niños',
          nivel: 1,
          padre: null,
          comisionBase: 10.5,
          fechaInicio: '2024-01-25',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 7,
          productosAsignados: 1200
        },
        {
          id: 16,
          codigo: 'OFICINA001',
          nombre: 'Oficina y Papelería',
          nivel: 1,
          padre: null,
          comisionBase: 7.0,
          fechaInicio: '2024-03-01',
          fechaFin: null,
          activa: false,
          totalSubcategorias: 6,
          productosAsignados: 890
        },
        {
          id: 17,
          codigo: 'HERRAM001',
          nombre: 'Herramientas y Mejoras del Hogar',
          nivel: 1,
          padre: null,
          comisionBase: 8.8,
          fechaInicio: '2024-01-30',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 10,
          productosAsignados: 2400
        },
        {
          id: 18,
          codigo: 'VIAJE001',
          nombre: 'Equipaje y Viajes',
          nivel: 1,
          padre: null,
          comisionBase: 12.5,
          fechaInicio: '2024-02-10',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 5,
          productosAsignados: 720
        },
        {
          id: 19,
          codigo: 'CAMARA001',
          nombre: 'Cámaras y Fotografía',
          nivel: 1,
          padre: null,
          comisionBase: 6.5,
          fechaInicio: '2024-02-25',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 8,
          productosAsignados: 560
        },
        {
          id: 20,
          codigo: 'CELULAR001',
          nombre: 'Celulares y Accesorios',
          nivel: 1,
          padre: null,
          comisionBase: 5.0,
          fechaInicio: '2024-01-08',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 12,
          productosAsignados: 4500
        },
        {
          id: 21,
          codigo: 'COMPUTO001',
          nombre: 'Computadoras y Tablets',
          nivel: 1,
          padre: null,
          comisionBase: 4.0,
          fechaInicio: '2024-01-15',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 9,
          productosAsignados: 1800
        },
        {
          id: 22,
          codigo: 'SMART001',
          nombre: 'Smart Home y Domótica',
          nivel: 1,
          padre: null,
          comisionBase: 9.5,
          fechaInicio: '2024-03-12',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 6,
          productosAsignados: 680
        },
        {
          id: 23,
          codigo: 'CLIMA001',
          nombre: 'Climatización',
          nivel: 1,
          padre: null,
          comisionBase: 6.8,
          fechaInicio: '2024-02-05',
          fechaFin: null,
          activa: false,
          totalSubcategorias: 4,
          productosAsignados: 320
        },
        {
          id: 24,
          codigo: 'LAVA001',
          nombre: 'Electrodomésticos',
          nivel: 1,
          padre: null,
          comisionBase: 7.2,
          fechaInicio: '2024-01-18',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 8,
          productosAsignados: 1100
        },
        {
          id: 25,
          codigo: 'COCINA001',
          nombre: 'Cocina y Comedor',
          nivel: 1,
          padre: null,
          comisionBase: 11.5,
          fechaInicio: '2024-02-12',
          fechaFin: null,
          activa: true,
          totalSubcategorias: 7,
          productosAsignados: 960
        }
      ];
      
      setCategorias(mockCategorias);
      setLoading(false);
    }, 1000);
  };

  const handleEditarCategoria = (categoria) => {
    setSelectedCategoria(categoria);
    setShowEditor(true);
  };

  const toggleCategoriaEstado = (id) => {
    setCategorias(prev => prev.map(categoria => 
      categoria.id === id ? { ...categoria, activa: !categoria.activa } : categoria
    ));
  };

  const actualizarComisionCategoria = (id, nuevaComision) => {
    setCategorias(prev => prev.map(categoria => 
      categoria.id === id ? { ...categoria, comisionBase: nuevaComision } : categoria
    ));
  };

  // Lógica de paginación para categorías
  const totalPages = Math.ceil(categorias.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategorias = categorias.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando configuración de comisiones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Configuración de Comisiones</h1>
          <p className="module-subtitle">
            Gestiona las comisiones del marketplace con precedencia y configuración profesional
          </p>
        </div>
      </div>

      <div className="comisiones-section">
        {/* Estadísticas */}
        <div className="comisiones-stats">
          <div className="stat-card">
            <h3>{categorias.length}</h3>
            <p>Categorías Padre</p>
          </div>
          <div className="stat-card">
            <h3>{categorias.filter(c => c.activa).length}</h3>
            <p>Categorías Activas</p>
          </div>
          <div className="stat-card">
            <h3>{(categorias.reduce((acc, c) => acc + c.comisionBase, 0) / categorias.length).toFixed(1)}%</h3>
            <p>Comisión Promedio</p>
          </div>
          <div className="stat-card">
            <h3>{defaultCommission}%</h3>
            <p>Comisión por Defecto</p>
          </div>
        </div>

        {/* Configuración de Precedencia y Comisión por Defecto */}
        <div className="precedence-section">          
          <div className="section-header">
            <h3>🎯 Precedencia y Configuración General</h3>
            <p className="section-description">
              Define el orden de prioridad y comisión por defecto para aplicar las comisiones.
            </p>
          </div>
                                
          <div className="precedence-config">
                <div className="izq">
                                      <div className="default-commission-compact">
                                        <h4> Comisión por Defecto</h4>
                                        <p className="section-description">Si no se configuran comisiones, esta será la comision que se usará para todos las transacciones</p>
                                        <div className="compact-form">
                                          <div className="commission-input">
                                            <input
                                              type="number"
                                              step="0.1"
                                              min="0"
                                              max="100"
                                              value={defaultCommission}
                                              onChange={(e) => setDefaultCommission(parseFloat(e.target.value) || 0)}
                                            />
                                            <span className="currency-symbol">%</span>
                                          </div>
                                          <Button 
                                            variant="primary" 
                                            size="small"
                                            onClick={() => alert(`✅ Comisión por defecto guardada: ${defaultCommission}%`)}
                                          >
                                            Guardar
                                          </Button>
                                        </div>
                                        
                                      </div>


                                 <div className="default-commission-compact">
                                    <h4> Comisión adicional por promoción actvia</h4>
                                    <div className="compact-form">
                                      <div className="commission-input">
                                        <input
                                          type="number"
                                          step="0.1"
                                          min="0"
                                          max="100"
                                          value={defaultCommission}
                                          onChange={(e) => setDefaultCommission(parseFloat(e.target.value) || 0)}
                                        />
                                        <span className="currency-symbol">%</span>
                                      </div>
                                      <Button 
                                        variant="primary" 
                                        size="small"
                                        onClick={() => alert(`✅ Comisión por defecto guardada: ${defaultCommission}%`)}
                                      >
                                        Guardar
                                      </Button>
                                    </div>
                                  </div>

                </div>                      
                <div className="der">                 

                                      <div className="precedence-list-compact">
                                        <h4>📋 Orden de Precedencia</h4>
                                        <div className="precedence-items">
                                          {precedenceOrder.map((item, index) => (
                                            <div key={item.id} className="precedence-item-compact">
                                              <div className="precedence-order">{index + 1}</div>
                                              <div className="precedence-content">
                                                <span className="precedence-name">{item.name}</span>
                                              </div>
                                              <div className="precedence-controls">
                                                <button
                                                  className={`precedence-toggle ${item.active ? 'active' : 'inactive'}`}
                                                  onClick={() => {
                                                    setPrecedenceOrder(prev => prev.map(p => 
                                                      p.id === item.id ? { ...p, active: !p.active } : p
                                                    ));
                                                  }}
                                                >
                                                  {item.active ? 'Activa' : 'Inactiva'}
                                                </button>
                                                <div className="precedence-arrows">
                                                  {index > 0 && (
                                                    <button 
                                                      className="arrow-btn"
                                                      onClick={() => {
                                                        const newOrder = [...precedenceOrder];
                                                        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
                                                        setPrecedenceOrder(newOrder);
                                                      }}
                                                    >
                                                      ↑
                                                    </button>
                                                  )}
                                                  {index < precedenceOrder.length - 1 && (
                                                    <button 
                                                      className="arrow-btn"
                                                      onClick={() => {
                                                        const newOrder = [...precedenceOrder];
                                                        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
                                                        setPrecedenceOrder(newOrder);
                                                      }}
                                                    >
                                                      ↓
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                </div>                       
         </div> 
        </div>

        {/* Contenido según modo seleccionado */}
        {commissionMode === 'categoria' && (
          <div className="categories-list-section">
            <div className="section-header-with-selector">
              <div className="section-info">
                <h3>📂 Comisiones por Categoría Padre</h3>
                <p className="section-description">
                  Solo las categorías padre pueden tener comisiones configuradas. Las subcategorías heredan la comisión de su categoría padre.
                </p>
              </div>
              <div className="mode-selector-compact">
                <label>Tipo:</label>
                <select 
                  value={commissionMode} 
                  onChange={(e) => setCommissionMode(e.target.value)}
                  className="mode-dropdown-compact"
                >
                  <option value="categoria">Por Categoría</option>
                  <option value="general">Comisión General</option>
                </select>
              </div>
            </div>
            
            <div className="categories-table">
              <table className="professional-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Subcategorías</th>
                    <th>Productos</th>
                    <th>Comisión (%)</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategorias.map((categoria) => (
                    <tr key={categoria.id} className={!categoria.activa ? 'inactive-row' : ''}>
                      <td>
                        <span className="category-code">{categoria.codigo}</span>
                      </td>
                      <td>
                        <div className="category-name-cell">
                          <span className="category-name">{categoria.nombre}</span>
                          <span className="category-level">Nivel {categoria.nivel}</span>
                        </div>
                      </td>
                      <td>
                        <span className="subcategory-count">{categoria.totalSubcategorias}</span>
                      </td>
                      <td>
                        <span className="product-count">{categoria.productosAsignados.toLocaleString()}</span>
                      </td>
                      <td>
                        <div className="commission-input-cell">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={categoria.comisionBase}
                            onChange={(e) => actualizarComisionCategoria(categoria.id, parseFloat(e.target.value))}
                            className="commission-input-table"
                          />
                          <span>%</span>
                        </div>
                      </td>
                      <td>
                        <button
                          className={`status-badge ${categoria.activa ? 'active' : 'inactive'}`}
                          onClick={() => toggleCategoriaEstado(categoria.id)}
                        >
                          {categoria.activa ? 'Activa' : 'Inactiva'}
                        </button>
                      </td>
                      <td>
                        <Button 
                          variant="outline" 
                          size="small"
                          onClick={() => handleEditarCategoria(categoria)}
                        >
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  <span className="pagination-text">
                    Mostrando {startIndex + 1}-{Math.min(endIndex, categorias.length)} de {categorias.length} categorías
                  </span>
                </div>
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn prev" 
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                  >
                    ← Anterior
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        const isFirstLast = page === 1 || page === totalPages;
                        const isNearCurrent = Math.abs(page - currentPage) <= 1;
                        return isFirstLast || isNearCurrent;
                      })
                      .map((page, index, arr) => {
                        const prevPage = arr[index - 1];
                        const showDots = prevPage && page - prevPage > 1;
                        
                        return (
                          <React.Fragment key={page}>
                            {showDots && <span className="pagination-dots">...</span>}
                            <button
                              className={`pagination-btn number ${page === currentPage ? 'active' : ''}`}
                              onClick={() => goToPage(page)}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  
                  <button 
                    className="pagination-btn next" 
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {commissionMode === 'general' && (
          <div className="general-commission-section">
            <div className="section-header-with-selector">
              <div className="section-info">
                <h3>🌐 Comisión General</h3>
                <p className="section-description">
                  Aplica una comisión uniforme a todo el marketplace, sobrescribiendo las configuraciones individuales.
                </p>
              </div>
              <div className="mode-selector-compact">
                <label>Tipo:</label>
                <select 
                  value={commissionMode} 
                  onChange={(e) => setCommissionMode(e.target.value)}
                  className="mode-dropdown-compact"
                >
                  <option value="categoria">Por Categoría</option>
                  <option value="general">Comisión General</option>
                </select>
              </div>
            </div>
            
            <div className="general-config-compact">
              <div className="general-form-row">
                <div className="form-group-compact">
                  <label>Porcentaje de Comisión General</label>
                  <div className="commission-input-compact">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={generalCommission}
                      onChange={(e) => setGeneralCommission(parseFloat(e.target.value) || 0)}
                    />
                    <span className="currency-symbol">%</span>
                  </div>
                  <span className="field-help">
                    Este porcentaje se aplicará a todos los productos del marketplace
                  </span>
                </div>
                
                <div className="commission-simulator-compact">
                  <h5>💡 Simulador</h5>
                  <div className="simulator-example-compact">
                    <div className="example-row">
                      <span className="example-label">Producto $1,000:&nbsp;&nbsp; </span>
                      <span className="example-value commission">-${(1000 * generalCommission / 100).toFixed(0)} de comisión</span>
                    </div>
                    <div className="example-row total">
                      <span className="example-label">Ganancia al Seller:</span>
                      <span className="example-value">${(1000 - (1000 * generalCommission / 100)).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions-compact">
                <Button 
                  variant="primary"
                  size="small"
                  onClick={() => {
                    alert(`✅ Comisión general configurada: ${generalCommission}%`);
                  }}
                >
                  Guardar Comisión General
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* Modal de Editor */}
      {showEditor && (
        <div className="modal-overlay">
          <div className="modal-content editor-modal">
            <div className="modal-header">
              <h2>⚙️ Configuración de Comisión - {selectedCategoria?.nombre}</h2>
              <button 
                className="close-button" 
                onClick={() => setShowEditor(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="editor-form">
                <div className="category-info-section">
                  <h4>📂 Información de la Categoría</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Código</label>
                      <span className="info-value">{selectedCategoria?.codigo}</span>
                    </div>
                    <div className="info-item">
                      <label>Nombre</label>
                      <span className="info-value">{selectedCategoria?.nombre}</span>
                    </div>
                    <div className="info-item">
                      <label>Nivel</label>
                      <span className="info-value">Categoría Padre</span>
                    </div>
                    <div className="info-item">
                      <label>Subcategorías</label>
                      <span className="info-value">{selectedCategoria?.totalSubcategorias || 0}</span>
                    </div>
                    <div className="info-item">
                      <label>Productos Asignados</label>
                      <span className="info-value">{selectedCategoria?.productosAsignados?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="commission-config-section">
                  <h4>💰 Configuración de Comisión</h4>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Comisión Base (%)</label>
                      <div className="commission-input">
                        <input 
                          type="number" 
                          step="0.1"
                          min="0"
                          max="100"
                          defaultValue={selectedCategoria?.comisionBase || ''}
                        />
                        <span className="currency-symbol">%</span>
                      </div>
                      <span className="field-help">
                        Esta comisión se aplicará a todos los productos de esta categoría y sus subcategorías
                      </span>
                    </div>
                    
                    <div className="form-group">
                      <label>Fecha de Inicio</label>
                      <input 
                        type="date"
                        defaultValue={selectedCategoria?.fechaInicio || ''}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Fecha de Fin (opcional)</label>
                      <input 
                        type="date"
                        defaultValue={selectedCategoria?.fechaFin || ''}
                      />
                      <span className="field-help">
                        Dejar vacío para que la configuración sea permanente
                      </span>
                    </div>
                  </div>

                  <div className="commission-preview">
                    <h5>💡 Vista Previa</h5>
                    <div className="preview-example">
                      <div className="example-row">
                        <span className="example-label">Precio del producto:</span>
                        <span className="example-value">$1,000</span>
                      </div>
                      <div className="example-row">
                        <span className="example-label">Comisión ({selectedCategoria?.comisionBase || 0}%):</span>
                        <span className="example-value commission">-${((1000 * (selectedCategoria?.comisionBase || 0)) / 100).toFixed(0)}</span>
                      </div>
                      <div className="example-row total">
                        <span className="example-label">Ganancia del seller:</span>
                        <span className="example-value">${(1000 - ((1000 * (selectedCategoria?.comisionBase || 0)) / 100)).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowEditor(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  setShowEditor(false);
                  alert(`✅ Comisión actualizada para ${selectedCategoria?.nombre}`);
                }}
              >
                Guardar Configuración
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comisiones;