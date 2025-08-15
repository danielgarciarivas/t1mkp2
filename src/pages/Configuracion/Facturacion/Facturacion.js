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
          { id: 'finkok', nombre: 'Finkok', activo: true },
          { id: 'sw', nombre: 'SW Sapien', activo: true },
          { id: 'facturama', nombre: 'Facturama', activo: true },
          { id: 'digiempresa', nombre: 'Digiempresa', activo: true }
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
            Configuración del servicio de facturación electrónica automática
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
          
          {!configuracion.servicioActivo ? (
            <Button 
              variant="primary"
              onClick={activarServicio}
              disabled={activandoServicio}
            >
              {activandoServicio ? 'Activando...' : '🚀 Activar Servicio'}
            </Button>
          ) : (
            <Button 
              variant="danger"
              onClick={desactivarServicio}
            >
              ⏹️ Desactivar Servicio
            </Button>
          )}
        </div>
      </div>

      <div className="facturacion-section">
        {/* Panel de Estado General */}
        <div className="status-panel">
          <h2>Estado del Servicio</h2>
          <div className="status-grid">
            <div className={`status-card ${configuracion.servicioActivo ? 'active' : 'inactive'}`}>
              <div className="status-icon">🔧</div>
              <div className="status-info">
                <h3>Servicio de Facturación</h3>
                <p>{configuracion.servicioActivo ? 'Funcionando correctamente' : 'Inactivo'}</p>
              </div>
            </div>
            
            <div className={`status-card ${configuracion.pacConfigurado ? 'active' : 'inactive'}`}>
              <div className="status-icon">🏢</div>
              <div className="status-info">
                <h3>PAC Configurado</h3>
                <p>{configuracion.pacConfigurado ? 'Configuración válida' : 'Pendiente configuración'}</p>
              </div>
            </div>
            
            <div className={`status-card ${configuracion.certificadosValidos ? 'active' : 'inactive'}`}>
              <div className="status-icon">🔐</div>
              <div className="status-info">
                <h3>Certificados</h3>
                <p>{configuracion.certificadosValidos ? 'Certificados válidos' : 'Certificados pendientes'}</p>
              </div>
            </div>
          </div>
        </div>

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

        {/* Panel de Configuración */}
        <div className="config-panels">
          {/* Configuración PAC */}
          <div className="config-panel">
            <div className="panel-header">
              <h3>Configuración de PAC</h3>
              <Button 
                variant="outline" 
                size="small"
                onClick={() => setShowPacConfig(true)}
              >
                {configuracion.pacConfigurado ? 'Editar' : 'Configurar'}
              </Button>
            </div>
            <div className="panel-content">
              {configuracion.pacConfigurado ? (
                <div className="config-summary">
                  <div className="summary-item">
                    <span className="label">Proveedor:</span>
                    <span className="value">{configuracion.pac.proveedor || 'No configurado'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Usuario:</span>
                    <span className="value">{configuracion.pac.usuario || 'No configurado'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Estado:</span>
                    <span className={`status-badge ${configuracion.pac.activo ? 'active' : 'inactive'}`}>
                      {configuracion.pac.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="empty-config">
                  <p>No hay configuración de PAC establecida</p>
                  <small>Un PAC (Proveedor Autorizado de Certificación) es requerido para el timbrado de facturas.</small>
                </div>
              )}
            </div>
          </div>

          {/* Gestión de Certificados */}
          <div className="config-panel">
            <div className="panel-header">
              <h3>Certificados Digitales</h3>
              <Button 
                variant="outline" 
                size="small"
                onClick={() => setShowCertConfig(true)}
              >
                {configuracion.certificadosValidos ? 'Gestionar' : 'Cargar'}
              </Button>
            </div>
            <div className="panel-content">
              {configuracion.certificadosValidos ? (
                <div className="config-summary">
                  <div className="summary-item">
                    <span className="label">Emisor:</span>
                    <span className="value">{configuracion.certificados.emisor || 'No disponible'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Vigencia:</span>
                    <span className="value">{configuracion.certificados.vigencia || 'No disponible'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Estado:</span>
                    <span className={`status-badge ${configuracion.certificados.valido ? 'active' : 'inactive'}`}>
                      {configuracion.certificados.valido ? 'Válido' : 'Inválido'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="empty-config">
                  <p>No hay certificados cargados</p>
                  <small>Se requieren certificados digitales (.cer y .key) para firmar las facturas electrónicamente.</small>
                </div>
              )}
            </div>
          </div>

          {/* Configuración Fiscal */}
          <div className="config-panel">
            <div className="panel-header">
              <h3>Información Fiscal</h3>
              <Button 
                variant="outline" 
                size="small"
                onClick={() => {
                  // Abrir modal de configuración fiscal
                  alert('Función de configuración fiscal próximamente');
                }}
              >
                Configurar
              </Button>
            </div>
            <div className="panel-content">
              <div className="config-summary">
                <div className="summary-item">
                  <span className="label">RFC:</span>
                  <span className="value">{configuracion.configuracionFiscal.rfc || 'No configurado'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Razón Social:</span>
                  <span className="value">{configuracion.configuracionFiscal.razonSocial || 'No configurada'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Uso CFDI:</span>
                  <span className="value">{configuracion.configuracionFiscal.usoCFDI}</span>
                </div>
              </div>
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

      {/* Modal de Certificados */}
      {showCertConfig && (
        <div className="modal-overlay">
          <div className="modal-content cert-config-modal">
            <div className="modal-header">
              <h2>Gestión de Certificados Digitales</h2>
              <button 
                className="close-button" 
                onClick={() => setShowCertConfig(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="cert-form">
                <div className="form-group">
                  <label>Archivo de Certificado (.cer)</label>
                  <div className="file-upload">
                    <input type="file" accept=".cer" />
                    <Button variant="outline" size="small">Seleccionar Archivo</Button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Archivo de Llave Privada (.key)</label>
                  <div className="file-upload">
                    <input type="file" accept=".key" />
                    <Button variant="outline" size="small">Seleccionar Archivo</Button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Password de la Llave Privada</label>
                  <input 
                    type="password" 
                    placeholder="Password de la llave privada"
                  />
                </div>
              </div>
              
              <div className="cert-info">
                <h4>Información sobre Certificados:</h4>
                <ul>
                  <li>Los certificados digitales son emitidos por el SAT</li>
                  <li>Se requieren tanto el archivo .cer como el .key</li>
                  <li>La llave privada debe estar protegida con password</li>
                  <li>Los certificados tienen una vigencia limitada (generalmente 4 años)</li>
                  <li>Son necesarios para la firma digital de las facturas</li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  alert('Validando certificados...');
                }}
              >
                Validar Certificados
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
                      emisor: 'EMPRESA EJEMPLO SA DE CV',
                      vigencia: '2025-12-31'
                    }
                  }));
                  setShowCertConfig(false);
                }}
              >
                Cargar Certificados
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Facturacion;