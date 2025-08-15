import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MetricCard from '../../components/common/MetricCard';
import Button from '../../components/common/Button';
import './SellerDetail.css';

// Taxonomía de categorías del ecosistema T1
const T1_CATEGORY_TAXONOMY = [
  {
    id: 'electronica',
    name: 'Electrónicos y Tecnología',
    icon: '📱',
    children: [
      {
        id: 'smartphones',
        name: 'Smartphones y Celulares',
        children: [
          { id: 'iphone', name: 'iPhone' },
          { id: 'samsung', name: 'Samsung' },
          { id: 'xiaomi', name: 'Xiaomi' },
          { id: 'huawei', name: 'Huawei' }
        ]
      },
      {
        id: 'computadoras',
        name: 'Computadoras y Laptops',
        children: [
          { id: 'laptops', name: 'Laptops' },
          { id: 'desktops', name: 'Computadoras de Escritorio' },
          { id: 'tablets', name: 'Tablets' }
        ]
      },
      {
        id: 'audio',
        name: 'Audio y Sonido',
        children: [
          { id: 'audifonos', name: 'Audífonos' },
          { id: 'bocinas', name: 'Bocinas' },
          { id: 'sistemas-audio', name: 'Sistemas de Audio' }
        ]
      }
    ]
  },
  {
    id: 'hogar',
    name: 'Hogar y Jardín',
    icon: '🏠',
    children: [
      {
        id: 'muebles',
        name: 'Muebles',
        children: [
          { id: 'sala', name: 'Muebles de Sala' },
          { id: 'recamara', name: 'Muebles de Recámara' },
          { id: 'comedor', name: 'Muebles de Comedor' },
          { id: 'oficina', name: 'Muebles de Oficina' }
        ]
      },
      {
        id: 'decoracion',
        name: 'Decoración',
        children: [
          { id: 'cuadros', name: 'Cuadros y Arte' },
          { id: 'plantas', name: 'Plantas y Macetas' },
          { id: 'textiles', name: 'Textiles para el Hogar' }
        ]
      },
      {
        id: 'jardin',
        name: 'Jardín y Exterior',
        children: [
          { id: 'herramientas-jardin', name: 'Herramientas de Jardín' },
          { id: 'muebles-exterior', name: 'Muebles de Exterior' }
        ]
      }
    ]
  },
  {
    id: 'moda',
    name: 'Moda y Accesorios',
    icon: '👗',
    children: [
      {
        id: 'ropa-dama',
        name: 'Ropa para Dama',
        children: [
          { id: 'vestidos', name: 'Vestidos' },
          { id: 'blusas', name: 'Blusas y Tops' },
          { id: 'pantalones-dama', name: 'Pantalones' },
          { id: 'faldas', name: 'Faldas' }
        ]
      },
      {
        id: 'ropa-caballero',
        name: 'Ropa para Caballero',
        children: [
          { id: 'camisas', name: 'Camisas' },
          { id: 'pantalones-caballero', name: 'Pantalones' },
          { id: 'trajes', name: 'Trajes' },
          { id: 'playeras', name: 'Playeras y Polos' }
        ]
      },
      {
        id: 'calzado',
        name: 'Calzado',
        children: [
          { id: 'zapatos-dama', name: 'Zapatos para Dama' },
          { id: 'zapatos-caballero', name: 'Zapatos para Caballero' },
          { id: 'deportivos', name: 'Calzado Deportivo' }
        ]
      }
    ]
  },
  {
    id: 'deportes',
    name: 'Deportes y Fitness',
    icon: '⚽',
    children: [
      {
        id: 'fitness',
        name: 'Fitness y Gimnasio',
        children: [
          { id: 'pesas', name: 'Pesas y Equipos' },
          { id: 'cardio', name: 'Equipos de Cardio' },
          { id: 'yoga', name: 'Yoga y Pilates' }
        ]
      },
      {
        id: 'deportes-acuaticos',
        name: 'Deportes Acuáticos',
        children: [
          { id: 'natacion', name: 'Natación' },
          { id: 'surf', name: 'Surf y Paddle' }
        ]
      }
    ]
  },
  {
    id: 'belleza',
    name: 'Belleza y Cuidado Personal',
    icon: '💄',
    children: [
      {
        id: 'maquillaje',
        name: 'Maquillaje',
        children: [
          { id: 'rostro', name: 'Maquillaje para Rostro' },
          { id: 'ojos', name: 'Maquillaje para Ojos' },
          { id: 'labios', name: 'Maquillaje para Labios' }
        ]
      },
      {
        id: 'cuidado-piel',
        name: 'Cuidado de la Piel',
        children: [
          { id: 'limpieza', name: 'Limpieza Facial' },
          { id: 'hidratacion', name: 'Hidratación' },
          { id: 'tratamientos', name: 'Tratamientos Especiales' }
        ]
      }
    ]
  }
];

const SellerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(null);
  const [activeTab, setActiveTab] = useState('datos-identidad');
  const [showContractModal, setShowContractModal] = useState(false);
  const [commission, setCommission] = useState(0);
  const [freepassEnabled, setFreepassEnabled] = useState(false);
  const [liquidationMode, setLiquidationMode] = useState('automatic'); // 'automatic' | 'manual'
  const [allowedCategories, setAllowedCategories] = useState(new Set());
  const [canSellInAllCategories, setCanSellInAllCategories] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

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
        6: 'inactivo',
        7: 'pendiente',
        8: 'activo'
      };
      
      const sellerNames = {
        1: 'TechStore Pro',
        2: 'Fashion Boutique',
        3: 'Home Decor Plus',
        4: 'Sports World',
        5: 'Beauty Corner',
        6: 'Electronics Hub',
        7: 'Garden Center Plus',
        8: 'Mega Sports Store'
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
        
        // Métricas del seller (solo para estados activo, suspendido, bloqueado, inactivo)
        metrics: ['activo', 'suspendido', 'bloqueado', 'inactivo'].includes(currentState) ? {
          porcentajeCancelacion: { value: '2.1%', change: '-0.5%', changeType: 'positive' },
          gmv: { value: '$45,230', change: '+15.2%', changeType: 'positive' },
          productosPublicados: { value: '156', change: '+8', changeType: 'positive' },
          comisionesGanadas: { value: '$3,250', change: '+12.8%', changeType: 'positive' },
          ticketPromedio: { value: '$320', change: '+12.3%', changeType: 'positive' }
        } : null,

        // Estado del contrato
        contratoFirmado: true,
        contratoMarketplace: false,
        freepassEnabled: parseInt(id) === 1 || parseInt(id) === 2, // Solo algunos sellers tienen freepass activo por defecto
        liquidationMode: parseInt(id) === 1 ? 'manual' : 'automatic', // Seller 1 usa modo manual por defecto
        documentos: {
          actaConstitutiva: { verificado: true },
          contratoSears: { verificado: true }
          
        }
      };
      
      setSeller(mockSeller);
      setCommission(3.5); // Comisión por defecto
      setFreepassEnabled(mockSeller.freepassEnabled);
      setLiquidationMode(mockSeller.liquidationMode);
      setLoading(false);
    }, 1000);
  };

  const handleCommissionSave = () => {
    console.log(`Guardando comisión ${commission}% para seller ${id}`);
    // Implementar guardado de comisión
  };

  const handleFreepassToggle = () => {
    const newFreepassState = !freepassEnabled;
    setFreepassEnabled(newFreepassState);
    setSeller(prev => ({
      ...prev,
      freepassEnabled: newFreepassState
    }));
    console.log(`Freepass ${newFreepassState ? 'activado' : 'desactivado'} para seller ${id}`);
  };

  const handleLiquidationModeChange = (mode) => {
    setLiquidationMode(mode);
    setSeller(prev => ({
      ...prev,
      liquidationMode: mode
    }));
    console.log(`Modo de liquidación cambiado a ${mode === 'automatic' ? 'automático' : 'manual'} para seller ${id}`);
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

  const handleCategoryToggle = (categoryId) => {
    if (canSellInAllCategories) return;
    
    const newAllowedCategories = new Set(allowedCategories);
    if (newAllowedCategories.has(categoryId)) {
      newAllowedCategories.delete(categoryId);
    } else {
      newAllowedCategories.add(categoryId);
    }
    setAllowedCategories(newAllowedCategories);
  };

  const handleExpandCategory = (categoryId) => {
    const newExpandedCategories = new Set(expandedCategories);
    if (newExpandedCategories.has(categoryId)) {
      newExpandedCategories.delete(categoryId);
    } else {
      newExpandedCategories.add(categoryId);
    }
    setExpandedCategories(newExpandedCategories);
  };

  const handleAllCategoriesToggle = () => {
    setCanSellInAllCategories(!canSellInAllCategories);
    if (!canSellInAllCategories) {
      setAllowedCategories(new Set());
    }
  };

  const saveCategorySettings = () => {
    console.log('Guardando configuración de categorías:', {
      canSellInAllCategories,
      allowedCategories: Array.from(allowedCategories)
    });
  };

  const renderCategoryTree = (categories, level = 0) => {
    return categories.map(category => {
      const isExpanded = expandedCategories.has(category.id);
      const isSelected = allowedCategories.has(category.id);
      const hasChildren = category.children && category.children.length > 0;
      const isParentLevel = level === 0;
      
      return (
        <div key={category.id} className={`category-item level-${level}`}>
          <div className="category-row">
            <div className="category-content">
              {hasChildren && (
                <button
                  className={`expand-button ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => handleExpandCategory(category.id)}
                >
                  {isExpanded ? '▼' : '▶'}
                </button>
              )}
              
              {!hasChildren && <div className="expand-spacer"></div>}
              
              <span className="category-icon">{category.icon || '📁'}</span>
              <span className="category-name">{category.name}</span>
            </div>
            
            {isParentLevel && (
              <div className="category-selection">
                <label className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCategoryToggle(category.id)}
                    disabled={canSellInAllCategories}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className="category-children">
              {renderCategoryTree(category.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
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
      {/* Cintillo de estado para tiendas suspendidas o bloqueadas */}
      {(seller.estado === 'suspendido' || seller.estado === 'bloqueado' || seller.estado === 'inactivo') && (
        <div className={`status-banner status-banner-${seller.estado}`}>
          <div className="status-banner-content">
            <span className="status-banner-icon">
              {seller.estado === 'suspendido' ? '⚠️' : 
               seller.estado === 'bloqueado' ? '🚫' : 
               seller.estado === 'inactivo' ? '😴' : '🚫'}
            </span>
            <div className="status-banner-text">
              <strong>
                {seller.estado === 'suspendido' ? 'Tienda Suspendida' : 
                 seller.estado === 'bloqueado' ? 'Tienda Bloqueada' :
                 seller.estado === 'inactivo' ? 'Tienda Inactiva' : 'Tienda Bloqueada'
                }
              </strong>
              <span>
                {seller.estado === 'suspendido' 
                  ? 'Esta tienda ha sido suspendida temporalmente y no puede realizar ventas.' 
                  : seller.estado === 'bloqueado'
                  ? 'Esta tienda ha sido bloqueada y requiere revisión administrativa.'
                  : seller.estado === 'inactivo'
                  ? 'Esta tienda está marcada como inactiva y no está operando actualmente.'
                  : 'Esta tienda ha sido bloqueada y requiere revisión administrativa.'
                }
              </span>
            </div>
          </div>
        </div>
      )}

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

      {/* Métricas del seller - Solo para estados activo, suspendido, bloqueado, inactivo */}
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
            Contrato y Acta
          </button>
          <button 
            className={`tab-button ${activeTab === 'configuracion' ? 'active' : ''}`}
            onClick={() => setActiveTab('configuracion')}
          >
            Configuración
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
                  <h4>CONTRATO</h4>
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

          {activeTab === 'configuracion' && (
            <div className="configuration-section">
              <h3>Configuraciones Avanzadas</h3>
              
              <div className="config-item">
                <div className="config-header">
                  <div className="config-info">
                    <h4>Freepass - Pase Libre</h4>
                    <p className="config-description">
                      Permite que los productos de esta tienda se sincronicen directamente al canal sin validaciones previas.
                      Los productos aparecerán como activos inmediatamente después de la sincronización.
                    </p>
                  </div>
                  <div className="toggle-container">
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={freepassEnabled}
                        onChange={handleFreepassToggle}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className={`config-status ${freepassEnabled ? 'active' : 'inactive'}`}>
                  <span className="status-indicator">
                    {freepassEnabled ? '✅' : '❌'}
                  </span>
                  <span className="status-text">
                    {freepassEnabled 
                      ? 'Freepass ACTIVADO - Los productos se publican sin validación' 
                      : 'Freepass DESACTIVADO - Los productos requieren validación'
                    }
                  </span>
                </div>

                {freepassEnabled && (
                  <div className="warning-notice">
                    <span className="warning-icon">⚠️</span>
                    <div className="warning-text">
                      <strong>Advertencia:</strong> Con el freepass activado, los productos de esta tienda se publicarán automáticamente sin pasar por el proceso de validación. Asegúrate de que esta tienda cumple con todos los estándares de calidad.
                    </div>
                  </div>
                )}
              </div>

              {/* Configuración de Categorías Permitidas */}
              <div className="config-item">
                <div className="config-header">
                  <div className="config-info">
                    <h4>Categorías Permitidas</h4>
                    <p className="config-description">
                      Configure qué categorías del ecosistema T1 puede utilizar este seller para sincronizar sus productos.
                      Solo las categorías padre (primer nivel) pueden ser seleccionadas.
                    </p>
                  </div>
                </div>
                
                <div className="all-categories-option">
                  <label className="all-categories-toggle">
                    <input
                      type="checkbox"
                      checked={canSellInAllCategories}
                      onChange={handleAllCategoriesToggle}
                    />
                    <span className="toggle-text">
                      <strong>Puede vender en todas las categorías</strong>
                    </span>
                  </label>
                  <p className="option-description">
                    Al activar esta opción, el seller podrá sincronizar productos en cualquier categoría del marketplace.
                  </p>
                </div>

                {!canSellInAllCategories && (
                  <div className="category-tree-container">
                    <h4>Seleccionar Categorías Específicas</h4>
                    <div className="category-tree">
                      {renderCategoryTree(T1_CATEGORY_TAXONOMY)}
                    </div>
                  </div>
                )}

                <div className="categories-summary">
                  <h4>Resumen de Configuración</h4>
                  {canSellInAllCategories ? (
                    <div className="summary-item all-allowed">
                      <span className="summary-icon">✅</span>
                      <span className="summary-text">
                        Este seller puede sincronizar productos en <strong>todas las categorías</strong> del marketplace.
                      </span>
                    </div>
                  ) : allowedCategories.size > 0 ? (
                    <div className="summary-item specific-categories">
                      <span className="summary-icon">📋</span>
                      <div className="summary-content">
                        <span className="summary-text">
                          Categorías permitidas ({allowedCategories.size}):
                        </span>
                        <div className="allowed-categories-list">
                          {Array.from(allowedCategories).map(categoryId => {
                            const category = T1_CATEGORY_TAXONOMY.find(cat => cat.id === categoryId);
                            return (
                              <span key={categoryId} className="category-tag">
                                {category?.icon} {category?.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="summary-item no-categories">
                      <span className="summary-icon">⚠️</span>
                      <span className="summary-text">
                        <strong>Sin categorías permitidas:</strong> Este seller no podrá sincronizar productos hasta que se configure al menos una categoría.
                      </span>
                    </div>
                  )}
                </div>

               
              </div>

              {/* Configuración de Modo de Liquidación */}
              <div className="config-item">
                <div className="config-header">
                  <div className="config-info">
                    <h4>Modo de Liquidación</h4>
                    <p className="config-description">
                      Configura si las liquidaciones para este seller se procesan automáticamente según la programación o requieren aprobación manual.
                    </p>
                  </div>
                </div>
                
                <div className="liquidation-mode-options">
                  <div className="mode-option-group">
                    <label className={`mode-option ${liquidationMode === 'automatic' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="liquidationMode"
                        value="automatic"
                        checked={liquidationMode === 'automatic'}
                        onChange={(e) => handleLiquidationModeChange(e.target.value)}
                      />
                      <div className="mode-content">
                        <div className="mode-header">
                          <span className="mode-icon">🤖</span>
                          <span className="mode-title">Automático</span>
                        </div>
                        <p className="mode-description">
                          Las liquidaciones se procesan automáticamente según la frecuencia configurada en el sistema.
                        </p>
                      </div>
                    </label>

                    <label className={`mode-option ${liquidationMode === 'manual' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="liquidationMode"
                        value="manual"
                        checked={liquidationMode === 'manual'}
                        onChange={(e) => handleLiquidationModeChange(e.target.value)}
                      />
                      <div className="mode-content">
                        <div className="mode-header">
                          <span className="mode-icon">👤</span>
                          <span className="mode-title">Manual por Aprobación</span>
                        </div>
                        <p className="mode-description">
                          Las liquidaciones requieren aprobación manual antes de ser procesadas.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className={`config-status ${liquidationMode === 'automatic' ? 'auto' : 'manual'}`}>
                  <span className="status-indicator">
                    {liquidationMode === 'automatic' ? '🤖' : '👤'}
                  </span>
                  <span className="status-text">
                    {liquidationMode === 'automatic' 
                      ? 'Modo AUTOMÁTICO - Las liquidaciones se procesan según programación' 
                      : 'Modo MANUAL - Las liquidaciones requieren aprobación previa'
                    }
                  </span>
                </div>

                {liquidationMode === 'manual' && (
                  <div className="info-notice">
                    <span className="info-icon">ℹ️</span>
                    <div className="info-text">
                      <strong>Información:</strong> Con el modo manual activado, tendrás que aprobar cada liquidación individualmente desde el módulo de pagos.
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de guardar configuración al final */}
               <div className="categories-actions">
                  <Button 
                    variant="primary"
                    onClick={saveCategorySettings}
                  >
                    Guardar Configuración
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