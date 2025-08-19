import React, { useState } from 'react';
import Button from '../../../components/common/Button';
import './ScoreTiendas.css';

const ScoreTiendas = () => {
  const [config, setConfig] = useState({
    // Configuración de métricas y ponderaciones
    metrics: {
      deliveryDelays: {
        enabled: true,
        weight: 50,
        description: 'Retrasos en entregas'
      },
      sellerCancellations: {
        enabled: true,
        weight: 30,
        description: 'Cancelaciones por seller'
      },
      claims: {
        enabled: true,
        weight: 20,
        description: 'Reclamos de clientes'
      }
    },
    // Umbrales de score por nivel (según PDF)
    thresholds: {
      excelente: { min: 90, max: 100, color: 'Verde Oscuro', label: 'Excelente' },
      muyBueno: { min: 80, max: 89, color: 'Verde Claro', label: 'Muy Bueno' },
      bueno: { min: 70, max: 79, color: 'Amarillo', label: 'Bueno' },
      regular: { min: 50, max: 69, color: 'Naranja', label: 'Regular' },
      critico: { min: 0, max: 49, color: 'Rojo', label: 'Crítico' }
    },
    // Políticas automáticas
    policies: {
      suspensionThreshold: 30,
      warningThreshold: 50,
      reviewThreshold: 70,
      notificationEnabled: true,
      automaticActions: true
    },
    // Configuración de cálculo
    calculation: {
      minimumOrders: 10,
      evaluationPeriod: 90, // días
      updateFrequency: 'daily' // daily, weekly, monthly
    }
  });

  const handleMetricWeightChange = (metric, weight) => {
    const newWeight = Math.max(0, Math.min(100, weight));
    setConfig(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metric]: {
          ...prev.metrics[metric],
          weight: newWeight
        }
      }
    }));
  };

  const handleThresholdChange = (level, field, value) => {
    setConfig(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [level]: {
          ...prev.thresholds[level],
          [field]: value
        }
      }
    }));
  };

  const handlePolicyChange = (policy, value) => {
    setConfig(prev => ({
      ...prev,
      policies: {
        ...prev.policies,
        [policy]: value
      }
    }));
  };

  const handleCalculationChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      calculation: {
        ...prev.calculation,
        [field]: value
      }
    }));
  };

  const getTotalWeight = () => {
    return Object.values(config.metrics).reduce((sum, metric) => sum + (metric.enabled ? metric.weight : 0), 0);
  };

  const isWeightValid = () => {
    return getTotalWeight() === 100;
  };

  const handleSaveConfig = () => {
    if (!isWeightValid()) {
      alert('La suma de ponderaciones debe ser exactamente 100%');
      return;
    }
    
    console.log('Guardando configuración de Score de Tiendas:', config);
    // Aquí iría la lógica para guardar la configuración
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Score de Tiendas</h1>
          <p className="module-subtitle">
            Configuración del sistema de puntuación y reputación de sellers
          </p>
        </div>
      </div>

      <div className="score-config-container">
        {/* Configuración de Métricas */}
        <div className="config-section">
          <div className="section-header">
            <h3>Métricas de Evaluación</h3>
            <p className="section-description">
              Configure las métricas que determinan el score de los sellers y su ponderación
            </p>
          </div>
          
          <div className="metrics-config">
            {Object.entries(config.metrics).map(([key, metric]) => (
              <div key={key} className="metric-item">
                <div className="metric-header">
                  <label className="metric-checkbox">
                    <input
                      type="checkbox"
                      checked={metric.enabled}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        metrics: {
                          ...prev.metrics,
                          [key]: { ...metric, enabled: e.target.checked }
                        }
                      }))}
                    />
                    <span className="metric-title">{metric.description}</span>
                  </label>
                </div>
                
                {metric.enabled && (
                  <div className="metric-weight">
                    <label>Ponderación:</label>
                    <div className="weight-input">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={metric.weight}
                        onChange={(e) => handleMetricWeightChange(key, parseInt(e.target.value) || 0)}
                      />
                      <span>%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="weight-summary">
              <div className={`total-weight ${isWeightValid() ? 'valid' : 'invalid'}`}>
                Total: {getTotalWeight()}%
                {!isWeightValid() && <span className="weight-error">Debe sumar 100%</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Umbrales */}
        <div className="config-section">
          <div className="section-header">
            <h3>Umbrales de Score por Nivel</h3>
            <p className="section-description">
              Defina los rangos de puntuación para cada nivel del sistema de termómetro
            </p>
          </div>
          
          <div className="thresholds-config">
            {Object.entries(config.thresholds).map(([key, threshold]) => (
              <div key={key} className="threshold-item">
                <div className="threshold-header">
                  <div className={`color-indicator ${threshold.color.toLowerCase().replace(' ', '-')}`}></div>
                  <span className="threshold-label">{threshold.label}</span>
                  <span className="threshold-color">({threshold.color})</span>
                </div>
                
                <div className="threshold-range">
                  <div className="range-input">
                    <label>Desde:</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={threshold.min}
                      onChange={(e) => handleThresholdChange(key, 'min', parseInt(e.target.value) || 0)}
                    />
                    <span>%</span>
                  </div>
                  
                  <div className="range-input">
                    <label>Hasta:</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={threshold.max}
                      onChange={(e) => handleThresholdChange(key, 'max', parseInt(e.target.value) || 0)}
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Políticas Automáticas */}
        <div className="config-section">
          <div className="section-header">
            <h3>Políticas Automáticas</h3>
            <p className="section-description">
              Configure las acciones automáticas basadas en el score de los sellers
            </p>
          </div>
          
          <div className="policies-config">
            <div className="form-grid">
              <div className="form-group">
                <label>Umbral de Suspensión Automática:</label>
                <div className="threshold-input">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={config.policies.suspensionThreshold}
                    onChange={(e) => handlePolicyChange('suspensionThreshold', parseInt(e.target.value) || 0)}
                  />
                  <span>% o menos</span>
                </div>
              </div>
              
              <div className="form-group">
                <label>Umbral de Alerta:</label>
                <div className="threshold-input">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={config.policies.warningThreshold}
                    onChange={(e) => handlePolicyChange('warningThreshold', parseInt(e.target.value) || 0)}
                  />
                  <span>% o menos</span>
                </div>
              </div>
              
              <div className="form-group">
                <label>Umbral de Revisión:</label>
                <div className="threshold-input">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={config.policies.reviewThreshold}
                    onChange={(e) => handlePolicyChange('reviewThreshold', parseInt(e.target.value) || 0)}
                  />
                  <span>% o menos</span>
                </div>
              </div>
            </div>
            
            <div className="policy-toggles">
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={config.policies.notificationEnabled}
                  onChange={(e) => handlePolicyChange('notificationEnabled', e.target.checked)}
                />
                <span>Enviar notificaciones automáticas</span>
              </label>
              
              <label className="toggle-option">
                <input
                  type="checkbox"
                  checked={config.policies.automaticActions}
                  onChange={(e) => handlePolicyChange('automaticActions', e.target.checked)}
                />
                <span>Ejecutar acciones automáticas</span>
              </label>
            </div>
          </div>
        </div>

      

        {/* Acciones */}
        <div className="config-actions">
          <Button 
            variant="primary"
            onClick={handleSaveConfig}
            disabled={!isWeightValid()}
          >
            Guardar Configuración
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => console.log('Previsualizar cambios')}
          >
            Previsualizar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScoreTiendas;