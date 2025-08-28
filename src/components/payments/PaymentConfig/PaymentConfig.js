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
  const [liquidationMode, setLiquidationMode] = useState('t1pagos');

  const frequencyOptions = [
    { value: 'diario', label: 'Diario', description: 'Liquidaciones procesadas cada día' },
    { value: 'semanal', label: 'Semanal', description: 'Liquidaciones procesadas una vez por semana' },
    { value: 'mensual', label: 'Mensual', description: 'Liquidaciones procesadas una vez por mes' }
  ];

  const weekDayOptions = [
    { value: 'lunes', label: 'Lunes' },
    { value: 'martes', label: 'Martes' },
    { value: 'miercoles', label: 'Miércoles' },
    { value: 'jueves', label: 'Jueves' },
    { value: 'viernes', label: 'Viernes' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
  ];

  const getMonthDayOptions = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11
    const currentYear = currentDate.getFullYear();
    
    // Obtener último día del mes actual
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    return Array.from({ length: lastDayOfMonth }, (_, i) => ({
      value: i + 1,
      label: `Día ${i + 1}`
    }));
  };

  const monthDayOptions = getMonthDayOptions();


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
    
    // Cambiar el modo cuando se cambie
    if (field === 'liquidationMode') {
      setLiquidationMode(value);
    }
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

  const handleOTPVerified = () => {
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


  const getNextLiquidationDate = () => {
    switch (config.frequency) {
      case 'diario':
        return 'Todos los días';
      case 'semanal':
        return config.weekDay ? `Todos los ${config.weekDay}` : 'Configurar día de la semana';
      case 'mensual':
        return config.monthDay ? `Todos los ${config.monthDay} del mes` : 'Configurar día del mes';
      default:
        return 'No configurado';
    }
  };

  const handleDownloadInterface = () => {
    // Lógica para descargar el archivo de interfaz
    console.log('Descargando interfaz de liquidaciones...');
  };

  const handleSendEmail = () => {
    // Lógica para enviar por correo
    console.log('Enviando interfaz por correo...');
  };

  return (
    <div className="payment-config-container">

      {/* Configuración de liquidaciones */}
      <div className="config-section">
        <div className="section-header">
          <h3>Configuración del Sistema de Liquidaciones</h3>
          <p className="section-description">
            Configure la frecuencia y condiciones para las liquidaciones automáticas a sellers
          </p>
        </div>

        <div className="liquidation-config-form">
          {/* Selector de modo de liquidación */}
          <div className="form-group">
            <label htmlFor="liquidationMode">Modo de Liquidación</label>
            <select
              id="liquidationMode"
              value={liquidationMode}
              onChange={(e) => {
                setLiquidationMode(e.target.value);
                handleConfigChange('liquidationMode', e.target.value);
              }}
              className="mode-selector"
            >
              <option value="t1pagos">Por medio de Cuenta fondeadora T1Pagos®</option>
              <option value="archivo">Archivo de Texto Plano</option>
              <option value="webhook">Webhook Json</option>
            </select>
            <span className="field-help">
              Seleccione el método de liquidación que desea utilizar para procesar los pagos a sellers
            </span>
          </div>

          {/* Contenido según modo seleccionado */}
          <div className="mode-content">
            {liquidationMode === 't1pagos' && (
              <div className="t1pagos-mode">
                
                {/* Configuración de cuenta bancaria - Solo en modo automático */}
                <div className="bank-config-section">
                  <h4>Configuración de Cuenta Bancaria del Marketplace</h4>
                  <p className="bank-description">
                    Configure la cuenta bancaria desde donde se realizarán las liquidaciones automáticas a los sellers
                  </p>

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
              </div>
            )}

            {liquidationMode === 'archivo' && (
              <div className="archivo-mode">
                {/* Configuración específica para archivo de texto */}
                <div className="bank-config-section archivo-config-section">
                  <h4>Configuración de Archivo de Texto Plano</h4>
                  <p className="archivo-description">
                    Configure el formato y ubicación donde se generarán los archivos de liquidación
                  </p>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="fileFormat">Formato del archivo:</label>
                      <select
                        id="fileFormat"
                        value={config.fileFormat || 'sears'}
                        onChange={(e) => handleConfigChange('fileFormat', e.target.value)}
                      >
                        <option value="sears">Compatible Sears/Sanborns</option>
                        <option value="csv">CSV Estándar</option>
                        <option value="txt">Texto Delimitado</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="downloadUrl">URL de descarga:</label>
                      <input
                        type="url"
                        id="downloadUrl"
                        value={config.downloadUrl || ''}
                        onChange={(e) => handleConfigChange('downloadUrl', e.target.value)}
                        placeholder="https://marketplace.com/downloads/"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {liquidationMode === 'webhook' && (
              <div className="webhook-mode">
                {/* Configuración específica para webhook */}
                <div className="bank-config-section webhook-config-section">
                  <h4>Configuración de Webhook JSON</h4>
                  <p className="webhook-description">
                    Configure la URL y parámetros para enviar las liquidaciones directamente a su sistema
                  </p>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="webhookUrl">URL del Webhook:</label>
                      <input
                        type="url"
                        id="webhookUrl"
                        value={config.webhookUrl || ''}
                        onChange={(e) => handleConfigChange('webhookUrl', e.target.value)}
                        placeholder="https://erp.empresa.com/api/liquidaciones"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="authToken">Token de Autenticación:</label>
                      <input
                        type="password"
                        id="authToken"
                        value={config.authToken || ''}
                        onChange={(e) => handleConfigChange('authToken', e.target.value)}
                        placeholder="Bearer token o API key"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="webhookTimeout">Timeout (segundos):</label>
                      <input
                        type="number"
                        id="webhookTimeout"
                        value={config.webhookTimeout || 30}
                        onChange={(e) => handleConfigChange('webhookTimeout', parseInt(e.target.value))}
                        min="5"
                        max="300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Configuración de frecuencia común para todos los modos */}
          <div className="frequency-config-section">
           
            
            <div className="form-grid">
              <div className="form-group"><br></br>
                <label>Frecuencia de Liquidaciones</label>
                 
            <p className="frequency-description">
              Configure cada cuándo se procesarán las liquidaciones, independientemente del modo seleccionado
            </p>

                <div className="frequency-compact">
                  {frequencyOptions.map(option => (
                    <label key={option.value} className="frequency-compact-option">
                      <input
                        type="radio"
                        value={option.value}
                        checked={config.frequency === option.value}
                        onChange={(e) => handleConfigChange('frequency', e.target.value)}
                      />
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
                
                {/* Input condicional para día específico */}
                {config.frequency === 'semanal' && (
                  <div className="conditional-input">
                    <label htmlFor="weekDay">Día de la semana</label>
                    <select
                      id="weekDay"
                      value={config.weekDay || ''}
                      onChange={(e) => handleConfigChange('weekDay', e.target.value)}
                    >
                      <option value="">Seleccionar día</option>
                      {weekDayOptions.map(day => (
                        <option key={day.value} value={day.value}>{day.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                {config.frequency === 'mensual' && (
                  <div className="conditional-input">
                    <label htmlFor="monthDay">Día del mes</label>
                    <select
                      id="monthDay"
                      value={config.monthDay || ''}
                      onChange={(e) => handleConfigChange('monthDay', e.target.value)}
                    >
                      <option value="">Seleccionar día</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Día {i + 1}
                        </option>
                      ))}
                    </select>
                    {config.monthDay >= 29 && (
                      <div className="warning-message">
                        <span className="warning-icon">⚠️</span>
                        <span className="warning-text">
                          Si selecciona día {config.monthDay}, en meses que no tengan este día (como febrero), 
                          la liquidación se realizará el último día del mes.
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Configuración común para ambos modos */}
          <div className="common-config">
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

                <div className="form-group">
                  <label htmlFor="liquidationTriggerAutomatic">Estatus para Detonar Liquidación con Guía Automática</label>
                  <select
                    id="liquidationTriggerAutomatic"
                    value={config.liquidationTriggerAutomatic || 'entregado'}
                    onChange={(e) => handleConfigChange('liquidationTriggerAutomatic', e.target.value)}
                  >
                    <option value="en_camino">En Camino</option>
                    <option value="entregado">Entregado</option>
                  </select>
                  <span className="field-help">
                    Seleccione en qué estatus del pedido se debe iniciar el proceso de liquidación automática
                  </span>
                </div>
                 <div className="form-group">
                  <label htmlFor="liquidationTriggerManual">Estatus para Detonar Liquidación con Guía Manual</label>
                  <select
                    id="liquidationTriggerManual"
                    value={config.liquidationTriggerManual || 'entregado_evidencia_aprobada'}
                    onChange={(e) => handleConfigChange('liquidationTriggerManual', e.target.value)}
                  >
                    <option value="en_camino">En Camino</option>
                    <option value="entregado">Entregado</option>
                    <option value="entregado_evidencia">Entregado con Evidencia de Entrega</option>
                    <option value="entregado_evidencia_aprobada">Entregado con Evidencia de Entrega aprobada</option>
                  </select>
                  <span className="field-help">
                    Seleccione en qué estatus del pedido se debe iniciar el proceso de liquidación manual
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de configuración */}
          <div className="config-summary" style={{fontSize: '14px'}}>
            <h5 style={{fontSize: '16px', fontWeight: '600', marginBottom: '16px'}}>Resumen de Configuración</h5>
            <div className="summary-grid" style={{gap: '12px'}}>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Frecuencia:</span>
                <span className="summary-value" style={{fontSize: '14px', fontWeight: '600', color: '#212529'}}>
                  {frequencyOptions.find(opt => opt.value === config.frequency)?.label}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Modo de Liquidación:</span>
                <span className="summary-value" style={{fontSize: '14px', fontWeight: '600', color: '#212529'}}>
                  {liquidationMode === 't1pagos' ? 'Cuenta fondeadora T1Pagos®' : 
                   liquidationMode === 'archivo' ? 'Archivo de Texto Plano' : 
                   'Webhook Json'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Monto Mínimo:</span>
                <span className="summary-value" style={{fontSize: '14px', fontWeight: '600', color: '#212529'}}>${config.minimumAmount.toLocaleString()} MXN</span>
              </div>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Días de Retención:</span>
                <span className="summary-value" style={{fontSize: '14px', fontWeight: '600', color: '#212529'}}>{config.retentionDays} días</span>
              </div>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Detonador Automático:</span>
                <span className="summary-value" style={{fontSize: '14px', fontWeight: '600', color: '#212529'}}>
                  {config.liquidationTriggerAutomatic === 'en_camino' ? 'En Camino' : 'Entregado'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Detonador Manual:</span>
                <span className="summary-value" style={{fontSize: '14px', fontWeight: '600', color: '#212529'}}>
                  {config.liquidationTriggerManual === 'en_camino' ? 'En Camino' :
                   config.liquidationTriggerManual === 'entregado' ? 'Entregado' :
                   config.liquidationTriggerManual === 'entregado_evidencia' ? 'Entregado con Evidencia' :
                   'Entregado con Evidencia Aprobada'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label" style={{fontSize: '12px', color: '#6c757d', textTransform: 'uppercase', fontWeight: '500'}}>Próxima Liquidación:</span>
                <span className="summary-value next-date" style={{fontSize: '14px', fontWeight: '600', color: '#007bff'}}>{getNextLiquidationDate()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Configuración de Facturación */}
      <div className="config-section">
        <div className="section-header">
          <h3>Facturación</h3>
          <p className="section-description">
            Configure las opciones de facturación automática para sellers después de liquidaciones, si activa esta opcion las facturas se generaran despues de la liquidcion con el proveedor configurado previamente.
          </p>
        </div>

        <div className="billing-config-form">
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.automaticBilling || false}
                onChange={(e) => handleConfigChange('automaticBilling', e.target.checked)}
              />
              <span className="checkbox-content">
                <span className="option-title">Facturación Automática</span>
                <span className="option-description">
                  Facturar automáticamente al seller después de liquidar y enviar por correo los XMLs y factura
                </span>
              </span>
            </label>
          </div>

          {config.automaticBilling && (
            <div className="billing-options">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={config.emailDelivery || false}
                    onChange={(e) => handleConfigChange('emailDelivery', e.target.checked)}
                  />
                  <span className="checkbox-content">
                    <span className="option-title">Envío por Correo Electrónico</span>
                    <span className="option-description">
                      Enviar automáticamente los XMLs y facturas por correo al seller
                    </span>
                  </span>
                </label>
              </div>

             
            </div>
          )}
          
        </div>
          <Button 
              variant="primary"
              onClick={handleSaveConfig}
            >
              Guardar Configuración de Liquidaciones
            </Button>
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