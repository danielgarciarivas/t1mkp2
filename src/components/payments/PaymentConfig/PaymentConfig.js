import React, { useState } from 'react';
import Button from '../../common/Button';
import OTPModal from '../OTPModal';
import './PaymentConfig.css';

const PaymentConfig = ({ 
  liquidationConfig, 
  marketplaceBankConfig,
  onConfigSave,
  onBankConfigUpdate 
}) => {
  const [config, setConfig] = useState(liquidationConfig);
  const [bankConfig, setBankConfig] = useState(marketplaceBankConfig || {
    accountName: '',
    bank: '',
    clabe: '',
    currency: 'MXN',
    isActive: false
  });
  const [showBankForm, setShowBankForm] = useState(!marketplaceBankConfig);
  const [validationErrors, setValidationErrors] = useState({});
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingBankConfig, setPendingBankConfig] = useState(null);

  const frequencyOptions = [
    { value: 'each_10_days', label: 'Cada 10 días (1, 11, 21)', description: 'Recomendado - Flujo de caja óptimo' },
    { value: 'quincenal', label: 'Quincenal (1-15, 16-30)', description: 'Tradicional - Bueno para control' },
    { value: 'mensual', label: 'Mensual (1-30)', description: 'Conservador - Mayor retención' }
  ];

  const modeOptions = [
    { value: 'automatic', label: 'Automático', description: 'Liquidaciones procesadas automáticamente según la frecuencia configurada' },
    { value: 'manual', label: 'Manual', description: 'Liquidaciones requieren aprobación manual antes del procesamiento' }
  ];

  const bankOptions = [
    'BBVA',
    'Santander',
    'Banamex',
    'Banorte',
    'HSBC',
    'Scotiabank',
    'Inbursa',
    'Azteca'
  ];

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBankConfigChange = (field, value) => {
    setBankConfig(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar errores de validación para este campo
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateBankConfig = () => {
    const errors = {};
    
    if (!bankConfig.accountName.trim()) {
      errors.accountName = 'El nombre de la cuenta es requerido';
    }
    
    if (!bankConfig.bank) {
      errors.bank = 'Seleccione un banco';
    }
    
    if (!bankConfig.clabe) {
      errors.clabe = 'La CLABE es requerida';
    } else if (bankConfig.clabe.length !== 18) {
      errors.clabe = 'La CLABE debe tener 18 dígitos';
    } else if (!/^\d{18}$/.test(bankConfig.clabe)) {
      errors.clabe = 'La CLABE debe contener solo números';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveConfig = () => {
    onConfigSave(config);
  };

  const handleSaveBankConfig = () => {
    if (validateBankConfig()) {
      const updatedBankConfig = {
        ...bankConfig,
        isActive: true,
        lastUpdated: new Date().toISOString()
      };
      
      // Guardar la configuración pendiente y mostrar modal OTP
      setPendingBankConfig(updatedBankConfig);
      setShowOTPModal(true);
    }
  };

  const handleOTPVerified = (otpCode) => {
    // Procesar la configuración bancaria después de la verificación OTP
    if (pendingBankConfig) {
      setBankConfig(pendingBankConfig);
      onBankConfigUpdate(pendingBankConfig);
      setShowBankForm(false);
      setPendingBankConfig(null);
    }
    setShowOTPModal(false);
  };

  const handleOTPCancelled = () => {
    setShowOTPModal(false);
    setPendingBankConfig(null);
  };

  const getFrequencyDescription = () => {
    const selected = frequencyOptions.find(opt => opt.value === config.frequency);
    return selected ? selected.description : '';
  };

  const getNextLiquidationDate = () => {
    const today = new Date();
    const day = today.getDate();
    
    switch (config.frequency) {
      case 'each_10_days':
        if (day <= 1) return '1';
        if (day <= 11) return '11';
        if (day <= 21) return '21';
        return '1 del próximo mes';
      case 'quincenal':
        if (day <= 1) return '1';
        if (day <= 15) return '15';
        return '1 del próximo mes';
      case 'mensual':
        return '1 del próximo mes';
      default:
        return 'No configurado';
    }
  };

  return (
    <div className="payment-config-container">
      {/* Configuración de cuenta bancaria */}
      <div className="config-section">
        <div className="section-header">
          <h3>Configuración de Cuenta Bancaria del Marketplace</h3>
          <p className="section-description">
            Configure la cuenta bancaria donde se recibirán los fondos antes de liquidar a los sellers
          </p>
        </div>

        {marketplaceBankConfig && !showBankForm ? (
          <div className="bank-config-display">
            <div className="bank-info-card">
              <div className="bank-header">
                <div className="bank-status verified">
                  <span className="status-icon">✅</span>
                  <span className="status-text">Cuenta Verificada</span>
                </div>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => setShowBankForm(true)}
                >
                  Editar
                </Button>
              </div>
              
              <div className="bank-details">
                <div className="bank-item">
                  <label>Nombre de la Cuenta:</label>
                  <span>{bankConfig.accountName}</span>
                </div>
                <div className="bank-item">
                  <label>Banco:</label>
                  <span>{bankConfig.bank}</span>
                </div>
                <div className="bank-item">
                  <label>CLABE Interbancaria:</label>
                  <span className="clabe-display">
                    {bankConfig.clabe.replace(/(\d{3})(\d{3})(\d{11})(\d{1})/, '$1 $2 $3 $4')}
                  </span>
                </div>
                <div className="bank-item">
                  <label>Moneda:</label>
                  <span>{bankConfig.currency}</span>
                </div>
                <div className="bank-item">
                  <label>Última Actualización:</label>
                  <span>{new Date(bankConfig.lastUpdated).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bank-config-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="accountName">Nombre de la Cuenta *</label>
                <input
                  type="text"
                  id="accountName"
                  value={bankConfig.accountName}
                  onChange={(e) => handleBankConfigChange('accountName', e.target.value)}
                  placeholder="Ej: SEARS OPERADORA MEXICO SA DE CV"
                  className={validationErrors.accountName ? 'error' : ''}
                />
                {validationErrors.accountName && (
                  <span className="error-message">{validationErrors.accountName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="bank">Banco *</label>
                <select
                  id="bank"
                  value={bankConfig.bank}
                  onChange={(e) => handleBankConfigChange('bank', e.target.value)}
                  className={validationErrors.bank ? 'error' : ''}
                >
                  <option value="">Seleccione un banco</option>
                  {bankOptions.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
                {validationErrors.bank && (
                  <span className="error-message">{validationErrors.bank}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="clabe">CLABE Interbancaria *</label>
                <input
                  type="text"
                  id="clabe"
                  value={bankConfig.clabe}
                  onChange={(e) => handleBankConfigChange('clabe', e.target.value.replace(/\D/g, '').slice(0, 18))}
                  placeholder="18 dígitos"
                  maxLength="18"
                  className={validationErrors.clabe ? 'error' : ''}
                />
                {validationErrors.clabe && (
                  <span className="error-message">{validationErrors.clabe}</span>
                )}
                <span className="field-help">
                  Ingrese los 18 dígitos de la CLABE interbancaria
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="currency">Moneda</label>
                <select
                  id="currency"
                  value={bankConfig.currency}
                  onChange={(e) => handleBankConfigChange('currency', e.target.value)}
                >
                  <option value="MXN">Peso Mexicano (MXN)</option>
                  <option value="USD">Dólar Americano (USD)</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <Button 
                variant="primary"
                onClick={handleSaveBankConfig}
              >
                Guardar Configuración Bancaria
              </Button>
              {marketplaceBankConfig && (
                <Button 
                  variant="ghost"
                  onClick={() => setShowBankForm(false)}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Configuración de liquidaciones */}
      <div className="config-section">
        <div className="section-header">
          <h3>Configuración del Sistema de Liquidaciones</h3>
          <p className="section-description">
            Configure la frecuencia y condiciones para las liquidaciones automáticas a sellers
          </p>
        </div>

        <div className="liquidation-config-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Frecuencia de Liquidaciones</label>
              <div className="frequency-options">
                {frequencyOptions.map(option => (
                  <div key={option.value} className="frequency-option">
                    <label className="radio-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={config.frequency === option.value}
                        onChange={(e) => handleConfigChange('frequency', e.target.value)}
                      />
                      <span className="radio-content">
                        <span className="option-title">{option.label}</span>
                        <span className="option-description">{option.description}</span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="frequency-info">
                <span className="info-label">Descripción:</span>
                <span className="info-text">{getFrequencyDescription()}</span>
              </div>
            </div>

            <div className="form-group">
              <label>Modalidad de Procesamiento</label>
              <div className="mode-options">
                {modeOptions.map(option => (
                  <div key={option.value} className="mode-option">
                    <label className="radio-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={config.mode === option.value}
                        onChange={(e) => handleConfigChange('mode', e.target.value)}
                      />
                      <span className="radio-content">
                        <span className="option-title">{option.label}</span>
                        <span className="option-description">{option.description}</span>
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row-scrollable">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minimumAmount">Monto Mínimo para Liquidar</label>
                  <div className="currency-input">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      id="minimumAmount"
                      value={config.minimumAmount}
                      onChange={(e) => handleConfigChange('minimumAmount', parseInt(e.target.value) || 0)}
                      min="0"
                      step="100"
                    />
                    <span className="currency-code">MXN</span>
                  </div>
                  <span className="field-help">
                    Solo se procesarán liquidaciones por montos iguales o superiores a este valor
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="retentionDays">Días de Retención</label>
                  <input
                    type="number"
                    id="retentionDays"
                    value={config.retentionDays}
                    onChange={(e) => handleConfigChange('retentionDays', parseInt(e.target.value) || 0)}
                    min="0"
                    max="30"
                  />
                  <span className="field-help">
                    Días que deben transcurrir después de entregado el pedido antes de liquidar
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de configuración */}
          <div className="config-summary">
            <h4>Resumen de Configuración</h4>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Frecuencia:</span>
                <span className="summary-value">
                  {frequencyOptions.find(opt => opt.value === config.frequency)?.label}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Modalidad:</span>
                <span className="summary-value">
                  {modeOptions.find(opt => opt.value === config.mode)?.label}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Monto Mínimo:</span>
                <span className="summary-value">${config.minimumAmount.toLocaleString()} MXN</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Días de Retención:</span>
                <span className="summary-value">{config.retentionDays} días</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Próxima Liquidación:</span>
                <span className="summary-value next-date">{getNextLiquidationDate()}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Button 
              variant="primary"
              onClick={handleSaveConfig}
            >
              Guardar Configuración de Liquidaciones
            </Button>
          </div>
        </div>
      </div>

      {/* Modal OTP para cambio de cuenta bancaria */}
      <OTPModal
        isOpen={showOTPModal}
        onClose={handleOTPCancelled}
        onVerify={handleOTPVerified}
        title="Verificación de Seguridad - Cambio de Cuenta Bancaria"
        message="Por seguridad, necesitamos verificar tu identidad antes de cambiar la cuenta bancaria del marketplace"
        phoneNumber="****5678"
      />
    </div>
  );
};

export default PaymentConfig;