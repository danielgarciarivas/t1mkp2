import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MetricCard from '../../components/common/MetricCard';
import Button from '../../components/common/Button';
import './SellerDetail.css';

const SellerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(null);
  const [activeTab, setActiveTab] = useState('datos-identidad');
  const [showContractModal, setShowContractModal] = useState(false);
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    loadSellerDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadSellerDetail = async () => {
    setLoading(true);
    // Simular carga de datos del seller
    setTimeout(() => {
      // Determinar el estado basado en el ID para mostrar diferentes casos
      const sellerStates = {
        1: 'activo',
        2: 'activo', 
        3: 'pendiente',
        4: 'suspendido',
        5: 'bloqueado',
        6: 'inactivo'
      };
      
      const sellerNames = {
        1: 'TechStore Pro',
        2: 'Fashion Boutique',
        3: 'Home Decor Plus',
        4: 'Sports World',
        5: 'Beauty Corner',
        6: 'Electronics Hub'
      };
      
      const currentState = sellerStates[parseInt(id)] || 'activo';
      const currentName = sellerNames[parseInt(id)] || 'TechStore Pro';
      
      const mockSeller = {
        id: parseInt(id),
        nombre: currentName,
        email: 'contact@techstore.com',
        telefono: '+52 55 1234 5678',
        tipoPersona: 'Moral',
        tipoSociedad: 'Sociedad Anónima (SA)',
        estado: currentState,
        fechaSolicitud: '2024-01-15T10:30:00Z',
        
        // Datos Fiscales
        razonSocial: 'TECHSTORE PROFESIONAL SA DE CV',
        rfc: 'TSP980312ABC',
        regimen: 'Régimen Simplificado de Confianza',
        domicilioFiscal: 'HERRERA I CAIRO 56 Int. Nombre de la Colonia CENTRO, Col. CENTRO C.P 45880, JUANACATLAN, JALISCO',
        
        // Datos Bancarios
        nombreBanco: 'JUJAL COMERCIALIZADORA SAS DE CV',
        clabe: '012320001252541754',
        banco: 'BBVA',
        tipoCuenta: 'Cuenta Corriente',
        estadoCuenta: 'Verificado',
        
        // Datos de Identidad
        numeroContacto: '3310243041',
        
        // Métricas del seller (solo para estados activo, suspendido, bloqueado)
        metrics: ['activo', 'suspendido', 'bloqueado'].includes(currentState) ? {
          porcentajeCancelacion: { value: '2.1%', change: '-0.5%', changeType: 'positive' },
          gmv: { value: '$45,230', change: '+15.2%', changeType: 'positive' },
          productosPublicados: { value: '156', change: '+8', changeType: 'positive' },
          comisionesGanadas: { value: '$3,250', change: '+12.8%', changeType: 'positive' },
          ticketPromedio: { value: '$320', change: '+12.3%', changeType: 'positive' }
        } : null,

        // Estado del contrato
        contratoFirmado: true,
        contratoMarketplace: false,
        documentos: {
          actaConstitutiva: { verificado: true },
          contratoSears: { verificado: true },
          contratoSanborns: { verificado: true }
        }
      };
      
      setSeller(mockSeller);
      setCommission(3.5); // Comisión por defecto
      setLoading(false);
    }, 1000);
  };

  const handleCommissionSave = () => {
    console.log(`Guardando comisión ${commission}% para seller ${id}`);
    // Implementar guardado de comisión
  };

  const handleContractSign = () => {
    console.log('Firmando contrato del marketplace');
    setSeller(prev => ({
      ...prev,
      contratoMarketplace: true
    }));
    setShowContractModal(false);
  };

  const handleSellerAction = (action) => {
    console.log(`Acción: ${action} para seller ${id}`);
    
    switch (action) {
      case 'approve':
        setSeller(prev => ({
          ...prev,
          estado: 'activo',
          metrics: {
            porcentajeCancelacion: { value: '2.1%', change: '-0.5%', changeType: 'positive' },
            gmv: { value: '$45,230', change: '+15.2%', changeType: 'positive' },
            productosPublicados: { value: '156', change: '+8', changeType: 'positive' },
            comisionesGanadas: { value: '$3,250', change: '+12.8%', changeType: 'positive' },
            ticketPromedio: { value: '$320', change: '+12.3%', changeType: 'positive' }
          }
        }));
        break;
      case 'reject':
        setSeller(prev => ({
          ...prev,
          estado: 'rechazado'
        }));
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando detalles del seller...</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="module">
        <div className="error-container">
          <h2>Seller no encontrado</h2>
          <Button onClick={() => navigate('/sellers')}>
            Volver a la lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <div className="seller-header-info">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/sellers')}
              className="back-button"
            >
              ← Volver
            </Button>
            <div className="seller-title">
              <h1 className="module-title">{seller.nombre}</h1>
              <p className="module-subtitle">
                {seller.tipoPersona} • {seller.tipoSociedad}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones para sellers pendientes */}
        {seller.estado === 'pendiente' && (
          <div className="pending-actions">
            <Button 
              variant="success"
              onClick={() => handleSellerAction('approve')}
            >
              Aprobar Seller
            </Button>
            <Button 
              variant="danger"
              onClick={() => handleSellerAction('reject')}
            >
              Rechazar Seller
            </Button>
          </div>
        )}
      </div>

      {/* Métricas del seller - Solo para estados activo, suspendido, bloqueado */}
      {seller.metrics && (
        <div className="seller-metrics">
          <div className="metrics-grid">
            <MetricCard
              title="% Cancelación"
              value={seller.metrics.porcentajeCancelacion.value}
              change={seller.metrics.porcentajeCancelacion.change}
              changeType={seller.metrics.porcentajeCancelacion.changeType}
              icon="📊"
              loading={loading}
            />
            <MetricCard
              title="GMV"
              value={seller.metrics.gmv.value}
              change={seller.metrics.gmv.change}
              changeType={seller.metrics.gmv.changeType}
              icon="💰"
              loading={loading}
            />
            <MetricCard
              title="Productos Publicados"
              value={seller.metrics.productosPublicados.value}
              change={seller.metrics.productosPublicados.change}
              changeType={seller.metrics.productosPublicados.changeType}
              icon="📦"
              loading={loading}
            />
            <MetricCard
              title="Comisiones Ganadas"
              value={seller.metrics.comisionesGanadas.value}
              change={seller.metrics.comisionesGanadas.change}
              changeType={seller.metrics.comisionesGanadas.changeType}
              icon="🏆"
              loading={loading}
            />
            <MetricCard
              title="Ticket Promedio"
              value={seller.metrics.ticketPromedio.value}
              change={seller.metrics.ticketPromedio.change}
              changeType={seller.metrics.ticketPromedio.changeType}
              icon="🎯"
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Navegación por tabs */}
      <div className="seller-tabs">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'datos-identidad' ? 'active' : ''}`}
            onClick={() => setActiveTab('datos-identidad')}
          >
            Datos de Identidad
          </button>
          <button 
            className={`tab-button ${activeTab === 'informacion-bancaria' ? 'active' : ''}`}
            onClick={() => setActiveTab('informacion-bancaria')}
          >
            Información Bancaria
          </button>
          <button 
            className={`tab-button ${activeTab === 'informacion-fiscal' ? 'active' : ''}`}
            onClick={() => setActiveTab('informacion-fiscal')}
          >
            Información Fiscal
          </button>
          <button 
            className={`tab-button ${activeTab === 'comision' ? 'active' : ''}`}
            onClick={() => setActiveTab('comision')}
          >
            Comisión
          </button>
          <button 
            className={`tab-button ${activeTab === 'contrato' ? 'active' : ''}`}
            onClick={() => setActiveTab('contrato')}
          >
            Contrato
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'datos-identidad' && (
            <div className="identity-section">
              <h3>Usuario registrado</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>👤 Nombre</label>
                  <span>Rogelio González González</span>
                </div>
                <div className="info-item">
                  <label>✉️ Correo</label>
                  <span>{seller.email}</span>
                </div>
                <div className="info-item">
                  <label>📞 Número de contacto</label>
                  <span>{seller.numeroContacto}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'informacion-bancaria' && (
            <div className="banking-section">
              <div className="verification-status">
                <span className="verified-badge">Verificado</span>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>👤 Nombre</label>
                  <span>{seller.nombreBanco}</span>
                </div>
                <div className="info-item">
                  <label>🏦 CLABE Interbancaria</label>
                  <span>{seller.clabe}</span>
                  <div className="bank-logo">BBVA</div>
                </div>
              </div>
              <div className="account-statement">
                <h4>ESTADO DE CUENTA</h4>
                <div className="statement-preview">
                  {/* Aquí iría la imagen del estado de cuenta */}
                  <div className="document-placeholder">
                    📄 Estado de Cuenta Verificado
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'informacion-fiscal' && (
            <div className="fiscal-section">
              <div className="verification-status">
                <span className="verified-badge">Verificado por IA</span>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <label>⚖️ Tipo de persona</label>
                  <span>{seller.tipoPersona}</span>
                </div>
                <div className="info-item">
                  <label>🏛️ RFC</label>
                  <span>{seller.rfc}</span>
                </div>
                <div className="info-item">
                  <label>🏛️ Régimen Fiscal</label>
                  <span>{seller.regimen}</span>
                </div>
                <div className="info-item">
                  <label>📍 Domicilio fiscal</label>
                  <span>{seller.domicilioFiscal}</span>
                </div>
              </div>
              <div className="fiscal-document">
                <h4>CONSTITUCIÓN FISCAL</h4>
                <div className="document-preview">
                  <div className="document-placeholder">
                    📄 Constitución Fiscal Verificada
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comision' && (
            <div className="commission-section">
              <h3>Configuración de Comisión</h3>
              <div className="commission-form">
                <div className="form-group">
                  <label>Porcentaje de Comisión</label>
                  <div className="commission-input">
                    <input
                      type="number"
                      value={commission}
                      onChange={(e) => setCommission(e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="commission-info">
                  <p>Esta comisión se aplicará a todas las ventas del seller</p>
                  <p>Comisión actual: <strong>{commission}%</strong></p>
                </div>
                <Button 
                  variant="primary"
                  onClick={handleCommissionSave}
                >
                  Guardar Comisión
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'contrato' && (
            <div className="contract-section">
              <h3>Documentos legales</h3>
              <div className="documents-grid">
                <div className="document-item">
                  <div className="document-status verified">
                    <span className="status-badge">Verificado por IA</span>
                  </div>
                  <div className="document-preview">
                    <div className="document-placeholder">📄</div>
                  </div>
                  <h4>ACTA CONSTITUTIVA</h4>
                </div>

                <div className="document-item">
                  <div className="document-status verified">
                    <span className="status-badge">Verificado por IA</span>
                  </div>
                  <div className="document-preview">
                    <div className="document-placeholder">📄</div>
                  </div>
                  <h4>CONTRATO SEARS</h4>
                </div>

                <div className="document-item">
                  <div className="document-status verified">
                    <span className="status-badge">Verificado por IA</span>
                  </div>
                  <div className="document-preview">
                    <div className="document-placeholder">📄</div>
                  </div>
                  <h4>CONTRATO SANBORNS</h4>
                </div>
              </div>

              <div className="contract-actions">
                <div className="contract-status">
                  <h4>Estado del Contrato del Marketplace</h4>
                  <p>
                    {seller.contratoMarketplace 
                      ? '✅ Contrato firmado por ambas partes' 
                      : '⏳ Pendiente de firma del marketplace'
                    }
                  </p>
                </div>
                
                {!seller.contratoMarketplace && (
                  <Button 
                    variant="primary"
                    onClick={() => setShowContractModal(true)}
                  >
                    Firmar Contrato del Marketplace
                  </Button>
                )}

                <Button 
                  variant="secondary"
                  onClick={() => setShowContractModal(true)}
                >
                  Ver Contrato Completo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal del contrato */}
      {showContractModal && (
        <div className="contract-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Contrato del Marketplace</h3>
              <button 
                onClick={() => setShowContractModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="contract-preview">
                <h4>Contrato de Prestación de Servicios</h4>
                <div className="contract-text">
                  <p>Este contrato establece los términos y condiciones para la prestación de servicios de marketplace entre T1Marketplace y {seller.nombre}.</p>
                  <p><strong>Términos principales:</strong></p>
                  <ul>
                    <li>Comisión por venta: {commission}%</li>
                    <li>Tiempo de liquidación: 14 días</li>
                    <li>Soporte técnico incluido</li>
                    <li>Acceso a herramientas de analytics</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {!seller.contratoMarketplace && (
                <Button 
                  variant="primary"
                  onClick={handleContractSign}
                >
                  Firmar Electrónicamente
                </Button>
              )}
              <Button 
                variant="secondary"
                onClick={() => setShowContractModal(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDetail;