import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import './Contratos.css';

const Contratos = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [contractType, setContractType] = useState(null); // 'manual' or 'pdf'
  const [showManualEditor, setShowManualEditor] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage] = useState(10);
  
  // Form states for manual contracts
  const [contractForm, setContractForm] = useState({
    nombre: '',
    tags: [],
    contenido: '',
    isMainContract: false,
    newTag: ''
  });
  
  // PDF upload states
  const [pdfForm, setPdfForm] = useState({
    nombre: '',
    tags: [],
    archivo: null,
    isMainContract: false,
    newTag: ''
  });

  useEffect(() => {
    loadContratos();
  }, []);

  const loadContratos = async () => {
    setLoading(true);
    
    // Simular carga de contratos con nuevo formato
    setTimeout(() => {
      const mockContratos = [
        {
          id: 1,
          numeroContrato: 'CONT-2024-001',
          nombre: 'Contrato Estándar Marketplace',
          tipo: 'manual', // 'manual' o 'pdf'
          fechaUltimaActualizacion: '2024-02-10T14:20:00Z',
          tags: ['general', 'comisiones', 'pagos'],
          isMainContract: true,
          versiones: [
            {
              version: '1.2',
              fecha: '2024-02-10T14:20:00Z',
              cambios: 'Actualización de cláusulas de comisión',
              contenido: 'Contenido del contrato v1.2...'
            },
            {
              version: '1.1',
              fecha: '2024-01-20T10:30:00Z',
              cambios: 'Corrección de términos legales',
              contenido: 'Contenido del contrato v1.1...'
            },
            {
              version: '1.0',
              fecha: '2024-01-15T10:30:00Z',
              cambios: 'Versión inicial',
              contenido: 'Contenido inicial del contrato...'
            }
          ],
          contenidoActual: `CONTRATO DE PRESTACIÓN DE SERVICIOS DE MARKETPLACE

Entre T1 Marketplace, S.A. de C.V., en adelante denominada "EL MARKETPLACE", y el vendedor registrado, en adelante denominado "EL SELLER"

CLÁUSULAS

PRIMERA.- OBJETO DEL CONTRATO
EL MARKETPLACE proporcionará al SELLER una plataforma digital para la comercialización de productos, facilitando la conexión entre el SELLER y los compradores finales.

SEGUNDA.- COMISIONES
EL MARKETPLACE cobrará una comisión del 12% sobre el valor total de cada venta realizada a través de la plataforma, más IVA correspondiente.

TERCERA.- TÉRMINOS DE PAGO
Los pagos se realizarán quincenalmente, los días 15 y último de cada mes, mediante transferencia bancaria a la cuenta registrada por EL SELLER.

CUARTA.- POLÍTICAS DE DEVOLUCIÓN
EL SELLER acepta y se compromete a cumplir con las políticas de devolución establecidas por EL MARKETPLACE, incluyendo reembolsos dentro de 30 días naturales.

QUINTA.- RESPONSABILIDADES
EL SELLER es responsable de la calidad, descripción veraz y entrega oportuna de los productos ofrecidos en la plataforma.

SEXTA.- CONFIDENCIALIDAD
Ambas partes se comprometen a mantener la confidencialidad de la información comercial intercambiada durante la vigencia del presente contrato.`
        },
        {
          id: 2,
          numeroContrato: 'CONT-2024-002',
          nombre: 'Contrato Premium Sellers',
          tipo: 'pdf',
          fechaUltimaActualizacion: '2024-02-05T09:15:00Z',
          tags: ['premium', 'exclusivo', 'alto-volumen'],
          isMainContract: false,
          versiones: [
            {
              version: '2.1',
              fecha: '2024-02-05T09:15:00Z',
              cambios: 'Actualización de cláusulas de exclusividad',
              pdfUrl: '/uploads/contratos/premium_v2.1.pdf'
            },
            {
              version: '2.0',
              fecha: '2024-01-20T14:30:00Z',
              cambios: 'Revisión mayor - nuevas políticas premium',
              pdfUrl: '/uploads/contratos/premium_v2.0.pdf'
            },
            {
              version: '1.0',
              fecha: '2024-01-10T10:00:00Z',
              cambios: 'Carga inicial de contrato PDF',
              pdfUrl: '/uploads/contratos/premium_v1.0.pdf'
            }
          ],
          pdfUrl: '/uploads/contratos/premium_v2.1.pdf'
        },
        {
          id: 3,
          numeroContrato: 'CONT-2024-003',
          nombre: 'Contrato Categoría Electrónicos',
          tipo: 'manual',
          fechaUltimaActualizacion: '2024-01-30T16:45:00Z',
          tags: ['tecnología', 'electrónicos', 'garantías-extendidas'],
          isMainContract: false,
          versiones: [
            {
              version: '1.0',
              fecha: '2024-01-30T16:45:00Z',
              cambios: 'Versión inicial',
              contenido: 'Contrato específico para productos electrónicos...'
            }
          ],
          contenidoActual: `CONTRATO ESPECÍFICO PARA PRODUCTOS ELECTRÓNICOS

Entre T1 Marketplace, S.A. de C.V. y EL SELLER para la comercialización de productos electrónicos

DISPOSICIONES ESPECIALES

PRIMERA.- CATEGORÍAS APLICABLES
Este contrato aplica exclusivamente para: smartphones, laptops, tablets, accesorios electrónicos, componentes de computadora y dispositivos wearables.

SEGUNDA.- GARANTÍAS EXTENDIDAS
Todos los productos electrónicos deben incluir garantía mínima de 12 meses, extendible hasta 24 meses para productos premium.

TERCERA.- CERTIFICACIONES REQUERIDAS
EL SELLER debe proporcionar certificaciones FCC, CE, NOM y todas las aplicables según normativa mexicana vigente.

CUARTA.- COMISIONES DIFERENCIADAS
- Smartphones y tablets: 8%
- Laptops y computadoras: 6%
- Accesorios: 15%
- Componentes especializados: 10%

QUINTA.- POLÍTICA DE DEVOLUCIONES
Período extendido de 45 días para devoluciones, considerando la naturaleza técnica de los productos.

SEXTA.- SOPORTE TÉCNICO
EL SELLER debe proporcionar soporte técnico especializado durante las primeras 72 horas post-venta.`
        }
      ];
      
      setContratos(mockContratos);
      setLoading(false);
    }, 1000);
  };

  const handleCreateContract = () => {
    setShowCreateModal(true);
  };
  
  const handleSelectContractType = (type) => {
    setContractType(type);
    setShowCreateModal(false);
    
    if (type === 'manual') {
      setShowManualEditor(true);
      setContractForm({
        nombre: '',
        tags: [],
        contenido: '',
        isMainContract: false,
        newTag: ''
      });
    } else if (type === 'pdf') {
      // PDF upload form will be shown in the modal
      setPdfForm({
        nombre: '',
        tags: [],
        archivo: null,
        isMainContract: false,
        newTag: ''
      });
    }
  };

  const handleViewContract = (contrato) => {
    navigate(`/configuracion/contratos/${contrato.id}`, { 
      state: { 
        contract: contrato,
        canEdit: contrato.tipo === 'manual'
      }
    });
  };

  const handleSaveManualContract = () => {
    if (!contractForm.nombre.trim() || !contractForm.contenido.trim()) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    const newContract = {
      id: Date.now(),
      numeroContrato: `CONT-2024-${String(contratos.length + 1).padStart(3, '0')}`,
      nombre: contractForm.nombre,
      tipo: 'manual',
      fechaUltimaActualizacion: new Date().toISOString(),
      tags: contractForm.tags,
      isMainContract: contractForm.isMainContract,
      versiones: [{
        version: '1.0',
        fecha: new Date().toISOString(),
        cambios: 'Versión inicial',
        contenido: contractForm.contenido
      }],
      contenidoActual: contractForm.contenido
    };
    
    setContratos(prev => [...prev, newContract]);
    setShowManualEditor(false);
    alert('Contrato manual creado exitosamente');
  };
  
  const handleUploadPDF = () => {
    if (!pdfForm.nombre.trim() || !pdfForm.archivo) {
      alert('Por favor complete todos los campos y seleccione un archivo PDF');
      return;
    }
    
    const newContract = {
      id: Date.now(),
      numeroContrato: `CONT-2024-${String(contratos.length + 1).padStart(3, '0')}`,
      nombre: pdfForm.nombre,
      tipo: 'pdf',
      fechaUltimaActualizacion: new Date().toISOString(),
      tags: pdfForm.tags,
      isMainContract: pdfForm.isMainContract,
      versiones: [{
        version: '1.0',
        fecha: new Date().toISOString(),
        cambios: 'Carga inicial de PDF',
        pdfUrl: URL.createObjectURL(pdfForm.archivo)
      }],
      pdfUrl: URL.createObjectURL(pdfForm.archivo)
    };
    
    setContratos(prev => [...prev, newContract]);
    setContractType(null);
    alert('Contrato PDF subido exitosamente');
  };
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfForm(prev => ({ ...prev, archivo: file }));
    } else {
      alert('Por favor seleccione un archivo PDF válido');
    }
  };
  
  const addTag = (isManual = true) => {
    const form = isManual ? contractForm : pdfForm;
    const setForm = isManual ? setContractForm : setPdfForm;
    
    if (form.newTag.trim() && !form.tags.includes(form.newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };
  
  const removeTag = (tagToRemove, isManual = true) => {
    const setForm = isManual ? setContractForm : setPdfForm;
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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
  
  const getCurrentVersion = (contract) => {
    return contract.versiones?.[0]?.version || '1.0';
  };
  
  const getContractTypeBadge = (tipo) => {
    return tipo === 'pdf' ? (
      <span className="type-badge type-pdf">PDF</span>
    ) : (
      <span className="type-badge type-manual">Manual</span>
    );
  };
  
  const getMainContractBadge = (isMain) => {
    return isMain ? (
      <span className="main-badge">Principal</span>
    ) : null;
  };
  
  // Rich text editor functions
  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
  };
  
  // Pagination
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contratos.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(contratos.length / contractsPerPage);

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando contratos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Gestión de Contratos</h1>
          <p className="module-subtitle">
            Administra contratos PDF y manuales con sistema de versiones y tags
          </p>
        </div>
        
        <div className="module-actions">
          <Button 
            variant="primary"
            onClick={handleCreateContract}
          >
            + Crear Contrato
          </Button>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="contracts-content">
        <div className="contracts-table-container">
          <div className="contracts-table">
            <div className="table-header-row">
              <div className="table-header-cell">Número de Contrato</div>
              <div className="table-header-cell">Nombre del Contrato</div>
              <div className="table-header-cell">Fecha Última Actualización</div>
              <div className="table-header-cell">Tipo</div>
              <div className="table-header-cell">Tags</div>
              <div className="table-header-cell">Acciones</div>
            </div>
            
            {loading ? (
              <div className="table-loading">
                <div className="loading-spinner"></div>
                <p>Cargando contratos...</p>
              </div>
            ) : currentContracts.length === 0 ? (
              <div className="table-empty">
                <p>No hay contratos registrados</p>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={handleCreateContract}
                >
                  Crear Primer Contrato
                </Button>
              </div>
            ) : (
              currentContracts.map((contrato) => (
                <div key={contrato.id} className="table-row">
                  <div className="table-cell">
                    <div className="contract-number">
                      <span className="number">{contrato.numeroContrato}</span>
                      {getMainContractBadge(contrato.isMainContract)}
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="contract-name">
                      <span className="name">{contrato.nombre}</span>
                      <span className="version">v{getCurrentVersion(contrato)}</span>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className="date">{formatDate(contrato.fechaUltimaActualizacion)}</span>
                  </div>
                  <div className="table-cell">
                    {getContractTypeBadge(contrato.tipo)}
                  </div>
                  <div className="table-cell">
                    <div className="tags-container">
                      {contrato.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                      {contrato.tags.length > 2 && (
                        <span className="tag-more">+{contrato.tags.length - 2}</span>
                      )}
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="action-buttons">
                      <Button 
                        variant="outline" 
                        size="small"
                        onClick={() => handleViewContract(contrato)}
                      >
                        Ver Contrato
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="pagination">
              <div className="pagination-info">
                Mostrando {indexOfFirstContract + 1} - {Math.min(indexOfLastContract, contratos.length)} de {contratos.length} contratos
              </div>
              
              <div className="pagination-controls">
                <button 
                  className="pagination-btn prev"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  ← Anterior
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      if (totalPages <= 7) return true;
                      if (page === 1 || page === totalPages) return true;
                      if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                      return false;
                    })
                    .map((page, index, array) => {
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;
                      
                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && <span className="pagination-ellipsis">...</span>}
                          <button
                            className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })
                  }
                </div>
                
                <button 
                  className="pagination-btn next"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Contract Type Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content create-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Seleccionar Tipo de Contrato</h2>
              <button 
                className="close-button" 
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="contract-type-options">
                <div 
                  className="contract-type-option"
                  onClick={() => handleSelectContractType('pdf')}
                >
                  <div className="option-icon">📄</div>
                  <h3>Cargar Contrato PDF</h3>
                  <p>Sube un contrato ya elaborado en formato PDF</p>
                </div>
                
                <div 
                  className="contract-type-option"
                  onClick={() => handleSelectContractType('manual')}
                >
                  <div className="option-icon">📝</div>
                  <h3>Crear Contrato Manual</h3>
                  <p>Crea un contrato usando el editor de texto con herramientas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* PDF Upload Form */}
      {contractType === 'pdf' && (
        <div className="modal-overlay" onClick={() => setContractType(null)}>
          <div className="modal-content pdf-upload-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cargar Contrato PDF</h2>
              <button 
                className="close-button" 
                onClick={() => setContractType(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del Contrato *</label>
                <input 
                  type="text"
                  value={pdfForm.nombre}
                  onChange={(e) => setPdfForm(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Contrato Premium Sellers"
                />
              </div>
              
              <div className="form-group">
                <label>Archivo PDF *</label>
                <input 
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <div className="file-upload-area" onClick={() => fileInputRef.current?.click()}>
                  {pdfForm.archivo ? (
                    <div className="file-selected">
                      <span>📄 {pdfForm.archivo.name}</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPdfForm(prev => ({ ...prev, archivo: null }));
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="file-placeholder">
                      <span>📄 Haz clic para seleccionar un archivo PDF</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input">
                  <input 
                    type="text"
                    value={pdfForm.newTag}
                    onChange={(e) => setPdfForm(prev => ({ ...prev, newTag: e.target.value }))}
                    placeholder="Agregar tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(false))}
                  />
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => addTag(false)}
                  >
                    Agregar
                  </Button>
                </div>
                <div className="tags-list">
                  {pdfForm.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button onClick={() => removeTag(tag, false)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={pdfForm.isMainContract}
                    onChange={(e) => setPdfForm(prev => ({ ...prev, isMainContract: e.target.checked }))}
                  />
                  Marcar como contrato principal para Seller Center
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setContractType(null)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={handleUploadPDF}
              >
                Subir Contrato
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Manual Contract Editor */}
      {showManualEditor && (
        <div className="editor-section">
          <div className="editor-header">
            <h2>Crear Contrato Manual</h2>
            <div className="editor-actions">
              <Button 
                variant="primary"
                onClick={handleSaveManualContract}
              >
                Guardar Contrato
              </Button>
              <Button 
                variant="secondary"
                onClick={() => setShowManualEditor(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>

          <div className="contract-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre del Contrato *</label>
                <input 
                  type="text"
                  value={contractForm.nombre}
                  onChange={(e) => setContractForm(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Contrato Estándar Marketplace"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input">
                  <input 
                    type="text"
                    value={contractForm.newTag}
                    onChange={(e) => setContractForm(prev => ({ ...prev, newTag: e.target.value }))}
                    placeholder="Agregar tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(true))}
                  />
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => addTag(true)}
                  >
                    Agregar
                  </Button>
                </div>
                <div className="tags-list">
                  {contractForm.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button onClick={() => removeTag(tag, true)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    checked={contractForm.isMainContract}
                    onChange={(e) => setContractForm(prev => ({ ...prev, isMainContract: e.target.checked }))}
                  />
                  Marcar como contrato principal para Seller Center
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Contenido del Contrato *</label>
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
                onInput={(e) => setContractForm(prev => ({ ...prev, contenido: e.target.innerText }))}
                dangerouslySetInnerHTML={{ __html: contractForm.contenido }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contratos;