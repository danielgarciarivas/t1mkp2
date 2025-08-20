import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Logistica.css';

const Logistica = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('t1envios');
  const [useMarketplaceAccounts, setUseMarketplaceAccounts] = useState(false);
  const [allowBothOptions, setAllowBothOptions] = useState(true);
  
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
      useMarketplaceAccounts,
      allowBothOptions,
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
                className={`mode-tab ${activeTab === 't1envios' ? 'active' : ''}`}
                onClick={() => setActiveTab('t1envios')}
              >
                <span className="tab-icon">🚀</span>
                <span className="tab-text">T1Envíos</span>
                <span className="tab-description">Sellers usan sus propias cuentas T1Envíos</span>
              </button>
              <button 
                className={`mode-tab ${activeTab === 'marketplace' ? 'active' : ''}`}
                onClick={() => setActiveTab('marketplace')}
              >
                <span className="tab-icon">🏢</span>
                <span className="tab-text">Cuentas del Marketplace</span>
                <span className="tab-description">Sellers usan las cuentas del marketplace</span>
              </button>
              <button 
                className={`mode-tab ${activeTab === 'ambas' ? 'active' : ''}`}
                onClick={() => setActiveTab('ambas')}
              >
                <span className="tab-icon">⚖️</span>
                <span className="tab-text">Ambas Opciones</span>
                <span className="tab-description">Sellers pueden elegir entre ambas</span>
              </button>
            </div>
          </div>

          {/* Contenido según modo seleccionado */}
          <div className="mode-content">
            {activeTab === 't1envios' && (
              <div className="t1envios-mode">
                <div className="t1envios-mode-info">
                  <h4>🚀 T1Envíos</h4>
                  <p>Los sellers utilizarán sus propias cuentas de T1Envíos para generar guías de envío. El marketplace no interviene en el proceso logístico.</p>
                  
                  <div className="t1envios-benefits">
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Sin configuración adicional requerida</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Sellers mantienen control total</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>No hay costos adicionales para el marketplace</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div className="marketplace-mode">
                <div className="marketplace-mode-info">
                  <h4>🏢 Cuentas del Marketplace</h4>
                  <p>Configure las cuentas de mensajerías del marketplace para que los sellers puedan generar guías utilizando sus negociaciones.</p>
                  
                  <div className="marketplace-benefits">
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Control centralizado de envíos</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Mejores tarifas negociadas</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Oportunidad de generar ingresos adicionales</span>
                    </div>
                  </div>
                </div>

                {/* Configuración de mensajerías */}
                <div className="mensajerias-config">
                  <h5>📦 Configuración de Mensajerías</h5>
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

                {/* Tabulador de precios */}
                <div className="price-calculator">
                  <div className="price-calculator-header">
                    <h5>💰 Tabulador de Precios por Peso</h5>
                    <p>Configure los precios que cobrará a los sellers por cada rango de peso</p>
                  </div>

                  <div className="weight-ranges-table">
                    <div className="table-header">
                      <div className="table-cell">Rango de Peso (kg)</div>
                      <div className="table-cell">Precio Base</div>
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

            {activeTab === 'ambas' && (
              <div className="ambas-mode">
                <div className="ambas-mode-info">
                  <h4>⚖️ Ambas Opciones</h4>
                  <p>Los sellers podrán elegir entre usar T1Envíos o las cuentas del marketplace para generar sus guías de envío.</p>
                  
                  <div className="ambas-benefits">
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Máxima flexibilidad para sellers</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Opciones de precio competitivas</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">✅</span>
                      <span>Diversificación de servicios logísticos</span>
                    </div>
                  </div>
                </div>

                <div className="ambas-note">
                  <div className="note-icon">💡</div>
                  <div className="note-content">
                    <strong>Nota:</strong> Para ofrecer ambas opciones, debe configurar al menos una mensajería en la sección "Cuentas del Marketplace". Los sellers verán ambas opciones disponibles al momento de generar guías.
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