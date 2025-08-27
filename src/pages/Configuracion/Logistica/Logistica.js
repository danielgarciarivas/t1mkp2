import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Logistica.css';

const Logistica = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('automatica');
  const [useT1Envios, setUseT1Envios] = useState(true); // true = T1Envios, false = Cuentas propias
  const [allowManualGuides, setAllowManualGuides] = useState(false);
  const [requireTrackingUrl, setRequireTrackingUrl] = useState(false);
  const [validateShippingData, setValidateShippingData] = useState(false);
  
  // Estados para splitting de paquetes
  const [splittingRules, setSplittingRules] = useState({
    categoryRules: [],
    savedRules: [
      {
        id: 1,
        categoryId: 'electronics',
        maxItems: 3,
        maxDimensions: { length: 40, width: 30, height: 15 },
        packageType: 'Caja con protección antiestática',
        allowMixing: false
      }
    ]
  });

  // Estado para regla temporal en edición
  const [currentRule, setCurrentRule] = useState({
    id: null,
    categoryId: '',
    maxItems: 5,
    maxDimensions: { length: 40, width: 30, height: 20 },
    packageType: 'Caja estándar',
    allowMixing: false
  });

  // Árbol de categorías del marketplace
  const marketplaceCategories = [
    {
      id: 'electronics',
      name: 'Electrónicos',
      children: [
        { id: 'smartphones', name: 'Smartphones' },
        { id: 'laptops', name: 'Laptops' },
        { id: 'audio', name: 'Audio y Video' },
        { id: 'gaming', name: 'Gaming' }
      ]
    },
    {
      id: 'fashion',
      name: 'Moda',
      children: [
        { id: 'clothing', name: 'Ropa' },
        { id: 'shoes', name: 'Calzado' },
        { id: 'accessories', name: 'Accesorios' },
        { id: 'jewelry', name: 'Joyería' }
      ]
    },
    {
      id: 'home',
      name: 'Hogar',
      children: [
        { id: 'furniture', name: 'Muebles' },
        { id: 'kitchen', name: 'Cocina' },
        { id: 'decoration', name: 'Decoración' },
        { id: 'garden', name: 'Jardín' }
      ]
    },
    {
      id: 'books',
      name: 'Libros y Medios',
      children: [
        { id: 'books', name: 'Libros' },
        { id: 'magazines', name: 'Revistas' },
        { id: 'dvd', name: 'DVD/Blu-ray' }
      ]
    },
    {
      id: 'sports',
      name: 'Deportes',
      children: [
        { id: 'fitness', name: 'Fitness' },
        { id: 'outdoor', name: 'Deportes al aire libre' },
        { id: 'team-sports', name: 'Deportes de equipo' }
      ]
    },
    {
      id: 'beauty',
      name: 'Belleza y Salud',
      children: [
        { id: 'skincare', name: 'Cuidado de la piel' },
        { id: 'makeup', name: 'Maquillaje' },
        { id: 'health', name: 'Salud' }
      ]
    }
  ];
  
  // Estados para mensajerías
  const [mensajerias, setMensajerias] = useState({
    fedex: { active: false, config: {} },
    dhl: { active: false, config: {} },
    ampm: { active: false, config: {} },
    paqueteexpress: { active: false, config: {} },
    noventa_y_nueve_mins: { active: false, config: {} },
    jt_express: { active: false, config: {} },
    ups: { active: false, config: {} }
  });

  // Estados para tabulador de precios
  const [weightRanges, setWeightRanges] = useState([
    { id: 1, minWeight: 0, maxWeight: 1, basePrice: 0, sellerPrice: 120 },
    { id: 2, minWeight: 1, maxWeight: 5, basePrice: 0, sellerPrice: 99 },
    { id: 3, minWeight: 5, maxWeight: 10, basePrice: 0, sellerPrice: 65 }
  ]);

  const mensajeriasData = {
    fedex: {
      name: 'FedEx',
      icon: '📦',
      fields: [
        { key: 'accountNumber', label: 'Número de Cuenta', type: 'text', required: true },
        { key: 'meterNumber', label: 'Meter Number', type: 'text', required: true },
        { key: 'userKey', label: 'User Key', type: 'text', required: true },
        { key: 'password', label: 'Password', type: 'password', required: true }
      ]
    },
    dhl: {
      name: 'DHL',
      icon: '🚚',
      fields: [
        { key: 'accountNumber', label: 'Número de Cuenta', type: 'text', required: true },
        { key: 'username', label: 'Usuario', type: 'text', required: true },
        { key: 'password', label: 'Contraseña', type: 'password', required: true },
        { key: 'siteId', label: 'Site ID', type: 'text', required: true }
      ]
    },
    ampm: {
      name: 'AMPM',
      icon: '⏰',
      fields: [
        { key: 'clientCode', label: 'Código de Cliente', type: 'text', required: true },
        { key: 'username', label: 'Usuario', type: 'text', required: true },
        { key: 'password', label: 'Contraseña', type: 'password', required: true }
      ]
    },
    paqueteexpress: {
      name: 'Paquete Express',
      icon: '📮',
      fields: [
        { key: 'clientId', label: 'ID de Cliente', type: 'text', required: true },
        { key: 'apiKey', label: 'API Key', type: 'text', required: true },
        { key: 'secretKey', label: 'Secret Key', type: 'password', required: true }
      ]
    },
    noventa_y_nueve_mins: {
      name: '99 Mins',
      icon: '⚡',
      fields: [
        { key: 'merchantId', label: 'Merchant ID', type: 'text', required: true },
        { key: 'apiKey', label: 'API Key', type: 'text', required: true },
        { key: 'secretKey', label: 'Secret Key', type: 'password', required: true }
      ]
    },
    jt_express: {
      name: 'J&T Express',
      icon: '🏃‍♂️',
      fields: [
        { key: 'customerCode', label: 'Código de Cliente', type: 'text', required: true },
        { key: 'apiKey', label: 'API Key', type: 'text', required: true },
        { key: 'secretKey', label: 'Secret Key', type: 'password', required: true },
        { key: 'username', label: 'Usuario', type: 'text', required: true }
      ]
    },
    ups: {
      name: 'UPS',
      icon: '🚛',
      fields: [
        { key: 'accountNumber', label: 'Número de Cuenta', type: 'text', required: true },
        { key: 'userId', label: 'User ID', type: 'text', required: true },
        { key: 'password', label: 'Password', type: 'password', required: true },
        { key: 'accessKey', label: 'Access Key', type: 'text', required: true }
      ]
    }
  };

  useEffect(() => {
    loadLogisticaConfig();
  }, []);

  const loadLogisticaConfig = async () => {
    setLoading(true);
    
    setTimeout(() => {
      // Simular carga de configuración
      setLoading(false);
    }, 1000);
  };

  const handleMensajeriaToggle = (mensajeria) => {
    setMensajerias(prev => ({
      ...prev,
      [mensajeria]: {
        ...prev[mensajeria],
        active: !prev[mensajeria].active
      }
    }));
  };

  const handleMensajeriaConfigChange = (mensajeria, field, value) => {
    setMensajerias(prev => ({
      ...prev,
      [mensajeria]: {
        ...prev[mensajeria],
        config: {
          ...prev[mensajeria].config,
          [field]: value
        }
      }
    }));
  };

  const addWeightRange = () => {
    const lastRange = weightRanges[weightRanges.length - 1];
    const newRange = {
      id: Date.now(),
      minWeight: lastRange.maxWeight,
      maxWeight: lastRange.maxWeight + 5,
      basePrice: 0,
      sellerPrice: 0
    };
    setWeightRanges([...weightRanges, newRange]);
  };

  const removeWeightRange = (id) => {
    if (weightRanges.length > 1) {
      setWeightRanges(weightRanges.filter(range => range.id !== id));
    }
  };

  const updateWeightRange = (id, field, value) => {
    setWeightRanges(weightRanges.map(range => 
      range.id === id ? { ...range, [field]: parseFloat(value) || 0 } : range
    ));
  };

  const calculateMargin = (range) => {
    if (range.basePrice === 0) return 0;
    return ((range.sellerPrice - range.basePrice) / range.basePrice * 100).toFixed(2);
  };


  const updateCurrentRule = (field, value) => {
    setCurrentRule(prev => ({ ...prev, [field]: value }));
  };

  const updateCurrentRuleDimensions = (dimension, value) => {
    setCurrentRule(prev => ({
      ...prev,
      maxDimensions: {
        ...prev.maxDimensions,
        [dimension]: parseInt(value) || 0
      }
    }));
  };

  const addNewRule = () => {
    setCurrentRule({
      id: Date.now(),
      categoryId: '',
      maxItems: 5,
      maxDimensions: { length: 40, width: 30, height: 20 },
      packageType: 'Caja estándar',
      allowMixing: false
    });
  };

  const saveCurrentRule = () => {
    if (!currentRule.categoryId) {
      alert('Por favor seleccione una categoría antes de guardar');
      return;
    }
    
    const newRule = {
      ...currentRule,
      id: currentRule.id || Date.now()
    };
    
    setSplittingRules(prev => ({
      ...prev,
      savedRules: [...prev.savedRules, newRule]
    }));

    // Reset current rule
    setCurrentRule({
      id: null,
      categoryId: '',
      maxItems: 5,
      maxDimensions: { length: 40, width: 30, height: 20 },
      packageType: 'Caja estándar',
      allowMixing: false
    });
  };

  const editSavedRule = (rule) => {
    setCurrentRule(rule);
    setSplittingRules(prev => ({
      ...prev,
      savedRules: prev.savedRules.filter(r => r.id !== rule.id)
    }));
  };

  const deleteSavedRule = (ruleId) => {
    setSplittingRules(prev => ({
      ...prev,
      savedRules: prev.savedRules.filter(rule => rule.id !== ruleId)
    }));
  };

  const cancelCurrentRule = () => {
    setCurrentRule({
      id: null,
      categoryId: '',
      maxItems: 5,
      maxDimensions: { length: 40, width: 30, height: 20 },
      packageType: 'Caja estándar',
      allowMixing: false
    });
  };

  const getCategoryName = (categoryId) => {
    for (const category of marketplaceCategories) {
      if (category.id === categoryId) {
        return category.name;
      }
      for (const child of category.children) {
        if (child.id === categoryId) {
          return `${category.name} > ${child.name}`;
        }
      }
    }
    return 'Seleccionar categoría...';
  };

  const getAllSelectableCategories = () => {
    const categories = [];
    marketplaceCategories.forEach(category => {
      // Add main category
      categories.push({ id: category.id, name: category.name, level: 0 });
      // Add subcategories
      category.children.forEach(child => {
        categories.push({ id: child.id, name: `${category.name} > ${child.name}`, level: 1 });
      });
    });
    return categories;
  };

  const saveConfiguration = () => {
    const config = {
      useT1Envios,
      allowManualGuides,
      requireTrackingUrl,
      validateShippingData,
      mensajerias,
      weightRanges,
      categoryPackagingRules: splittingRules.savedRules
    };
    console.log('Guardando configuración de logística:', config);
    alert('✅ Configuración de logística guardada exitosamente');
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando configuración de logística...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Configuración de Logística</h1>
          <p className="module-subtitle">
            Configure las opciones de envío y mensajerías para su marketplace
          </p>
        </div>
      </div>

      {/* Configuración de Tipo de Logística */}
      <div className="logistics-section">
        <div className="section-header">
          <h3>Opciones de Envío para Sellers</h3>
          <p className="section-description">
            Configure qué opciones de envío estarán disponibles para los sellers de su marketplace
          </p>
        </div>

        <div className="logistics-config-form">
          {/* Selector de modalidad principal */}
          <div className="mode-selector">
            <div className="mode-tabs">
              <button 
                className={`mode-tab ${activeTab === 'automatica' ? 'active' : ''}`}
                onClick={() => setActiveTab('automatica')}
              >
                <span className="tab-icon">⚡</span>
                <span className="tab-text">Guía Automática</span>
                <span className="tab-description">Configurar guías automáticas que se generan y envian al seller al momento de enviar la Orden al Sellercenter.</span>
              </button>
              <button 
                className={`mode-tab ${activeTab === 'manual' ? 'active' : ''}`}
                onClick={() => setActiveTab('manual')}
              >
                <span className="tab-icon">📋</span>
                <span className="tab-text">Guía Manual</span>
                <span className="tab-description">Permitir guías manuales generadas por sellers</span>
              </button>
            </div>
          </div>

          {/* Contenido según modo seleccionado */}
          <div className="mode-content">
            {activeTab === 'automatica' && (
              <div className="automatica-mode">
               {/* Configuración de mensajerías - Solo si es cuentas propias */}
               

                {/* Tabulador de precios - Siempre visible */}
                <div className="price-calculator">
                  <div className="price-calculator-header">
                    <h5>💰 Tabulador de Precios por Peso</h5>
                    <p>
                      {useT1Envios 
                        ? "Configure el fee que cobrará a los sellers por cada guía generada con T1 Envíos, Si configura esta opcion con cada pedido que se sincronice desde el marketplace al seller center, deberá llegar con una guia generada con T1envios.com"
                        : "Configure los precios que cobrará a los sellers por cada rango de peso usando sus cuentas de mensajería"
                      }
                    </p>
                  </div>

                  <div className="weight-ranges-table">
                    <div className="table-header">
                      <div className="table-cell">Rango de Peso (kg)</div>
                      <div className="table-cell">Precio al Seller</div>
                      <div className="table-cell">Acciones</div>
                    </div>

                    {weightRanges.map((range) => (
                      <div key={range.id} className="table-row">
                        <div className="table-cell weight-range">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={range.minWeight}
                            onChange={(e) => updateWeightRange(range.id, 'minWeight', e.target.value)}
                            className="weight-input"
                          />
                          <span>-</span>
                          <input
                            type="number"
                            step="0.1"
                            min={range.minWeight}
                            value={range.maxWeight}
                            onChange={(e) => updateWeightRange(range.id, 'maxWeight', e.target.value)}
                            className="weight-input"
                          />
                          <span>kg</span>
                        </div>
                     
                        <div className="table-cell">
                          <div className="currency-input">
                            <span className="currency-symbol">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={range.sellerPrice}
                              onChange={(e) => updateWeightRange(range.id, 'sellerPrice', e.target.value)}
                            />
                          </div>
                        </div>
                      
                        <div className="table-cell actions-cell">
                          <button
                            className="remove-range-btn"
                            onClick={() => removeWeightRange(range.id)}
                            disabled={weightRanges.length <= 1}
                            title="Eliminar rango"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="table-actions">
                    <Button 
                      variant="outline"
                      onClick={addWeightRange}
                    >
                      + Agregar Rango de Peso
                    </Button>
                  </div>
                </div>

                {/* Configuración de Agrupación por Categorías */}
                <div className="package-splitting-section">
                  <div className="section-header">
                    <div className="section-title-row">
                      <div className="section-title-content">
                        <h5>📦 Reglas de Agrupación por Categoría</h5>
                        <p>Configure la volumetría y cantidad máxima de productos que se pueden agrupar por categoría del marketplace</p>
                      </div>
                      <Button 
                        variant="outline"
                        size="small"
                        onClick={addNewRule}
                      >
                        + Agregar Regla
                      </Button>
                    </div>
                  </div>

                  <div className="unified-rules-container">
                    {/* Formulario de regla actual */}
                    {currentRule.id && (
                      <div className="current-rule-form">
                        <div className="form-header">
                          <h6>📂 Nueva Regla de Categoría</h6>
                          <button
                            className="cancel-rule-btn"
                            onClick={cancelCurrentRule}
                            title="Cerrar formulario"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="rule-content">
                          <div className="rule-row">
                            <div className="rule-field">
                              <label>Categoría del marketplace:</label>
                              <select
                                value={currentRule.categoryId}
                                onChange={(e) => updateCurrentRule('categoryId', e.target.value)}
                                className="rule-input-select"
                              >
                                <option value="">Seleccionar categoría...</option>
                                {getAllSelectableCategories().map((category) => (
                                  <option 
                                    key={category.id} 
                                    value={category.id}
                                    style={{ paddingLeft: category.level * 20 }}
                                  >
                                    {category.level === 1 ? '  └─ ' : ''}{category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="rule-field">
                              <label>Máximo productos por paquete:</label>
                              <input
                                type="number"
                                min="1"
                                max="50"
                                value={currentRule.maxItems}
                                onChange={(e) => updateCurrentRule('maxItems', parseInt(e.target.value) || 0)}
                                className="rule-input"
                              />
                            </div>
                          </div>
                          <div className="rule-row">
                            <div className="rule-field">
                              <label>Volumetría máxima del paquete (L x W x H cm):</label>
                              <div className="dimensions-inputs">
                                <input
                                  type="number"
                                  min="1"
                                  value={currentRule.maxDimensions.length}
                                  onChange={(e) => updateCurrentRuleDimensions('length', e.target.value)}
                                  className="dimension-input"
                                  placeholder="L"
                                />
                                <span>×</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={currentRule.maxDimensions.width}
                                  onChange={(e) => updateCurrentRuleDimensions('width', e.target.value)}
                                  className="dimension-input"
                                  placeholder="W"
                                />
                                <span>×</span>
                                <input
                                  type="number"
                                  min="1"
                                  value={currentRule.maxDimensions.height}
                                  onChange={(e) => updateCurrentRuleDimensions('height', e.target.value)}
                                  className="dimension-input"
                                  placeholder="H"
                                />
                              </div>
                            </div>
                          </div>
                       
                          <div className="rule-row">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={currentRule.allowMixing}
                                onChange={(e) => updateCurrentRule('allowMixing', e.target.checked)}
                              />
                              <span className="checkbox-content">
                                <span className="option-title">Permitir mezclar con otras categorías compatibles</span>
                                <span className="option-description">
                                  Productos de esta categoría pueden empacarse junto con productos de otras categorías que también tengan esta opción activada
                                </span>
                              </span>
                            </label>
                          </div>
                          <div className="rule-actions">
                            <Button
                              variant="secondary"
                              size="small"
                              onClick={saveCurrentRule}
                            >
                              ✅ Guardar Regla
                            </Button>
                            <Button
                              variant="outline"
                              size="small"
                              onClick={cancelCurrentRule}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Lista de reglas guardadas */}
                    <div className="saved-rules-section">
                      {splittingRules.savedRules.length > 0 && (
                        <div className="saved-rules-header">
                          <h6>📋 Reglas Configuradas ({splittingRules.savedRules.length})</h6>
                        </div>
                      )}
                      
                      {splittingRules.savedRules.length === 0 ? (
                        <div className="no-rules-message">
                          <p>No hay reglas configuradas. Agregue una nueva regla para comenzar.</p>
                        </div>
                      ) : (
                        <div className="saved-rules-list">
                          {splittingRules.savedRules.map((rule) => (
                            <div key={rule.id} className="saved-rule-item">
                              <div className="saved-rule-info">
                                <div className="saved-rule-category">
                                  <strong>📂 {getCategoryName(rule.categoryId)}</strong>
                                </div>
                                <div className="saved-rule-details">
                                  <span>Max {rule.maxItems} productos</span>
                                  <span>•</span>
                                  <span>{rule.maxDimensions.length}×{rule.maxDimensions.width}×{rule.maxDimensions.height} cm</span>
                                  <span>•</span>
                                  <span>{rule.packageType}</span>
                                  {rule.allowMixing && <span className="mixing-badge">🔀 Mezcla permitida</span>}
                                </div>
                              </div>
                              <div className="saved-rule-actions">
                                <Button
                                  variant="secondary"
                                  size="small"
                                  onClick={() => editSavedRule(rule)}
                                >
                                  Editar
                                </Button>
                                <Button
                                  variant="secondary"
                                  size="small"
                                  onClick={() => deleteSavedRule(rule.id)}
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manual' && (
              <div className="manual-mode">
                {/* Configuración de Guías Manuales */}
                <div className="manual-guides-section">
                  <div className="section-divider">
                    <h5>📋 Configuración de Guías Manuales</h5>
                    <p>Configure si los sellers pueden generar guías manuales con sus propios medios de envío</p>
                  </div>

                  <div className="manual-guides-config">
                    <div className="form-group">

                    <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled={true}
                          onChange={() => {}}
                        />
                        <span className="checkbox-content">
                          <span className="option-title">Permitir Guías T1Envios</span>
                          <span className="option-description">
                            Autorizar a los sellers a generar guías manuales desde su seller center con su cuenta de T1Envios (ésta opción siempre estará activa como opción al seller)
                          </span>
                        </span>
                      </label>


                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={allowManualGuides}
                          onChange={(e) => setAllowManualGuides(e.target.checked)}
                        />
                        <span className="checkbox-content">
                          <span className="option-title">Permitir Guías Manuales</span>
                          <span className="option-description">
                            Autorizar a los sellers a generar guías manuales desde su seller center con sus propios medios de envío
                          </span>
                        </span>
                      </label>
                    </div>

                    {allowManualGuides && (
                      <div className="manual-guides-info">
                        <div className="info-card">
                          <div className="info-header">
                            <span className="info-icon">📦</span>
                            <span className="info-title">Guías Manuales Habilitadas</span>
                          </div>
                          <div className="info-content">
                            <p>
                              Los sellers podrán seleccionar entre:
                            </p>
                            <ul className="shipping-options-list">
                              <li>
                                <strong>T1 Envíos:</strong> Usar la mensajería integrada del marketplace (DHL, FedEx, etc.)
                              </li>
                              <li>
                                <strong>Guía Propia:</strong> Generar guías manuales con sus propias paqueterías y medios de envío
                              </li>
                              <li>
                                <strong>Liquidaciones:</strong> Las liquidaciones dependeran que internamente se agreguen las evidencias de entrega correspondiente
                              </li>
                            </ul>
                            <div className="warning-note">
                              <span className="warning-icon">⚠️</span>
                              <span className="warning-text">
                                Con guías manuales, el seller es responsable del seguimiento y entrega del pedido
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="manual-guides-options">
                          <div className="form-group">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={requireTrackingUrl}
                                onChange={(e) => setRequireTrackingUrl(e.target.checked)}
                              />
                              <span className="checkbox-content">
                                <span className="option-title">Requerir URL de Rastreo / Evidencia de Entrega</span>
                                <span className="option-description">
                                  Obligar a los sellers a proporcionar una URL de rastreo válida cuando usen guías manuales
                                </span>
                              </span>
                            </label>
                          </div>

                          <div className="form-group">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={validateShippingData}
                                onChange={(e) => setValidateShippingData(e.target.checked)}
                              />
                              <span className="checkbox-content">
                                <span className="option-title">Validar Datos de Envío</span>
                                <span className="option-description">
                                  Validar que los sellers proporcionen número de guía, paquetería y fecha de envío en guías manuales
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <Button 
              variant="primary"
              onClick={saveConfiguration}
            >
              Guardar Configuración de Logística
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logistica;