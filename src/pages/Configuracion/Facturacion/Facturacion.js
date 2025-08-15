import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Facturacion.css';

const Facturacion = () => {
  const [loading, setLoading] = useState(true);
  const [configuracion, setConfiguracion] = useState(null);
  const [showPacConfig, setShowPacConfig] = useState(false);
  const [showCertConfig, setShowCertConfig] = useState(false);
  const [activandoServicio, setActivandoServicio] = useState(false);

  useEffect(() => {
    loadConfiguracion();
  }, []);

  const loadConfiguracion = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockConfiguracion = {
        servicioActivo: false,
        pacConfigurado: false,
        certificadosValidos: false,
        configuracionFiscal: {
          rfc: '',
          razonSocial: '',
          regimenFiscal: '',
          codigoPostal: '',
          usoCFDI: 'G03'
        },
        pac: {
          proveedor: '',
          usuario: '',
          password: '',
          urlTimbrado: '',
          urlCancelacion: '',
          activo: false
        },
        certificados: {
          certificado: null,
          llavePrivada: null,
          password: '',
          vigencia: null,
          emisor: '',
          valido: false
        },
        estadisticas: {
          facturasProcesadas: 1247,
          facturasExitosas: 1198,
          facturasError: 49,
          montoFacturado: 2456789.50,
          ultimoProceso: '2024-02-15T10:30:00Z'
        },
        proveedoresPac: [
          { id: 'Solupac', nombre: 'Solucpac', activo: true },
          { id: 'T1Pac', nombre: 'T1Factura', activo: true },
        ]
      };
      
      setConfiguracion(mockConfiguracion);
      setLoading(false);
    }, 1000);
  };

  const activarServicio = async () => {
    if (!configuracion.pacConfigurado) {
      alert('Primero debes configurar un PAC (Proveedor Autorizado de Certificación)');
      return;
    }
    
    if (!configuracion.certificadosValidos) {
      alert('Primero debes cargar certificados válidos');
      return;
    }

    setActivandoServicio(true);
    
    setTimeout(() => {
      setConfiguracion(prev => ({
        ...prev,
        servicioActivo: true
      }));
      setActivandoServicio(false);
      alert('Servicio de facturación automática activado exitosamente');
    }, 3000);
  };

  const desactivarServicio = () => {
    if (window.confirm('¿Estás seguro de desactivar el servicio de facturación automática?')) {
      setConfiguracion(prev => ({
        ...prev,
        servicioActivo: false
      }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    if (status) return '#28a745';
    return '#dc3545';
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando configuración de facturación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Facturación Automática</h1>
          <p className="module-subtitle">
            Configuración del servicio de facturación electrónica automática de las transacciones de los sellers de su Marketplace
          </p>
        </div>
        
        <div className="module-actions">
          <div className="service-status">
            <span 
              className={`status-indicator ${configuracion.servicioActivo ? 'active' : 'inactive'}`}
              style={{ backgroundColor: getStatusColor(configuracion.servicioActivo) }}
            ></span>
            <span className="status-text">
              {configuracion.servicioActivo ? 'Servicio Activo' : 'Servicio Inactivo'}
            </span>
          </div>
          
        </div>
      </div>

      <div className="facturacion-section">
        {/* Panel de Estado General */}
        

        {/* Estadísticas */}
        {configuracion.servicioActivo && (
          <div className="estadisticas-panel">
            <h2>Estadísticas de Facturación</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{configuracion.estadisticas.facturasProcesadas.toLocaleString()}</div>
                <div className="stat-label">Facturas Procesadas</div>
              </div>
              <div className="stat-item success">
                <div className="stat-number">{configuracion.estadisticas.facturasExitosas.toLocaleString()}</div>
                <div className="stat-label">Facturas Exitosas</div>
              </div>
              <div className="stat-item error">
                <div className="stat-number">{configuracion.estadisticas.facturasError}</div>
                <div className="stat-label">Facturas con Error</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{formatCurrency(configuracion.estadisticas.montoFacturado)}</div>
                <div className="stat-label">Monto Facturado</div>
              </div>
            </div>
            <div className="last-process">
              <p>Último procesamiento: {formatDate(configuracion.estadisticas.ultimoProceso)}</p>
            </div>
          </div>
        )}

        {/* Opciones de Configuración de Facturación */}
        <div className="billing-methods-section">
          <h2>Método de Facturación</h2>
          <p className="section-description">Seleccione una de las 2 opciones disponibles para configurar el sistema de facturación</p>
          
          <div className="billing-options">
            {/* Opción 1: PAC de Terceros */}
            <div className="billing-option-card">
              <div className="option-header">
                <div className="option-icon">🏛️</div>
                <div className="option-info">
                  <h3>PAC de Terceros</h3>
                  <p>Configure las credenciales de un proveedor PAC autorizado</p>
                </div>
                <Button 
                  variant="primary" 
                  onClick={() => setShowPacConfig(true)}
                >
                  {configuracion.pacConfigurado ? 'Configurado' : 'Configurar'}
                </Button>
              </div>
              <div className="option-details">
                <p>Seleccione su proveedor PAC e ingrese sus credenciales de acceso. Los certificados y llaves se manejan directamente por el proveedor PAC.</p>
                {configuracion.pacConfigurado && (
                  <div className="config-preview">
                    <span className="preview-label">Proveedor:</span>
                    <span className="preview-value">{configuracion.pac.proveedor || 'No configurado'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Opción 2: ERP con PAC Integrado */}
            <div className="billing-option-card">
              <div className="option-header">
                <div className="option-icon">🏢</div>
                <div className="option-info">
                  <h3>ERP con PAC Integrado</h3>
                  <p>Conecte con su sistema ERP que tiene un proveedor PAC integrado</p>
                </div>
                <Button 
                  variant="primary" 
                  onClick={() => setShowCertConfig(true)}
                >
                  {configuracion.certificadosValidos ? 'Configurado' : 'Configurar'}
                </Button>
              </div>
              <div className="option-details">
                <p>Proporcione los endpoints de timbrado y cancelación de su ERP. Su sistema ya debe tener configurado un proveedor PAC.</p>
                {configuracion.certificadosValidos && (
                  <div className="config-preview">
                    <span className="preview-label">Estado:</span>
                    <span className="preview-value">Endpoints configurados</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Información sobre PAC */}
          <div className="pac-info-section">
            <div className="info-card">
              <h4>📋 Información sobre PAC</h4>
              <ul>
                <li>Un PAC (Proveedor Autorizado de Certificación) es una entidad autorizada por el SAT</li>
                <li>Es necesario para el timbrado digital de facturas electrónicas</li>
                <li>Los certificados y llaves privadas se manejan directamente por el proveedor PAC</li>
                <li>No es necesario cargar certificados localmente - el PAC se encarga de esto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Configuración PAC */}
      {showPacConfig && (
        <div className="modal-overlay">
          <div className="modal-content pac-config-modal">
            <div className="modal-header">
              <h2>Configuración de PAC</h2>
              <button 
                className="close-button" 
                onClick={() => setShowPacConfig(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="pac-form">
                <div className="form-group">
                  <label>Proveedor PAC</label>
                  <select defaultValue={configuracion.pac.proveedor}>
                    <option value="">Selecciona un proveedor</option>
                    {configuracion.proveedoresPac.map(proveedor => (
                      <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Usuario PAC</label>
                  <input 
                    type="text" 
                    placeholder="Usuario del servicio PAC"
                    defaultValue={configuracion.pac.usuario}
                  />
                </div>
                
                <div className="form-group">
                  <label>Password PAC</label>
                  <input 
                    type="password" 
                    placeholder="Password del servicio PAC"
                    defaultValue={configuracion.pac.password}
                  />
                </div>
                
                <div className="form-group">
                  <label>URL de Timbrado</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    defaultValue={configuracion.pac.urlTimbrado}
                  />
                </div>
                
                <div className="form-group">
                  <label>URL de Cancelación</label>
                  <input 
                    type="url" 
                    placeholder="https://..."
                    defaultValue={configuracion.pac.urlCancelacion}
                  />
                </div>
              </div>
              
              <div className="pac-info">
                <h4>Información sobre PAC:</h4>
                <ul>
                  <li>Un PAC es un Proveedor Autorizado de Certificación autorizado por el SAT</li>
                  <li>Es necesario para el timbrado digital de facturas electrónicas</li>
                  <li>Cada proveedor tiene sus propias credenciales y URLs de servicio</li>
                  <li>Las credenciales son proporcionadas por el proveedor PAC contratado</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  alert('Probando conexión PAC...');
                }}
              >
                Probar Conexión
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowPacConfig(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  setConfiguracion(prev => ({
                    ...prev,
                    pacConfigurado: true,
                    pac: { ...prev.pac, activo: true }
                  }));
                  setShowPacConfig(false);
                }}
              >
                Guardar Configuración
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuración ERP */}
      {showCertConfig && (
        <div className="modal-overlay">
          <div className="modal-content erp-config-modal">
            <div className="modal-header">
              <h2>Configuración de ERP con PAC Integrado</h2>
              <button 
                className="close-button" 
                onClick={() => setShowCertConfig(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="erp-form">
                <div className="form-group">
                  <label>Endpoint de Timbrado</label>
                  <input 
                    type="url" 
                    placeholder="https://mi-erp.com/api/timbrar"
                    defaultValue={configuracion.pac.urlTimbrado}
                  />
                  <small>URL donde su ERP procesa las solicitudes de timbrado</small>
                </div>
                
                <div className="form-group">
                  <label>Endpoint de Cancelación</label>
                  <input 
                    type="url" 
                    placeholder="https://mi-erp.com/api/cancelar"
                    defaultValue={configuracion.pac.urlCancelacion}
                  />
                  <small>URL donde su ERP procesa las cancelaciones de facturas</small>
                </div>
                
                <div className="form-group">
                  <label>API Key / Token</label>
                  <input 
                    type="password" 
                    placeholder="Token de autenticación para su ERP"
                  />
                  <small>Token o API Key para autenticarse con su ERP</small>
                </div>

                <div className="form-group">
                  <label>Formato de Respuesta</label>
                  <select defaultValue="json">
                    <option value="json">JSON</option>
                    <option value="xml">XML</option>
                  </select>
                  <small>Formato en que su ERP devuelve las respuestas</small>
                </div>
              </div>
              
              <div className="erp-info">
                <h4>Información sobre ERP con PAC:</h4>
                <ul>
                  <li>Su ERP debe tener ya configurado un proveedor PAC</li>
                  <li>Los certificados y credenciales PAC se manejan en su ERP</li>
                  <li>Solo necesita proporcionar los endpoints de timbrado y cancelación</li>
                  <li>Su ERP se encarga de la comunicación con el PAC</li>
                  <li>Asegúrese de que los endpoints estén disponibles y seguros</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  alert('Probando conexión con ERP...');
                }}
              >
                Probar Conexión
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowCertConfig(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  setConfiguracion(prev => ({
                    ...prev,
                    certificadosValidos: true,
                    certificados: { 
                      ...prev.certificados, 
                      valido: true,
                      emisor: 'ERP CONFIGURADO',
                      vigencia: 'Manejado por ERP'
                    }
                  }));
                  setShowCertConfig(false);
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

export default Facturacion;