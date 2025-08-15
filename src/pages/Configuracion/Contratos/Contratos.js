import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Contratos.css';

const Contratos = () => {
  const [loading, setLoading] = useState(true);
  const [contratos, setContratos] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedContrato, setSelectedContrato] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    loadContratos();
  }, []);

  const loadContratos = async () => {
    setLoading(true);
    
    // Simular carga de contratos
    setTimeout(() => {
      const mockContratos = [
        {
          id: 1,
          nombre: 'Contrato Estándar Marketplace',
          descripcion: 'Plantilla base para marketplaces generales',
          tipo: 'template',
          version: '1.0',
          fechaCreacion: '2024-01-15T10:30:00Z',
          fechaActualizacion: '2024-02-10T14:20:00Z',
          estado: 'activo',
          marketplaces: ['Sears'],
          clausulas: {
            comisiones: true,
            terminos_pago: true,
            politicas_devolucion: true,
            responsabilidades: true,
            confidencialidad: true
          }
        },
        {
          id: 2,
          nombre: 'Contrato Premium Sellers',
          descripcion: 'Contrato especial para sellers de alto volumen',
          tipo: 'premium',
          version: '2.1',
          fechaCreacion: '2024-01-20T09:15:00Z',
          fechaActualizacion: '2024-02-15T11:45:00Z',
          estado: 'activo',
          marketplaces: ['Sears'],
          clausulas: {
            comisiones: true,
            terminos_pago: true,
            politicas_devolucion: true,
            responsabilidades: true,
            confidencialidad: true,
            exclusividad: true
          }
        },
       
      ];
      
      setContratos(mockContratos);
      setLoading(false);
    }, 1000);
  };

  const handleCrearContrato = () => {
    setSelectedContrato(null);
    setEditorContent('');
    setShowEditor(true);
  };

  const handleEditarContrato = (contrato) => {
    setSelectedContrato(contrato);
    setEditorContent(generateContractContent(contrato));
    setShowEditor(true);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleGuardarContrato = () => {
    // Simular guardado
    console.log('Guardando contrato:', editorContent);
    setShowEditor(false);
    setSelectedContrato(null);
    setEditorContent('');
  };

  const generateContractContent = (contrato) => {
    return `CONTRATO DE PRESTACIÓN DE SERVICIOS DE MARKETPLACE

Entre ${contrato?.nombre || '[NOMBRE DEL MARKETPLACE]'} y el SELLER

CLÁUSULAS:

1. OBJETO DEL CONTRATO
El presente contrato tiene por objeto establecer los términos y condiciones bajo los cuales el Seller podrá ofrecer sus productos a través de la plataforma del Marketplace.

2. COMISIONES
${contrato?.clausulas?.comisiones ? 'El Marketplace cobrará una comisión sobre las ventas realizadas según la estructura definida en el anexo de comisiones.' : ''}

3. TÉRMINOS DE PAGO
${contrato?.clausulas?.terminos_pago ? 'Los pagos se realizarán según el ciclo de liquidaciones establecido, con un período de retención de seguridad.' : ''}

4. POLÍTICAS DE DEVOLUCIÓN
${contrato?.clausulas?.politicas_devolucion ? 'Se aplicarán las políticas de devolución estándar del marketplace, con excepciones según la categoría de producto.' : ''}

5. RESPONSABILIDADES
${contrato?.clausulas?.responsabilidades ? 'Cada parte asume las responsabilidades específicas definidas en este contrato.' : ''}

${contrato?.clausulas?.confidencialidad ? `

6. CONFIDENCIALIDAD
Las partes se comprometen a mantener la confidencialidad de la información intercambiada.` : ''}

${contrato?.clausulas?.exclusividad ? `

7. EXCLUSIVIDAD
Términos especiales de exclusividad para sellers premium.` : ''}

${contrato?.clausulas?.garantias_especiales ? `

8. GARANTÍAS ESPECIALES
Garantías adicionales aplicables a productos electrónicos y tecnológicos.` : ''}

Firmado digitalmente el [FECHA] por [SELLER] y ${contrato?.nombre || '[MARKETPLACE]'}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      activo: 'estado-activo',
      borrador: 'estado-borrador',
      inactivo: 'estado-inactivo'
    };
    return badges[estado] || 'estado-borrador';
  };

  const getTipoBadge = (tipo) => {
    const tipos = {
      template: { label: 'Plantilla', class: 'tipo-template' },
      premium: { label: 'Premium', class: 'tipo-premium' },
      categoria: { label: 'Categoría', class: 'tipo-categoria' }
    };
    return tipos[tipo] || { label: 'Estándar', class: 'tipo-template' };
  };

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
            Administración de acuerdos legales y comerciales con interfaz visual
          </p>
        </div>
        
        <div className="module-actions">
          <Button 
            variant="primary"
            onClick={handleCrearContrato}
          >
            + Crear Nuevo Contrato
          </Button>
        </div>
      </div>

      {!showEditor ? (
        <div className="contratos-section">
          <div className="contratos-grid">
            {contratos.map((contrato) => {
              const tipoBadge = getTipoBadge(contrato.tipo);
              
              return (
                <div key={contrato.id} className="contrato-card">
                  <div className="contrato-header">
                    <div className="contrato-title">
                      <h3>{contrato.nombre}</h3>
                      <p>{contrato.descripcion}</p>
                    </div>
                    <div className="contrato-badges">
                      <span className={`estado-badge ${getEstadoBadge(contrato.estado)}`}>
                        {contrato.estado}
                      </span>
                      <span className={`tipo-badge ${tipoBadge.class}`}>
                        {tipoBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="contrato-info">
                    <div className="info-row">
                      <span className="info-label">Versión:</span>
                      <span className="info-value">v{contrato.version}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Última actualización:</span>
                      <span className="info-value">{formatDate(contrato.fechaActualizacion)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Marketplaces:</span>
                      <span className="info-value">{contrato.marketplaces.join(', ')}</span>
                    </div>
                  </div>

                  <div className="clausulas-preview">
                    <h4>Cláusulas incluidas:</h4>
                    <div className="clausulas-list">
                      {Object.entries(contrato.clausulas).filter(([_, incluida]) => incluida).map(([clausula, _]) => (
                        <span key={clausula} className="clausula-tag">
                          {clausula.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="contrato-actions">
                    <Button 
                      variant="secondary" 
                      size="small"
                      onClick={() => handleEditarContrato(contrato)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="small"
                      onClick={() => {
                        setSelectedContrato(contrato);
                        setEditorContent(generateContractContent(contrato));
                        handlePreview();
                      }}
                    >
                      Vista Previa
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="editor-section">
          <div className="editor-header">
            <h2>
              {selectedContrato ? `Editando: ${selectedContrato.nombre}` : 'Crear Nuevo Contrato'}
            </h2>
            <div className="editor-actions">
              <Button 
                variant="outline"
                onClick={handlePreview}
              >
                Vista Previa
              </Button>
              <Button 
                variant="primary"
                onClick={handleGuardarContrato}
              >
                Guardar Contrato
              </Button>
              <Button 
                variant="secondary"
                onClick={() => setShowEditor(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>

          <div className="contract-editor">
            <textarea
              className="editor-textarea"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Escriba el contenido del contrato aquí..."
            />
          </div>
        </div>
      )}

      {/* Modal de Vista Previa */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="modal-content preview-modal">
            <div className="modal-header">
              <h2>Vista Previa del Contrato</h2>
              <button 
                className="close-button" 
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="preview-content">
                <pre>{editorContent || generateContractContent(selectedContrato)}</pre>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowPreview(false)}
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

export default Contratos;