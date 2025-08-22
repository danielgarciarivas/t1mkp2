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
    { id: 1, minWeight: 0, maxWeight: 1, basePrice: 0, sellerPrice: 0 },
    { id: 2, minWeight: 1, maxWeight: 5, basePrice: 0, sellerPrice: 0 },
    { id: 3, minWeight: 5, maxWeight: 10, basePrice: 0, sellerPrice: 0 }
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

  const saveConfiguration = () => {
    const config = {
      useT1Envios,
      allowManualGuides,
      requireTrackingUrl,
      validateShippingData,
      mensajerias,
      weightRanges
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
                <span className="tab-description">Configurar guías automáticas con T1Envíos o cuentas propias</span>
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
                <div className="automatica-mode-info">
                  <h4>⚡ Guía Automática</h4>
                  <p>Configure cómo los sellers generarán guías automáticamente en su seller center.</p>
                </div>

                {/* Selector de tipo de cuenta */}
                <div className="account-type-selector">
                  <div className="section-divider">
                    <h5>🔧 Tipo de Configuración</h5>
                    <p>Seleccione qué tipo de cuentas utilizarán los sellers para generar guías automáticas</p>
                  </div>

                  <div className="account-options">
                    <div className="form-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="accountType"
                          checked={useT1Envios}
                          onChange={() => setUseT1Envios(true)}
                        />
                        <span className="radio-content">
                          <span className="option-title">🚀 T1 Envíos</span>
                          <span className="option-description">
                            Los sellers usan sus propias cuentas de T1 Envíos. El marketplace puede configurar un fee por guía.
                          </span>
                        </span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="accountType"
                          checked={!useT1Envios}
                          onChange={() => setUseT1Envios(false)}
                        />
                        <span className="radio-content">
                          <span className="option-title">🏢 Cuentas Propias del Marketplace</span>
                          <span className="option-description">
                            Los sellers usan las cuentas de mensajerías configuradas por el marketplace.
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Configuración de mensajerías - Solo si es cuentas propias */}
                {!useT1Envios && (
                  <div className="mensajerias-config">
                    <div className="section-divider">
                      <h5>📦 Configuración de Mensajerías</h5>
                      <p>Configure las cuentas de mensajerías que estarán disponibles para los sellers</p>
                    </div>
                    
                    <div className="mensajerias-grid">
                      {Object.entries(mensajeriasData).map(([key, mensajeria]) => (
                        <div key={key} className={`mensajeria-card ${mensajerias[key].active ? 'active' : ''}`}>
                          <div className="mensajeria-header">
                            <div className="mensajeria-info">
                              <span className="mensajeria-icon">{mensajeria.icon}</span>
                              <h6>{mensajeria.name}</h6>
                            </div>
                            <label className="toggle-switch">
                              <input 
                                type="checkbox" 
                                checked={mensajerias[key].active}
                                onChange={() => handleMensajeriaToggle(key)}
                              />
                              <span className="toggle-slider"></span>
                            </label>
                          </div>

                          {mensajerias[key].active && (
                            <div className="mensajeria-form">
                              {mensajeria.fields.map(field => (
                                <div key={field.key} className="form-group">
                                  <label>{field.label} {field.required && <span className="required">*</span>}</label>
                                  <input
                                    type={field.type}
                                    value={mensajerias[key].config[field.key] || ''}
                                    onChange={(e) => handleMensajeriaConfigChange(key, field.key, e.target.value)}
                                    placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                    required={field.required}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tabulador de precios - Siempre visible */}
                <div className="price-calculator">
                  <div className="price-calculator-header">
                    <h5>💰 Tabulador de Precios por Peso</h5>
                    <p>
                      {useT1Envios 
                        ? "Configure el fee que cobrará a los sellers por cada guía generada con T1 Envíos"
                        : "Configure los precios que cobrará a los sellers por cada rango de peso usando sus cuentas de mensajería"
                      }
                    </p>
                  </div>

                  <div className="weight-ranges-table">
                    <div className="table-header">
                      <div className="table-cell">Rango de Peso (kg)</div>
                      <div className="table-cell">{useT1Envios ? 'Fee Base T1' : 'Precio Base'}</div>
                      <div className="table-cell">Precio al Seller</div>
                      <div className="table-cell">Margen (%)</div>
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
                              value={range.basePrice}
                              onChange={(e) => updateWeightRange(range.id, 'basePrice', e.target.value)}
                            />
                          </div>
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
                        <div className="table-cell margin-cell">
                          <span className={`margin-value ${calculateMargin(range) > 0 ? 'positive' : 'neutral'}`}>
                            {calculateMargin(range)}%
                          </span>
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