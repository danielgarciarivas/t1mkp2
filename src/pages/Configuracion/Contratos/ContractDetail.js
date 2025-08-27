import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../../components/common/Button';
import './ContractDetail.css';

const ContractDetail = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  useEffect(() => {
    loadContractDetail();
  }, [contractId]);

  const loadContractDetail = async () => {
    setLoading(true);
    
    // Try to get contract from location state first
    if (location.state?.contract) {
      setContract(location.state.contract);
      setEditedContent(location.state.contract.contenidoActual || '');
      setLoading(false);
      return;
    }
    
    // Otherwise simulate loading from API
    setTimeout(() => {
      const mockContract = {
        id: parseInt(contractId),
        numeroContrato: `CONT-2024-${String(contractId).padStart(3, '0')}`,
        nombre: 'Contrato Estándar Marketplace',
        tipo: 'manual',
        fechaUltimaActualizacion: '2024-02-10T14:20:00Z',
        tags: ['general', 'comisiones', 'pagos'],
        isMainContract: true,
        versiones: [
          {
            version: '1.2',
            fecha: '2024-02-10T14:20:00Z',
            cambios: 'Actualización de cláusulas de comisión',
            contenido: 'CONTRATO DE PRESTACIÓN DE SERVICIOS DE MARKETPLACE\n\nEste contrato establece los términos y condiciones bajo los cuales el Seller podrá ofrecer sus productos a través de la plataforma del Marketplace.\n\n1. OBJETO DEL CONTRATO\nEl presente contrato tiene por objeto establecer las bases comerciales y técnicas para la prestación de servicios de marketplace.\n\n2. COMISIONES\nEl Marketplace cobrará una comisión del 10% sobre las ventas realizadas a través de la plataforma.\n\n3. TÉRMINOS DE PAGO\nLos pagos se realizarán quincenalmente según el ciclo de liquidaciones establecido.'
          }
        ],
        contenidoActual: 'CONTRATO DE PRESTACIÓN DE SERVICIOS DE MARKETPLACE\n\nEntre T1 Marketplace, S.A. de C.V., en adelante denominada "EL MARKETPLACE", y el vendedor registrado, en adelante denominado "EL SELLER"\n\nCLÁUSULAS\n\nPRIMERA.- OBJETO DEL CONTRATO\nEL MARKETPLACE proporcionará al SELLER una plataforma digital para la comercialización de productos, facilitando la conexión entre el SELLER y los compradores finales.\n\nSEGUNDA.- COMISIONES\nEL MARKETPLACE cobrará una comisión del 12% sobre el valor total de cada venta realizada a través de la plataforma, más IVA correspondiente.\n\nTERCERA.- TÉRMINOS DE PAGO\nLos pagos se realizarán quincenalmente, los días 15 y último de cada mes, mediante transferencia bancaria a la cuenta registrada por EL SELLER.\n\nCUARTA.- POLÍTICAS DE DEVOLUCIÓN\nEL SELLER acepta y se compromete a cumplir con las políticas de devolución establecidas por EL MARKETPLACE, incluyendo reembolsos dentro de 30 días naturales.\n\nQUINTA.- RESPONSABILIDADES\nEL SELLER es responsable de la calidad, descripción veraz y entrega oportuna de los productos ofrecidos en la plataforma.\n\nSEXTA.- CONFIDENCIALIDAD\nAmbas partes se comprometen a mantener la confidencialidad de la información comercial intercambiada durante la vigencia del presente contrato.'
      };
      
      setContract(mockContract);
      setEditedContent(mockContract.contenidoActual || '');
      setLoading(false);
    }, 1000);
  };

  const handleSaveChanges = () => {
    if (!editedContent.trim()) {
      alert('El contenido del contrato no puede estar vacío');
      return;
    }

    // Create new version
    const newVersion = {
      version: incrementVersion(contract.versiones[0].version),
      fecha: new Date().toISOString(),
      cambios: 'Actualización manual del contenido',
      contenido: editedContent
    };

    // Update contract
    const updatedContract = {
      ...contract,
      contenidoActual: editedContent,
      fechaUltimaActualizacion: new Date().toISOString(),
      versiones: [newVersion, ...contract.versiones]
    };

    setContract(updatedContract);
    setIsEditing(false);
    alert('Contrato actualizado exitosamente');
  };

  const incrementVersion = (currentVersion) => {
    const parts = currentVersion.split('.');
    const major = parseInt(parts[0]);
    const minor = parseInt(parts[1]) + 1;
    return `${major}.${minor}`;
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

  const getCurrentVersion = () => {
    return contract?.versiones?.[0]?.version || '1.0';
  };

  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
  };

  const handleSetAsDefault = () => {
    if (window.confirm('¿Estás seguro de que quieres marcar este contrato como el predeterminado para Seller Center?')) {
      setContract(prev => ({ ...prev, isMainContract: true }));
      alert('Contrato marcado como predeterminado exitosamente');
    }
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando contrato...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="module">
        <div className="error-container">
          <h2>Contrato no encontrado</h2>
          <p>No se pudo encontrar el contrato solicitado</p>
          <Button onClick={() => navigate('/configuracion/contratos')}>
            Volver a Contratos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      {/* Header */}
      <div className="contract-detail-header">
        <div className="header-content">
          <button 
            onClick={() => navigate('/configuracion/contratos')}
            className="btn btn--secondary btn--small back-button"
          >
            ← Volver a Contratos
          </button>
          
          <div className="header-info">
            <h1 className="contract-title">{contract.nombre}</h1>
            <div className="contract-meta">
              <span>Contrato: {contract.numeroContrato}</span>
              <span>•</span>
              <span>Tipo: {contract.tipo === 'pdf' ? 'PDF' : 'Manual'}</span>
              <span>•</span>
              <span>Versión: v{getCurrentVersion()}</span>
              <span>•</span>
              <span>Última actualización: {formatDate(contract.fechaUltimaActualizacion)}</span>
            </div>
            <div className="contract-tags">
              {contract.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
              {contract.isMainContract && (
                <span className="main-badge">Principal</span>
              )}
            </div>
          </div>
          
          <div className="header-actions">
            <Button 
              variant="outline" 
              size="small"
              onClick={() => setShowVersionHistory(!showVersionHistory)}
            >
              Ver Historial
            </Button>
            
            {!contract.isMainContract && (
              <Button 
                variant="secondary" 
                size="small"
                onClick={handleSetAsDefault}
              >
                Marcar como Principal
              </Button>
            )}
            
            {contract.tipo === 'manual' && (
              <>
                {isEditing ? (
                  <>
                    <Button 
                      variant="primary" 
                      size="small"
                      onClick={handleSaveChanges}
                    >
                      Guardar Cambios
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedContent(contract.contenidoActual);
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar Contrato
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="contract-detail-content">
        {/* Version History Sidebar */}
        {showVersionHistory && (
          <div className="version-history">
            <h3>Historial de Versiones</h3>
            <div className="version-list">
              {contract.versiones.map((version, index) => (
                <div 
                  key={index} 
                  className={`version-item ${index === 0 ? 'current' : ''}`}
                >
                  <div className="version-header">
                    <span className="version-number">v{version.version}</span>
                    {index === 0 && <span className="current-label">Actual</span>}
                  </div>
                  <div className="version-date">{formatDate(version.fecha)}</div>
                  <div className="version-changes">{version.cambios}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contract Content */}
        <div className={`contract-content ${showVersionHistory ? 'with-sidebar' : ''}`}>
          {contract.tipo === 'pdf' ? (
            // PDF Viewer
            <div className="pdf-viewer">
              <div className="pdf-container">
                <div className="pdf-toolbar">
                  <span className="pdf-info">
                    📄 {contract.nombre} - v{getCurrentVersion()}
                  </span>
                  <Button 
                    variant="outline"
                    size="small"
                    onClick={() => window.open(contract.pdfUrl, '_blank')}
                  >
                    Abrir en Nueva Pestaña
                  </Button>
                </div>
                <div className="pdf-frame-container">
                  <iframe 
                    src={contract.pdfUrl} 
                    width="100%" 
                    height="800px"
                    title="Vista del Contrato PDF"
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Manual Contract Editor/Viewer
            <div className="manual-contract">
              {isEditing ? (
                <div className="contract-editor">
                  <div className="rich-text-toolbar">
                    <button 
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('bold')}
                      title="Negrita"
                    >
                      <strong>B</strong>
                    </button>
                    <button 
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('italic')}
                      title="Cursiva"
                    >
                      <em>I</em>
                    </button>
                    <button 
                      type="button"
                      className="toolbar-btn"
                      onClick={() => applyFormatting('underline')}
                      title="Subrayado"
                    >
                      <u>U</u>
                    </button>
                  </div>
                  <div 
                    className="rich-text-editor"
                    contentEditable
                    onInput={(e) => setEditedContent(e.target.innerText)}
                    dangerouslySetInnerHTML={{ __html: editedContent.replace(/\n/g, '<br>') }}
                  />
                </div>
              ) : (
                <div className="contract-viewer">
                  <div className="contract-text">
                    {contract.contenidoActual.split('\n').map((paragraph, index) => (
                      <p key={index} className={paragraph.trim() === '' ? 'empty-line' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;