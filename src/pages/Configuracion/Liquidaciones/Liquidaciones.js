import React, { useState, useEffect } from 'react';
import PaymentConfig from '../../../components/payments/PaymentConfig';
import './Liquidaciones.css';

const Liquidaciones = () => {
  const [liquidationConfig, setLiquidationConfig] = useState({
    frequency: 'each_10_days', // cada_10_dias, quincenal, mensual
    minimumAmount: 1000,
    retentionDays: 3,
    liquidationTrigger: 'entregado', // en_camino, entregado
    mode: 'automatic' // automatic, manual
  });
  
  const [marketplaceBankConfig, setMarketplaceBankConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBankConfig();
  }, []);

  const loadBankConfig = async () => {
    setLoading(true);
    
    // Simular carga de configuración bancaria
    setTimeout(() => {
      const mockBankConfig = {
        id: 1,
        accountName: 'SEARS2 OPERADORA MEXICO SA DE CV',
        bank: 'BBVA',
        clabe: '012320001252541754',
        currency: 'MXN',
        isActive: true,
        verificationStatus: 'verified',
        lastUpdated: '2025-01-15T10:30:00Z'
      };

      setMarketplaceBankConfig(mockBankConfig);
      setLoading(false);
    }, 500);
  };

  const handleConfigSave = (newConfig) => {
    setLiquidationConfig(newConfig);
    console.log('Configuración de liquidaciones guardada:', newConfig);
  };

  const handleBankConfigUpdate = (newBankConfig) => {
    setMarketplaceBankConfig(newBankConfig);
    console.log('Configuración bancaria actualizada:', newBankConfig);
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando configuración de liquidaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Configuración de Liquidaciones</h1>
          <p className="module-subtitle">
            Configure los parámetros de liquidación y cuentas bancarias del marketplace
          </p>
        </div>
      </div>

      <div className="liquidaciones-content">
        <PaymentConfig
          liquidationConfig={liquidationConfig}
          marketplaceBankConfig={marketplaceBankConfig}
          onConfigSave={handleConfigSave}
          onBankConfigUpdate={handleBankConfigUpdate}
        />
      </div>
    </div>
  );
};

export default Liquidaciones;