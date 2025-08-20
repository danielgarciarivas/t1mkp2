import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Comisiones.css';

const Comisiones = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [simulatorData, setSimulatorData] = useState({
    categoria: '',
    precio: ''
  });
  const [useGeneralCommission, setUseGeneralCommission] = useState(false);
  const [generalCommission, setGeneralCommission] = useState(8.0);

  useEffect(() => {
    loadComisiones();
  }, []);

  const loadComisiones = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockCategorias = [
        {
          id: 1,
          codigo: 'ELEC001',
          nombre: 'Electrónicos',
          nivel: 1,
          padre: null,
          comisionBase: 8.5,
          comisionMinima: 5.0,
          comisionMaxima: 12.0,
          fechaInicio: '2024-01-01T00:00:00Z',
          fechaFin: null,
          activa: true,
          subcategorias: [
            {
              id: 11,
              codigo: 'ELEC001001',
              nombre: 'Smartphones',
              nivel: 2,
              padre: 1,
              comisionBase: 7.0,
              comisionMinima: 5.0,
              comisionMaxima: 10.0,
              activa: true
            },
            {
              id: 12,
              codigo: 'ELEC001002',
              nombre: 'Laptops',
              nivel: 2,
              padre: 1,
              comisionBase: 9.0,
              comisionMinima: 6.0,
              comisionMaxima: 12.0,
              activa: true
            }
          ]
        },
        {
          id: 2,
          codigo: 'ROPA001',
          nombre: 'Ropa y Accesorios',
          nivel: 1,
          padre: null,
          comisionBase: 12.0,
          comisionMinima: 8.0,
          comisionMaxima: 15.0,
          fechaInicio: '2024-01-15T00:00:00Z',
          fechaFin: null,
          activa: true,
          subcategorias: [
            {
              id: 21,
              codigo: 'ROPA001001',
              nombre: 'Ropa Masculina',
              nivel: 2,
              padre: 2,
              comisionBase: 11.5,
              comisionMinima: 8.0,
              comisionMaxima: 14.0,
              activa: true
            },
            {
              id: 22,
              codigo: 'ROPA001002',
              nombre: 'Ropa Femenina',
              nivel: 2,
              padre: 2,
              comisionBase: 13.0,
              comisionMinima: 9.0,
              comisionMaxima: 16.0,
              activa: true
            }
          ]
        },
        {
          id: 3,
          codigo: 'HOGAR001',
          nombre: 'Hogar y Jardín',
          nivel: 1,
          padre: null,
          comisionBase: 10.0,
          comisionMinima: 7.0,
          comisionMaxima: 13.0,
          fechaInicio: '2024-02-01T00:00:00Z',
          fechaFin: null,
          activa: true,
          subcategorias: []
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

  const handleSimular = () => {
    if (!simulatorData.precio || !simulatorData.categoria) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    // Encontrar la categoría aplicable
    let categoriaAplicable = null;
    categorias.forEach(categoria => {
      if (categoria.nombre === simulatorData.categoria && categoria.activa) {
        categoriaAplicable = categoria;
      }
      // Buscar también en subcategorías
      categoria.subcategorias.forEach(sub => {
        if (sub.nombre === simulatorData.categoria && sub.activa) {
          categoriaAplicable = sub;
        }
      });
    });

    if (categoriaAplicable) {
      const precio = parseFloat(simulatorData.precio);
      const comisionFinal = categoriaAplicable.comisionBase;
      const montoComision = (precio * comisionFinal) / 100;
      const gananciaVendedor = precio - montoComision;

      alert(`Simulación de Comisión:\n\nCategoría: ${categoriaAplicable.nombre}\nPrecio: $${precio.toLocaleString()}\nComisión aplicada: ${comisionFinal}%\nMonto comisión: $${montoComision.toLocaleString()}\nGanancia vendedor: $${gananciaVendedor.toLocaleString()}`);
    } else {
      alert('No se encontró configuración de comisión para la categoría seleccionada');
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
            Configuración de comisiones por categoría del marketplace
          </p>
        </div>
        
        <div className="module-actions">
          <Button 
            variant="outline"
            onClick={() => setShowSimulator(true)}
          >
            🧮 Simulador
          </Button>
          <Button 
            variant="primary"
            onClick={() => setShowEditor(true)}
          >
            + Nueva Categoría
          </Button>
        </div>
      </div>

      <div className="comisiones-section">
        <div className="comisiones-stats">
          <div className="stat-card">
            <h3>{categorias.length}</h3>
            <p>Categorías Configuradas</p>
          </div>
          <div className="stat-card">
            <h3>{categorias.filter(c => c.activa).length}</h3>
            <p>Categorías Activas1</p>
          </div>
          <div className="stat-card">
            <h3>{(categorias.reduce((acc, c) => acc + c.comisionBase, 0) / categorias.length).toFixed(1)}%</h3>
            <p>Comisión Promedio</p>
          </div>
         
        </div>

        {/* Configuración de Tipo de Comisión */}
        <div className="commission-section">
          <div className="section-header">
            <h3>Configuración de Comisiones</h3>
            <p className="section-description">
              Configure cómo se aplicarán las comisiones en su marketplace
            </p>
          </div>

          <div className="commission-config-form">
            {/* Selector de modalidad principal */}
            <div className="mode-selector">
              <div className="mode-tabs">
                <button 
                  className={`mode-tab ${!useGeneralCommission ? 'active' : ''}`}
                  onClick={() => setUseGeneralCommission(false)}
                >
                  <span className="tab-icon">📊</span>
                  <span className="tab-text">Por Categoría</span>
                  <span className="tab-description">Comisiones específicas por categoría</span>
                </button>
                <button 
                  className={`mode-tab ${useGeneralCommission ? 'active' : ''}`}
                  onClick={() => setUseGeneralCommission(true)}
                >
                  <span className="tab-icon">🌐</span>
                  <span className="tab-text">Comisión General</span>
                  <span className="tab-description">Una comisión para todo el marketplace</span>
                </button>
              </div>
            </div>

            {/* Contenido según modo seleccionado */}
            <div className="mode-content">
              {!useGeneralCommission && (
                <div className="category-mode">
                  <div className="category-mode-info">
                    <h4>🎯 Comisiones por Categoría</h4>
                    <p>Configure comisiones específicas para cada categoría del marketplace, permitiendo optimizar márgenes según el tipo de producto.</p>
                    
                    <div className="category-benefits">
                      <div className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>Control granular por categoría</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>Optimización de márgenes</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>Estrategias diferenciadas</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {useGeneralCommission && (
                <div className="general-mode">
                  <div className="general-mode-info">
                    <h4>🌐 Comisión General</h4>
                    <p>Aplique una comisión uniforme a todas las categorías del marketplace, simplificando la gestión y manteniendo consistencia.</p>
                    
                    <div className="general-benefits">
                      <div className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>Configuración simple y rápida</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>Gestión unificada</span>
                      </div>
                      <div className="benefit-item">
                        <span className="benefit-icon">✅</span>
                        <span>Consistencia total</span>
                      </div>
                    </div>
                  </div>

                  {/* Configuración de comisión general */}
                  <div className="general-commission-config">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Porcentaje de Comisión General</label>
                        <div className="commission-input">
                          <span className="currency-symbol">%</span>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={generalCommission}
                            onChange={(e) => setGeneralCommission(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <span className="field-help">
                          Este porcentaje se aplicará a todos los productos del marketplace
                        </span>
                      </div>
                    </div>

                    {/* Simulador de comisión */}
                    <div className="commission-simulator">
                      <h5>💡 Simulador de Comisión</h5>
                      <div className="simulator-example">
                        <div className="example-row">
                          <span className="example-label">Precio del producto:</span>
                          <span className="example-value">$1,000</span>
                        </div>
                        <div className="example-row">
                          <span className="example-label">Comisión ({generalCommission}%):</span>
                          <span className="example-value commission">-${(1000 * generalCommission / 100).toFixed(0)}</span>
                        </div>
                        <div className="example-row total">
                          <span className="example-label">Ganancia del seller:</span>
                          <span className="example-value">${(1000 - (1000 * generalCommission / 100)).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <Button 
                        variant="primary"
                        onClick={() => {
                          console.log(`Guardando comisión general: ${generalCommission}%`);
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
          </div>
        </div>

        {!useGeneralCommission && (
          <div className="categorias-grid">
          {categorias.map((categoria) => (
            <div key={categoria.id} className={`categoria-card ${!categoria.activa ? 'inactiva' : ''}`}>
              <div className="categoria-header">
                <div className="categoria-info">
                  <h3>{categoria.nombre}</h3>
                  <span className="categoria-codigo">{categoria.codigo}</span>
                </div>
                <div className="categoria-controls">
                  <button
                    className={`estado-toggle ${categoria.activa ? 'activo' : 'inactivo'}`}
                    onClick={() => toggleCategoriaEstado(categoria.id)}
                  >
                    {categoria.activa ? 'Activa' : 'Inactiva'}
                  </button>
                </div>
              </div>

              <div className="comision-rates">
                <div className="rate-main">
                  <span className="rate-label">Comisión Base</span>
                  <div className="rate-control">
                    <input
                      type="number"
                      step="0.1"
                      value={categoria.comisionBase}
                      onChange={(e) => actualizarComisionCategoria(categoria.id, parseFloat(e.target.value))}
                      className="rate-input"
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="rate-range">
                  <div className="rate-item">
                    <span className="rate-label">Mínima</span>
                    <span className="rate-value">{categoria.comisionMinima}%</span>
                  </div>
                  <div className="rate-item">
                    <span className="rate-label">Máxima</span>
                    <span className="rate-value">{categoria.comisionMaxima}%</span>
                  </div>
                </div>
              </div>

              {categoria.subcategorias.length > 0 && (
                <div className="subcategorias-comisiones">
                  <h4>Subcategorías:</h4>
                  <div className="subcategorias-list">
                    {categoria.subcategorias.map((sub) => (
                      <div key={sub.id} className="subcategoria-item">
                        <div className="sub-info">
                          <span className="sub-nombre">{sub.nombre}</span>
                          <span className="sub-codigo">{sub.codigo}</span>
                        </div>
                        <div className="sub-comision">
                          <input
                            type="number"
                            step="0.1"
                            value={sub.comisionBase}
                            className="sub-rate-input"
                            readOnly
                          />
                          <span>%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="categoria-actions">
                <Button 
                  variant="outline" 
                  size="small"
                  onClick={() => handleEditarCategoria(categoria)}
                >
                  Configurar
                </Button>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => {
                    const precio = prompt('Ingresa un precio para simular:');
                    if (precio) {
                      const comisionCalculada = (parseFloat(precio) * categoria.comisionBase) / 100;
                      alert(`Simulación:\nCategoría: ${categoria.nombre}\nPrecio: $${parseFloat(precio).toLocaleString()}\nComisión: ${categoria.comisionBase}%\nMonto: $${comisionCalculada.toLocaleString()}`);
                    }
                  }}
                >
                  Simular
                </Button>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Modal de Simulador */}
      {showSimulator && (
        <div className="modal-overlay">
          <div className="modal-content simulator-modal">
            <div className="modal-header">
              <h2>Simulador de Comisiones</h2>
              <button 
                className="close-button" 
                onClick={() => setShowSimulator(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="simulator-form">
                <div className="form-group">
                  <label>Categoría *</label>
                  <select 
                    value={simulatorData.categoria}
                    onChange={(e) => setSimulatorData(prev => ({...prev, categoria: e.target.value}))}
                  >
                    <option value="">Selecciona categoría</option>
                    {categorias.map(categoria => (
                      <optgroup key={categoria.id} label={categoria.nombre}>
                        <option value={categoria.nombre}>{categoria.nombre} ({categoria.comisionBase}%)</option>
                        {categoria.subcategorias.map(sub => (
                          <option key={sub.id} value={sub.nombre}>
                            └─ {sub.nombre} ({sub.comisionBase}%)
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Precio del Producto *</label>
                  <input 
                    type="number"
                    placeholder="Ej: 15000"
                    step="0.01"
                    value={simulatorData.precio}
                    onChange={(e) => setSimulatorData(prev => ({...prev, precio: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="simulator-info">
                <h4>Información:</h4>
                <ul>
                  <li>El simulador calculará la comisión según la categoría seleccionada</li>
                  <li>Las subcategorías pueden tener comisiones diferentes a su categoría padre</li>
                  <li>Los campos marcados con * son obligatorios</li>
                  <li>El resultado mostrará el desglose completo de la comisión</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowSimulator(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSimular}
              >
                Calcular Comisión
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editor */}
      {showEditor && (
        <div className="modal-overlay">
          <div className="modal-content editor-modal">
            <div className="modal-header">
              <h2>{selectedCategoria ? 'Editar Comisión de Categoría' : 'Nueva Configuración de Comisión'}</h2>
              <button 
                className="close-button" 
                onClick={() => setShowEditor(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="editor-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Categoría</label>
                    <input 
                      type="text" 
                      value={selectedCategoria?.nombre || ''}
                      disabled
                      style={{ background: '#f8f9fa', color: '#6c757d' }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Código</label>
                    <input 
                      type="text" 
                      value={selectedCategoria?.codigo || ''}
                      disabled
                      style={{ background: '#f8f9fa', color: '#6c757d' }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Marketplace</label>
                    <input 
                      type="text" 
                      value="Sears"
                      disabled
                      style={{ background: '#f8f9fa', color: '#6c757d' }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Comisión Base (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="8.5"
                      defaultValue={selectedCategoria?.comisionBase || ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Comisión Mínima (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="5.0"
                      defaultValue={selectedCategoria?.comisionMinima || ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Comisión Máxima (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      placeholder="12.0"
                      defaultValue={selectedCategoria?.comisionMaxima || ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Fecha de Inicio</label>
                    <input 
                      type="date"
                      defaultValue={selectedCategoria?.fechaInicio ? selectedCategoria.fechaInicio.split('T')[0] : ''}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Fecha de Fin (opcional)</label>
                    <input 
                      type="date"
                      defaultValue={selectedCategoria?.fechaFin ? selectedCategoria.fechaFin.split('T')[0] : ''}
                    />
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
                  loadComisiones();
                }}
              >
                {selectedCategoria ? 'Actualizar' : 'Crear'} Configuración
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comisiones;