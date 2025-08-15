import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Categorias.css';

const Categorias = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [showT1MatchingModal, setShowT1MatchingModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mappingPreview, setMappingPreview] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [t1Categories, setT1Categories] = useState([]);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockCategorias = [
        {
          id: 1,
          codigo: 'ELEC001',
          nombre: 'Electrónicos',
          nivel: 1,
          padre: null,
          comision: 8.5,
          activa: true,
          taxonomiaT1: null,
          taxonomiaT1Matched: false,
          subcategorias: [
            {
              id: 11,
              codigo: 'ELEC001001',
              nombre: 'Smartphones',
              nivel: 2,
              padre: 1,
              comision: 7.0,
              activa: true,
              taxonomiaT1: 'T1 > Electronics > Mobile Devices > Smartphones',
              taxonomiaT1Matched: true,
              subcategorias: [
                {
                  id: 111,
                  codigo: 'ELEC001001001',
                  nombre: 'iPhone',
                  nivel: 3,
                  padre: 11,
                  comision: 6.5,
                  activa: true,
                  taxonomiaT1: 'T1 > Electronics > Mobile Devices > Smartphones > Apple',
                  taxonomiaT1Matched: true,
                  subcategorias: []
                },
                {
                  id: 112,
                  codigo: 'ELEC001001002',
                  nombre: 'Samsung Galaxy',
                  nivel: 3,
                  padre: 11,
                  comision: 7.2,
                  activa: true,
                  taxonomiaT1: 'T1 > Electronics > Mobile Devices > Smartphones > Samsung',
                  taxonomiaT1Matched: true,
                  subcategorias: []
                }
              ]
            },
            {
              id: 12,
              codigo: 'ELEC001002',
              nombre: 'Laptops',
              nivel: 2,
              padre: 1,
              comision: 9.0,
              activa: true,
              taxonomiaT1: null,
              taxonomiaT1Matched: false,
              subcategorias: []
            }
          ]
        },
        {
          id: 2,
          codigo: 'ROPA001',
          nombre: 'Ropa y Accesorios',
          nivel: 1,
          padre: null,
          comision: 12.0,
          activa: true,
          taxonomiaT1: 'T1 > Fashion > Clothing & Accessories',
          taxonomiaT1Matched: true,
          subcategorias: [
            {
              id: 21,
              codigo: 'ROPA001001',
              nombre: 'Ropa Masculina',
              nivel: 2,
              padre: 2,
              comision: 11.5,
              activa: true,
              taxonomiaT1: null,
              taxonomiaT1Matched: false,
              subcategorias: []
            }
          ]
        },
        {
          id: 3,
          codigo: 'HOGAR001',
          nombre: 'Hogar y Decoración',
          nivel: 1,
          padre: null,
          comision: 10.0,
          activa: true,
          taxonomiaT1: null,
          taxonomiaT1Matched: false,
          subcategorias: []
        }
      ];

      const mockT1Categories = [
        {
          id: 't1_1',
          path: 'T1 > Electronics',
          children: [
            { id: 't1_1_1', path: 'T1 > Electronics > Mobile Devices' },
            { id: 't1_1_2', path: 'T1 > Electronics > Computers' },
            { id: 't1_1_3', path: 'T1 > Electronics > Audio & Video' }
          ]
        },
        {
          id: 't1_2',
          path: 'T1 > Fashion',
          children: [
            { id: 't1_2_1', path: 'T1 > Fashion > Clothing & Accessories' },
            { id: 't1_2_2', path: 'T1 > Fashion > Shoes' },
            { id: 't1_2_3', path: 'T1 > Fashion > Jewelry' }
          ]
        },
        {
          id: 't1_3',
          path: 'T1 > Home & Garden',
          children: [
            { id: 't1_3_1', path: 'T1 > Home & Garden > Furniture' },
            { id: 't1_3_2', path: 'T1 > Home & Garden > Decor' },
            { id: 't1_3_3', path: 'T1 > Home & Garden > Appliances' }
          ]
        }
      ];
      
      setCategorias(mockCategorias);
      setT1Categories(mockT1Categories);
      setLoading(false);
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      procesarCSV(file);
    } else {
      alert('Por favor selecciona un archivo CSV válido');
    }
  };

  const procesarCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      
      const preview = lines.slice(1, 6).map((line, index) => {
        const values = line.split(',');
        return {
          id: index + 1,
          codigo: values[0]?.trim() || '',
          nombre: values[1]?.trim() || '',
          nivel: parseInt(values[2]?.trim()) || 1,
          padre: values[3]?.trim() || null,
          comision: parseFloat(values[4]?.trim()) || 0,
          marketplace: values[5]?.trim() || '',
          taxonomiaUniversal: values[6]?.trim() || ''
        };
      });
      
      setMappingPreview(preview);
      setShowMappingModal(true);
    };
    reader.readAsText(file);
  };

  const confirmarCarga = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowMappingModal(false);
          setSelectedFile(null);
          loadCategorias();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toggleCategoriaEstado = (id) => {
    setCategorias(prev => prev.map(cat => 
      cat.id === id ? { ...cat, activa: !cat.activa } : cat
    ));
  };

  const editarComision = (id, nuevaComision) => {
    setCategorias(prev => prev.map(cat => 
      cat.id === id ? { ...cat, comision: nuevaComision } : cat
    ));
  };

  const handleMatchT1 = (categoria) => {
    setSelectedCategory(categoria);
    setShowT1MatchingModal(true);
  };

  const renderCategoryTree = (categoria, nivel = 0) => {
    const indentStyle = { marginLeft: `${nivel * 20}px` };
    
    return (
      <div key={categoria.id}>
        <div className={`categoria-tree-item ${!categoria.activa ? 'inactiva' : ''}`} style={indentStyle}>
          <div className="tree-item-content">
            <div className="tree-item-info">
              <div className="tree-item-header">
                <span className="tree-toggle">
                  {categoria.subcategorias.length > 0 ? '📁' : '📄'}
                </span>
                <span className="tree-item-name">{categoria.nombre}</span>
                <span className="tree-item-codigo">{categoria.codigo}</span>
                <span className={`matching-status ${categoria.taxonomiaT1Matched ? 'matched' : 'unmatched'}`}>
                  {categoria.taxonomiaT1Matched ? '✅' : '❌'}
                </span>
              </div>
              {categoria.taxonomiaT1 && (
                <div className="tree-item-t1-taxonomy">
                  {categoria.taxonomiaT1}
                </div>
              )}
            </div>
            <div className="tree-item-controls">
              <div className="comision-control">
                <label>Comisión:</label>
                <input
                  type="number"
                  step="0.1"
                  value={categoria.comision}
                  onChange={(e) => editarComision(categoria.id, parseFloat(e.target.value))}
                  className="comision-input"
                />
                <span>%</span>
              </div>
              <div className="tree-item-actions">
                <Button 
                  variant="outline" 
                  size="small"
                  onClick={() => handleMatchT1(categoria)}
                >
                  {categoria.taxonomiaT1Matched ? 'Editar Match' : 'Match T1'}
                </Button>
                <button
                  className={`estado-toggle ${categoria.activa ? 'activo' : 'inactivo'}`}
                  onClick={() => toggleCategoriaEstado(categoria.id)}
                >
                  {categoria.activa ? 'Activa' : 'Inactiva'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {categoria.subcategorias.map(sub => renderCategoryTree(sub, nivel + 1))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando árbol de categorías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Gestión de Árbol de Categorías</h1>
          <p className="module-subtitle">
            Configuración del árbol de categorías del marketplace con mapeo y gestión de comisiones
          </p>
        </div>
        
        <div className="module-actions">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="csv-upload"
          />
          <Button 
            variant="outline"
            onClick={() => document.getElementById('csv-upload').click()}
          >
            📄 Cargar CSV
          </Button>
          <Button 
            variant="secondary"
            onClick={() => setShowT1MatchingModal(true)}
          >
            🔗 Matching T1
          </Button>
          <Button 
            variant="primary"
            onClick={() => setShowEditor(true)}
          >
            + Nueva Categoría
          </Button>
        </div>
      </div>

      <div className="categorias-section">
        <div className="categorias-stats">
          <div className="stat-card">
            <h3>{categorias.length}</h3>
            <p>Categorías Principales</p>
          </div>
         
          <div className="stat-card">
            <h3>{categorias.filter(cat => cat.activa).length}</h3>
            <p>Categorías Activas</p>
          </div>
          <div className="stat-card">
            <h3>{(categorias.reduce((acc, cat) => acc + cat.comision, 0) / categorias.length).toFixed(1)}%</h3>
            <p>Comisión Promedio</p>
          </div>
        </div>

        <div className="categorias-tree">
          <div className="tree-header">
            <h3>Árbol de Categorías del Marketplace</h3>
            <p>Gestiona las categorías y sus correspondencias con la taxonomía T1</p>
          </div>
          <div className="category-tree">
            {categorias.map(categoria => renderCategoryTree(categoria))}
          </div>
        </div>
      </div>

      {/* Modal de Mapeo CSV */}
      {showMappingModal && (
        <div className="modal-overlay">
          <div className="modal-content mapping-modal">
            <div className="modal-header">
              <h2>Vista Previa de Carga CSV</h2>
              <button 
                className="close-button" 
                onClick={() => setShowMappingModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="mapping-info">
                <p>Se encontraron {mappingPreview.length} categorías para cargar. Vista previa de las primeras 5:</p>
              </div>
              
              <div className="mapping-preview">
                <table className="preview-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Nivel</th>
                      <th>Comisión %</th>
                      <th>Marketplace</th>
                      <th>Taxonomía Universal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappingPreview.map((item) => (
                      <tr key={item.id}>
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>
                        <td>{item.nivel}</td>
                        <td>{item.comision}%</td>
                        <td>{item.marketplace}</td>
                        <td>{item.taxonomiaUniversal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {uploadProgress > 0 && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p>Cargando categorías... {uploadProgress}%</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowMappingModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmarCarga}
                disabled={uploadProgress > 0 && uploadProgress < 100}
              >
                Confirmar Carga
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editor */}
      {showEditor && (
        <div className="modal-overlay">
          <div className="modal-content editor-modal">
            <div className="modal-header">
              <h2>Nueva Categoría</h2>
              <button 
                className="close-button" 
                onClick={() => setShowEditor(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Código de Categoría</label>
                  <input type="text" placeholder="Ej: ELEC001" />
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" placeholder="Nombre de la categoría" />
                </div>
                <div className="form-group">
                  <label>Nivel</label>
                  <select>
                    <option value="1">Nivel 1 - Principal</option>
                    <option value="2">Nivel 2 - Subcategoría</option>
                    <option value="3">Nivel 3 - Sub-subcategoría</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Categoría Padre</label>
                  <select>
                    <option value="">-- Ninguna (Categoría Principal) --</option>
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Comisión (%)</label>
                  <input type="number" step="0.1" placeholder="8.5" />
                </div>
                <div className="form-group">
                  <label>Marketplace</label>
                  <select>
                    <option value="Sears">Sears</option>
                    <option value="Liverpool">Liverpool</option>
                    <option value="Sanborns">Sanborns</option>
                    <option value="Palacio de Hierro">Palacio de Hierro</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Taxonomía Universal</label>
                  <input type="text" placeholder="Ej: Electronics > Consumer Electronics" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button 
                variant="secondary" 
                onClick={() => setShowEditor(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  setShowEditor(false);
                  loadCategorias();
                }}
              >
                Crear Categoría
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Matching T1 */}
      {showT1MatchingModal && (
        <div className="modal-overlay">
          <div className="modal-content t1-matching-modal">
            <div className="modal-header">
              <h2>Matching con Taxonomía T1</h2>
              <button 
                className="close-button" 
                onClick={() => setShowT1MatchingModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {selectedCategory && (
                <div className="matching-section">
                  <div className="current-category">
                    <h3>Categoría Actual:</h3>
                    <div className="category-info">
                      <span className="category-name">{selectedCategory.nombre}</span>
                      <span className="category-code">{selectedCategory.codigo}</span>
                    </div>
                    {selectedCategory.taxonomiaT1 && (
                      <div className="current-matching">
                        <strong>Matching actual:</strong>
                        <span className="matched-taxonomy">{selectedCategory.taxonomiaT1}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="t1-taxonomy-selector">
                    <h3>Selecciona Taxonomía T1:</h3>
                    <div className="t1-tree">
                      {t1Categories.map(parent => (
                        <div key={parent.id} className="t1-parent">
                          <div 
                            className="t1-category-item"
                            onClick={() => {
                              // Actualizar matching
                              const updatedCategory = { ...selectedCategory, taxonomiaT1: parent.path, taxonomiaT1Matched: true };
                              setSelectedCategory(updatedCategory);
                            }}
                          >
                            <span className="t1-toggle">📁</span>
                            <span className="t1-name">{parent.path}</span>
                          </div>
                          <div className="t1-children">
                            {parent.children.map(child => (
                              <div 
                                key={child.id} 
                                className="t1-category-item t1-child"
                                onClick={() => {
                                  const updatedCategory = { ...selectedCategory, taxonomiaT1: child.path, taxonomiaT1Matched: true };
                                  setSelectedCategory(updatedCategory);
                                }}
                              >
                                <span className="t1-toggle">📄</span>
                                <span className="t1-name">{child.path}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="matching-preview">
                    <h4>Vista Previa del Matching:</h4>
                    <div className="preview-content">
                      <div className="preview-item">
                        <strong>Categoría Marketplace:</strong> {selectedCategory.nombre}
                      </div>
                      <div className="preview-item">
                        <strong>Taxonomía T1:</strong> {selectedCategory.taxonomiaT1 || 'Sin asignar'}
                      </div>
                      <div className="preview-item">
                        <strong>Estado:</strong> 
                        <span className={`status-badge ${selectedCategory.taxonomiaT1Matched ? 'matched' : 'unmatched'}`}>
                          {selectedCategory.taxonomiaT1Matched ? 'Vinculado' : 'Sin vincular'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (selectedCategory) {
                    const updatedCategory = { ...selectedCategory, taxonomiaT1: null, taxonomiaT1Matched: false };
                    setSelectedCategory(updatedCategory);
                  }
                }}
              >
                Limpiar Matching
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowT1MatchingModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  // Guardar matching
                  if (selectedCategory) {
                    setCategorias(prev => 
                      prev.map(cat => 
                        cat.id === selectedCategory.id ? selectedCategory : cat
                      )
                    );
                  }
                  setShowT1MatchingModal(false);
                  setSelectedCategory(null);
                }}
              >
                Guardar Matching
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;