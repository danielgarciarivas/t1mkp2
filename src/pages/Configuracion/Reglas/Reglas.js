import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Reglas.css';

const Reglas = () => {
  const [loading, setLoading] = useState(true);
  const [reglas, setReglas] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedRegla, setSelectedRegla] = useState(null);
  const [activeTab, setActiveTab] = useState('productos');

  const tiposReglas = [
    { id: 'productos', label: 'Reglas de Productos', icon: '📦' },
    { id: 'precios', label: 'Políticas de Precios', icon: '💰' },
    { id: 'inventario', label: 'Reglas de Inventario', icon: '📊' },
    { id: 'sellers', label: 'Criterios de Sellers', icon: '🏪' }
  ];

  useEffect(() => {
    loadReglas();
  }, [activeTab]);

  const loadReglas = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockReglas = {
        productos: [
          {
            id: 1,
            nombre: 'Validación de Títulos',
            descripcion: 'Reglas para validar títulos de productos',
            marketplace: 'Sears',
            activa: true,
            prioridad: 1,
            condiciones: [
              { campo: 'titulo', operador: 'min_length', valor: '10' },
              { campo: 'titulo', operador: 'max_length', valor: '80' },
              { campo: 'titulo', operador: 'no_contains', valor: 'palabras_prohibidas' }
            ],
            acciones: [
              { tipo: 'rechazar', mensaje: 'Título no cumple con las especificaciones' },
              { tipo: 'solicitar_correccion', campo: 'titulo' }
            ]
          },
          {
            id: 2,
            nombre: 'Validación de Imágenes',
            descripcion: 'Requisitos mínimos para imágenes de productos',
            marketplace: 'Sears',
            activa: true,
            prioridad: 2,
            condiciones: [
              { campo: 'imagenes', operador: 'min_count', valor: '3' },
              { campo: 'imagen_principal', operador: 'min_resolution', valor: '800x600' },
              { campo: 'imagenes', operador: 'max_size', valor: '5MB' }
            ],
            acciones: [
              { tipo: 'rechazar', mensaje: 'Imágenes no cumplen requisitos mínimos' }
            ]
          }
        ],
        precios: [
          {
            id: 3,
            nombre: 'Control de Precios Competitivos',
            descripcion: 'Monitoreo de precios vs competencia',
            marketplace: 'Sears',
            activa: true,
            prioridad: 1,
            condiciones: [
              { campo: 'precio', operador: 'percentage_above_market', valor: '20' },
              { campo: 'categoria', operador: 'in', valor: 'electrodomesticos,electronica' }
            ],
            acciones: [
              { tipo: 'alertar_seller', mensaje: 'Precio por encima del mercado' },
              { tipo: 'sugerir_precio', valor: 'precio_promedio_mercado' }
            ]
          },
          {
            id: 7,
            nombre: 'Precios Mínimos por Categoría',
            descripcion: 'Control de precios mínimos según categoría',
            marketplace: 'Sears',
            activa: true,
            prioridad: 2,
            condiciones: [
              { campo: 'precio', operador: 'min_value', valor: '100' },
              { campo: 'categoria', operador: 'in', valor: 'electronica,electrodomesticos' }
            ],
            acciones: [
              { tipo: 'rechazar', mensaje: 'Precio por debajo del mínimo permitido' }
            ]
          }
        ],
        inventario: [
          {
            id: 4,
            nombre: 'Stock Mínimo Requerido',
            descripcion: 'Validación de inventario mínimo para publicar',
            marketplace: 'Sears',
            activa: true,
            prioridad: 1,
            condiciones: [
              { campo: 'stock', operador: 'min_value', valor: '5' },
              { campo: 'categoria', operador: 'in', valor: 'ropa,zapatos' }
            ],
            acciones: [
              { tipo: 'ocultar_producto', mensaje: 'Stock insuficiente' },
              { tipo: 'notificar_seller', mensaje: 'Reabastecer inventario' }
            ]
          },
          {
            id: 8,
            nombre: 'Control de Sobrestock',
            descripcion: 'Alertas para productos con exceso de inventario',
            marketplace: 'Sears',
            activa: true,
            prioridad: 3,
            condiciones: [
              { campo: 'stock', operador: 'max_value', valor: '1000' },
              { campo: 'ventas_ultimos_30_dias', operador: 'max_value', valor: '10' }
            ],
            acciones: [
              { tipo: 'alertar_seller', mensaje: 'Considerar promoción por exceso de inventario' }
            ]
          }
        ],
        sellers: [
          {
            id: 5,
            nombre: 'Seller de Alto Rendimiento',
            descripcion: 'Criterios para clasificar sellers premium',
            marketplace: 'Sears',
            activa: true,
            prioridad: 1,
            condiciones: [
              { campo: 'ventas_mensuales', operador: 'min_value', valor: '100000' },
              { campo: 'rating_promedio', operador: 'min_value', valor: '4.5' },
              { campo: 'tiempo_respuesta', operador: 'max_value', valor: '4' }
            ],
            acciones: [
              { tipo: 'asignar_categoria', valor: 'premium' },
              { tipo: 'reducir_comision', valor: '1' }
            ]
          },
          {
            id: 9,
            nombre: 'Control de Calidad Seller',
            descripcion: 'Monitoreo de calidad y servicio de sellers',
            marketplace: 'Sears',
            activa: true,
            prioridad: 2,
            condiciones: [
              { campo: 'rating_promedio', operador: 'min_value', valor: '3.0' },
              { campo: 'tiempo_respuesta', operador: 'max_value', valor: '24' }
            ],
            acciones: [
              { tipo: 'alertar_administrador', mensaje: 'Seller requiere seguimiento' },
              { tipo: 'solicitar_plan_mejora', valor: 'automatico' }
            ]
          }
        ]
      };
      
      setReglas(mockReglas);
      setLoading(false);
    }, 1000);
  };

  const handleCrearRegla = () => {
    setSelectedRegla(null);
    setShowEditor(true);
  };

  const handleEditarRegla = (regla) => {
    setSelectedRegla(regla);
    setShowEditor(true);
  };

  const toggleReglaEstado = (id) => {
    setReglas(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(regla => 
        regla.id === id ? { ...regla, activa: !regla.activa } : regla
      )
    }));
  };

  const getOperadorLabel = (operador) => {
    const operadores = {
      'min_length': 'Mínimo caracteres',
      'max_length': 'Máximo caracteres',
      'no_contains': 'No contiene',
      'min_count': 'Mínimo cantidad',
      'min_resolution': 'Resolución mínima',
      'max_size': 'Tamaño máximo',
      'percentage_above_market': '% sobre mercado',
      'in': 'Está en',
      'min_value': 'Valor mínimo',
      'max_value': 'Valor máximo'
    };
    return operadores[operador] || operador;
  };

  const getAccionLabel = (tipo) => {
    const acciones = {
      'rechazar': 'Rechazar',
      'solicitar_correccion': 'Solicitar corrección',
      'alertar_seller': 'Alertar seller',
      'sugerir_precio': 'Sugerir precio',
      'ocultar_producto': 'Ocultar producto',
      'notificar_seller': 'Notificar seller',
      'asignar_categoria': 'Asignar categoría',
      'reducir_comision': 'Reducir comisión',
      'requerir_express': 'Requerir express',
      'aplicar_tarifa_express': 'Aplicar tarifa express'
    };
    return acciones[tipo] || tipo;
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando motor de reglas...</p>
        </div>
      </div>
    );
  }

  const reglasActuales = reglas[activeTab] || [];

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Motor de Reglas de Negocio</h1>
          <p className="module-subtitle">
            Sistema configurable para establecer políticas automatizadas por marketplace
          </p>
        </div>
        
        <div className="module-actions">
          <Button 
            variant="primary"
            onClick={handleCrearRegla}
          >
            + Nueva Regla
          </Button>
        </div>
      </div>

      <div className="reglas-section">
        <div className="reglas-tabs">
          {tiposReglas.map((tipo) => (
            <button
              key={tipo.id}
              className={`tab-button ${activeTab === tipo.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tipo.id)}
            >
              <span className="tab-icon">{tipo.icon}</span>
              <span className="tab-label">{tipo.label}</span>
              <span className="tab-count">{reglas[tipo.id]?.length || 0}</span>
            </button>
          ))}
        </div>

        <div className="reglas-content">
          <div className="reglas-grid">
            {reglasActuales.map((regla) => (
              <div key={regla.id} className={`regla-card ${!regla.activa ? 'inactiva' : ''}`}>
                <div className="regla-header">
                  <div className="regla-info">
                    <h3>{regla.nombre}</h3>
                    <p>{regla.descripcion}</p>
                  </div>
                  <div className="regla-controls">
                    <span className="marketplace-badge">{regla.marketplace}</span>
                    <button
                      className={`estado-toggle ${regla.activa ? 'activo' : 'inactivo'}`}
                      onClick={() => toggleReglaEstado(regla.id)}
                    >
                      {regla.activa ? 'Activa' : 'Inactiva'}
                    </button>
                  </div>
                </div>

                <div className="regla-body">
                  <div className="regla-section">
                    <h4>Condiciones:</h4>
                    <div className="condiciones-list">
                      {regla.condiciones.map((condicion, index) => (
                        <div key={index} className="condicion-item">
                          <span className="condicion-campo">{condicion.campo}</span>
                          <span className="condicion-operador">{getOperadorLabel(condicion.operador)}</span>
                          <span className="condicion-valor">{condicion.valor}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="regla-section">
                    <h4>Acciones:</h4>
                    <div className="acciones-list">
                      {regla.acciones.map((accion, index) => (
                        <div key={index} className="accion-item">
                          <span className="accion-tipo">{getAccionLabel(accion.tipo)}</span>
                          {accion.mensaje && (
                            <span className="accion-detalle">"{accion.mensaje}"</span>
                          )}
                          {accion.valor && !accion.mensaje && (
                            <span className="accion-valor">{accion.valor}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="regla-footer">
                  <span className="prioridad-badge">Prioridad {regla.prioridad}</span>
                  <div className="regla-actions">
                    <Button 
                      variant="outline" 
                      size="small"
                      onClick={() => handleEditarRegla(regla)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => {
                        // Simular test de regla
                        alert(`Ejecutando test para: ${regla.nombre}`);
                      }}
                    >
                      Probar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reglasActuales.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">⚖️</div>
              <h3>No hay reglas configuradas</h3>
              <p>Crea la primera regla de {tiposReglas.find(t => t.id === activeTab)?.label.toLowerCase()}</p>
              <Button 
                variant="primary"
                onClick={handleCrearRegla}
              >
                + Crear Primera Regla
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Editor */}
      {showEditor && (
        <div className="modal-overlay">
          <div className="modal-content regla-editor-modal">
            <div className="modal-header">
              <h2>{selectedRegla ? 'Editar Regla' : 'Nueva Regla'}</h2>
              <button 
                className="close-button" 
                onClick={() => setShowEditor(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="editor-form">
                <div className="form-section">
                  <h3>Información General</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nombre de la Regla</label>
                      <input 
                        type="text" 
                        placeholder="Ej: Validación de títulos"
                        defaultValue={selectedRegla?.nombre || ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tipo de Regla</label>
                      <select defaultValue={activeTab}>
                        {tiposReglas.map(tipo => (
                          <option key={tipo.id} value={tipo.id}>{tipo.label}</option>
                        ))}
                      </select>
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
                      <label>Prioridad</label>
                      <select defaultValue={selectedRegla?.prioridad || 1}>
                        <option value="1">Alta (1)</option>
                        <option value="2">Media (2)</option>
                        <option value="3">Baja (3)</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label>Descripción</label>
                      <textarea 
                        placeholder="Describe el propósito de esta regla"
                        defaultValue={selectedRegla?.descripcion || ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Condiciones</h3>
                  <div className="condiciones-builder">
                    <div className="condicion-form">
                      <select>
                        <option value="titulo">Título</option>
                        <option value="precio">Precio</option>
                        <option value="stock">Stock</option>
                        <option value="categoria">Categoría</option>
                        <option value="imagenes">Imágenes</option>
                        <option value="descripcion">Descripción</option>
                      </select>
                      <select>
                        <option value="min_value">Valor mínimo</option>
                        <option value="max_value">Valor máximo</option>
                        <option value="equals">Igual a</option>
                        <option value="contains">Contiene</option>
                        <option value="in">Está en</option>
                      </select>
                      <input type="text" placeholder="Valor" />
                      <Button variant="outline" size="small">+ Agregar</Button>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Acciones</h3>
                  <div className="acciones-builder">
                    <div className="accion-form">
                      <select>
                        <option value="rechazar">Rechazar</option>
                        <option value="alertar_seller">Alertar seller</option>
                        <option value="ocultar_producto">Ocultar producto</option>
                        <option value="solicitar_correccion">Solicitar corrección</option>
                        <option value="asignar_categoria">Asignar categoría</option>
                      </select>
                      <input type="text" placeholder="Mensaje o valor" />
                      <Button variant="outline" size="small">+ Agregar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  alert('Probando regla...');
                }}
              >
                Probar Regla
              </Button>
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
                  loadReglas();
                }}
              >
                {selectedRegla ? 'Actualizar' : 'Crear'} Regla
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reglas;