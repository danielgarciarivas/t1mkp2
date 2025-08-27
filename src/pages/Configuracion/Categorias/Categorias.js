import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import './Categorias.css';

const Categorias = () => {
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [showT1MatchingModal, setShowT1MatchingModal] = useState(false);
  const [showColumnMatchingModal, setShowColumnMatchingModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mappingPreview, setMappingPreview] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [t1Categories, setT1Categories] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [columnMappings, setColumnMappings] = useState({});

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    setLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCategorias = [
        {
          id: 1,
          codigo: 'ELEC001',
          nombre: 'Electrónicos',
          nivel: 1,
          padre: null,
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
          activa: true,
          taxonomiaT1: null,
          taxonomiaT1Matched: false,
          subcategorias: []
        }
      ];

      const mockT1Categories = [
        {
          id: 't1_1',
          nombre: 'Electronics',
          path: 'T1 > Electronics',
          subcategorias: [
            { id: 't1_1_1', nombre: 'Mobile Devices', path: 'T1 > Electronics > Mobile Devices' },
            { id: 't1_1_2', nombre: 'Computers', path: 'T1 > Electronics > Computers' },
            { id: 't1_1_3', nombre: 'Audio & Video', path: 'T1 > Electronics > Audio & Video' }
          ]
        },
        {
          id: 't1_2',
          nombre: 'Fashion',
          path: 'T1 > Fashion',
          subcategorias: [
            { id: 't1_2_1', nombre: 'Clothing & Accessories', path: 'T1 > Fashion > Clothing & Accessories' },
            { id: 't1_2_2', nombre: 'Shoes', path: 'T1 > Fashion > Shoes' },
            { id: 't1_2_3', nombre: 'Jewelry', path: 'T1 > Fashion > Jewelry' }
          ]
        },
        {
          id: 't1_3',
          nombre: 'Home & Garden',
          path: 'T1 > Home & Garden',
          subcategorias: [
            { id: 't1_3_1', nombre: 'Furniture', path: 'T1 > Home & Garden > Furniture' },
            { id: 't1_3_2', nombre: 'Décor', path: 'T1 > Home & Garden > Décor' },
            { id: 't1_3_3', nombre: 'Kitchen & Dining', path: 'T1 > Home & Garden > Kitchen & Dining' }
          ]
        },
        {
          id: 't1_4',
          nombre: 'Sports & Outdoors',
          path: 'T1 > Sports & Outdoors',
          subcategorias: [
            { id: 't1_4_1', nombre: 'Exercise & Fitness', path: 'T1 > Sports & Outdoors > Exercise & Fitness' },
            { id: 't1_4_2', nombre: 'Outdoor Recreation', path: 'T1 > Sports & Outdoors > Outdoor Recreation' },
            { id: 't1_4_3', nombre: 'Team Sports', path: 'T1 > Sports & Outdoors > Team Sports' }
          ]
        },
        {
          id: 't1_5',
          nombre: 'Health & Beauty',
          path: 'T1 > Health & Beauty',
          subcategorias: [
            { id: 't1_5_1', nombre: 'Personal Care', path: 'T1 > Health & Beauty > Personal Care' },
            { id: 't1_5_2', nombre: 'Makeup', path: 'T1 > Health & Beauty > Makeup' },
            { id: 't1_5_3', nombre: 'Health Supplements', path: 'T1 > Health & Beauty > Health Supplements' }
          ]
        }
      ];
      
      setCategorias(mockCategorias);
      setT1Categories(mockT1Categories);
      console.log('T1 Categories loaded:', mockT1Categories); // Debug
      setLoading(false);
      resolve();
    }, 1000);
    });
  };

  const downloadLayoutTemplate = () => {
    // Crear un CSV template con las columnas sugeridas
    const headers = [
      'id_categoria',
      'nombre_categoria',
      'id_padre',
      'ruta_completa',
      'activa',
    ];
    
    // Datos de ejemplo
    const exampleData = [
      ['ELEC001', 'Electrónicos', '', 'Electrónicos', 'S'],
      ['ELEC001001', 'Smartphones', 'ELEC001', 'Electrónicos > Smartphones', 'S'],
      ['ELEC001001001', 'iPhone', 'ELEC001001', 'Electrónicos > Smartphones > iPhone', 'S'],
      ['ELEC001001002', 'Samsung Galaxy', 'ELEC001001', 'Electrónicos > Smartphones > Samsung Galaxy', 'S'],
      ['ELEC001002', 'Laptops', 'ELEC001', 'Electrónicos > Laptops', 'S']
    ];
    
    // Crear el contenido CSV
    const csvContent = [headers, ...exampleData]
      .map(row => row.join(','))
      .join('\n');
    
    // Crear y descargar el archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'layout_categorias_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
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
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const data = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim());
        const row = {};
        headers.forEach((header, i) => {
          row[header] = values[i] || '';
        });
        row._index = index;
        return row;
      });
      
      setParsedData(data);
      setColumnMappings({});
      
      // Asegurar que las categorías T1 estén cargadas antes de abrir el modal
      console.log('T1 Categories length:', t1Categories.length); // Debug
      if (t1Categories.length === 0) {
        // Forzar carga de categorías T1 si no están disponibles
        console.log('Loading T1 categories...'); // Debug
        loadCategorias().then(() => {
          console.log('T1 categories loaded, opening modal'); // Debug
          setShowColumnMatchingModal(true);
        });
      } else {
        console.log('T1 categories already loaded, opening modal'); // Debug
        setShowColumnMatchingModal(true);
      }
    };
    reader.readAsText(file);
  };

  const handleColumnMapping = (importColumn, systemColumn) => {
    setColumnMappings(prev => ({
      ...prev,
      [systemColumn]: importColumn
    }));
  };

  const confirmColumnMapping = () => {
    // Detectar automáticamente las columnas del CSV
    const firstRow = parsedData[0] || {};
    const availableColumns = Object.keys(firstRow).filter(key => key !== '_index');
    
    // Mapeo automático basado en las columnas disponibles
    const autoColumnMapping = {};
    availableColumns.forEach(col => {
      const colLower = col.toLowerCase();
      if (colLower.includes('id') && colLower.includes('categoria') && !colLower.includes('padre')) {
        autoColumnMapping.id_categoria = col;
      } else if (colLower.includes('nombre')) {
        autoColumnMapping.nombre_categoria = col;
      } else if (colLower.includes('padre')) {
        autoColumnMapping.id_padre = col;
      } else if (colLower.includes('ruta') || colLower.includes('completa')) {
        autoColumnMapping.ruta_completa = col;
      } else if (colLower.includes('activa') || colLower.includes('estado')) {
        autoColumnMapping.activa = col;
      }
    });
    
    console.log('Available columns:', availableColumns); // Debug
    console.log('First row sample:', firstRow); // Debug
    console.log('Auto-detected column mapping:', autoColumnMapping); // Debug
    
    // Mapear los datos según las columnas detectadas
    const mappedData = (parsedData || []).slice(0, 5).map((row, index) => ({
      id: index + 1,
      codigo: row[autoColumnMapping.id_categoria] || '',
      nombre: row[autoColumnMapping.nombre_categoria] || '',
      padre: row[autoColumnMapping.id_padre] || null,
      ruta: row[autoColumnMapping.ruta_completa] || '',
      activa: row[autoColumnMapping.activa] === 'S' || row[autoColumnMapping.activa] === '1' || row[autoColumnMapping.activa] === 'true',
    }));

    // Auto-calcular niveles basado en jerarquía de padres
    const calculateLevels = (data) => {
      const dataWithLevels = [...data];
      
      // Función recursiva para calcular el nivel de una categoría
      const getNivel = (categoriaId, visitedIds = new Set()) => {
        // Evitar ciclos infinitos
        if (visitedIds.has(categoriaId)) {
          return 1; // Si hay ciclo, asignar nivel 1
        }
        
        const categoria = dataWithLevels.find(item => item.codigo === categoriaId);
        if (!categoria || !categoria.padre) {
          return 1; // Si no tiene padre o no se encuentra, es nivel 1
        }
        
        visitedIds.add(categoriaId);
        return getNivel(categoria.padre, visitedIds) + 1;
      };
      
      // Asignar niveles a todas las categorías
      dataWithLevels.forEach(item => {
        item.nivel = getNivel(item.codigo);
      });
      
      return dataWithLevels;
    };

    const dataWithLevels = calculateLevels(mappedData);
    console.log('Final mapped data with levels:', dataWithLevels); // Debug
    setMappingPreview(dataWithLevels);
    setShowColumnMatchingModal(false);
    setShowMappingModal(true);
  };

  const skipColumnMapping = () => {
    setShowColumnMatchingModal(false);
    alert('Archivo cargado. Puedes proceder a hacer el matching manual uno por uno desde el árbol de categorías.');
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


  const handleMatchT1 = (categoria) => {
    setSelectedCategory(categoria);
    setShowT1MatchingModal(true);
  };

  const renderCategoryTree = (categoria, nivel = 0) => {
    const hasChildren = categoria.subcategorias && categoria.subcategorias.length > 0;
    
    return (
      <div key={categoria.id} className={`categoria-tree-item level-${nivel} ${hasChildren ? 'has-children' : 'leaf-node'} ${!categoria.activa ? 'inactiva' : ''}`}>
        <div className="category-row">
          <div className="category-content">
            {/* Indentación visual basada en nivel */}
            <div className="category-indent" style={{ width: `${nivel * 20}px` }}></div>
            
            {/* Indicador de tipo */}
            <div className="category-type-icon">
              {hasChildren ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.75 2A1.75 1.75 0 000 3.75v8.5C0 13.216.784 14 1.75 14h12.5A1.75 1.75 0 0016 12.25v-8.5A1.75 1.75 0 0014.25 2H9.586a.25.25 0 01-.177-.073L7.97 0.488A1.75 1.75 0 006.544 0H1.75z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.414 2.414c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75z" />
                </svg>
              )}
            </div>
            
            {/* Información de la categoría */}
            <div className="category-info">
              <div className="category-main-info">
                <span className="category-name">{categoria.nombre}</span>
                <span className="category-code">{categoria.codigo}</span>
                <div className={`matching-status ${categoria.taxonomiaT1Matched ? 'matched' : 'unmatched'}`}>
                  {categoria.taxonomiaT1Matched ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M11.383 13.644A1.03 1.03 0 0112.5 15h1A1.03 1.03 0 0115 13.644L8 6.644 1 13.644A1.03 1.03 0 012.5 15h1a1.03 1.03 0 001.117-1.356L8 10.356l3.383 3.288z"/>
                    </svg>
                  )}
                </div>
              </div>
              {categoria.taxonomiaT1 && (
                <div className="category-taxonomy">
                  {categoria.taxonomiaT1}
                </div>
              )}
            </div>
          </div>
          
          {/* Controles */}
          <div className="category-controls">
            {/* Solo mostrar Match T1 en categorías de último nivel (sin hijos) */}
            {!hasChildren && (
              <Button 
                variant="outline" 
                size="small"
                onClick={() => handleMatchT1(categoria)}
              >
                {categoria.taxonomiaT1Matched ? 'Editar Match' : 'Match T1'}
              </Button>
            )}
            <button
              className={`estado-toggle ${categoria.activa ? 'activo' : 'inactivo'}`}
              onClick={() => toggleCategoriaEstado(categoria.id)}
            >
              {categoria.activa ? 'Activa' : 'Inactiva'}
            </button>
          </div>
        </div>
        
        {/* Subcategorías */}
        {hasChildren && (
          <div className="category-children">
            {categoria.subcategorias.map(sub => renderCategoryTree(sub, nivel + 1))}
          </div>
        )}
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
            Configuración del árbol de categorías del marketplace con mapeo de taxonomías
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
            onClick={downloadLayoutTemplate}
          >
            📥 Descargar Layout
          </Button>
          <Button 
            variant="outline"
            onClick={() => document.getElementById('csv-upload').click()}
          >
            📤 Cargar CSV
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
                      <th>Ruta Completa</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappingPreview.map((item) => (
                      <tr key={item.id}>
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>
                        <td>{item.nivel}</td>
                        <td>{item.ruta}</td>
                        <td>{item.activa ? 'Activa' : 'Inactiva'}</td>
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
                  <label>ID Categoría</label>
                  <input type="text" placeholder="Ej: ELEC001" />
                </div>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" placeholder="Nombre de la categoría" />
                </div>
                <div className="form-group">
                  <label>ID Categoría Padre (vacio si es padre)</label>
                  <input type="text" placeholder="Ej: ELEC001 - Dejar vacío si es categoría principal" />
                </div>
                <div className="form-group full-width">
                  <label>Breadcrumb</label>
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
              <h2>Match con T1</h2>
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
                    <h3>Categoría de Marketplace Actual:</h3>
                    <div className="category-info">
                      <span className="category-name">{selectedCategory.nombre}</span>
                      <span className="category-code">{selectedCategory.codigo}</span>
                    </div>
                    {selectedCategory.taxonomiaT1 && (
                      <div className="current-matching">
                        <strong>Match actual:</strong>
                        <span className="matched-taxonomy">{selectedCategory.taxonomiaT1}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="t1-taxonomy-selector">
                    <h3>Selecciona la categoría T1:</h3>
                    <div className="t1-tree">
                      {t1Categories.map(parent => (
                        <div key={parent.id} className="t1-parent">
                          <div 
                            className="t1-category-item t1-parent-disabled"
                            title="Solo puedes seleccionar categorías de último nivel"
                          >
                            <span className="t1-toggle">📁</span>
                            <span className="t1-name">{parent.nombre}</span>
                          </div>
                          <div className="t1-children">
                            {parent.subcategorias.map(child => (
                              <div 
                                key={child.id} 
                                className="t1-category-item t1-child"
                                onClick={() => {
                                  const updatedCategory = { ...selectedCategory, taxonomiaT1: child.path, taxonomiaT1Matched: true };
                                  setSelectedCategory(updatedCategory);
                                }}
                              >
                                <span className="t1-toggle">📄</span>
                                <span className="t1-name">{child.nombre}</span>
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

      {/* Modal de Configuración de Columnas */}
      {showColumnMatchingModal && (
        <div className="modal-overlay">
          <div className="modal-content column-matching-modal">
            <div className="modal-header">
              <h2>Mapear categorías con T1</h2>
              <button 
                className="close-button" 
                onClick={() => setShowColumnMatchingModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="matching-instructions">
                <p>Mapea las categorías de tu archivo con las categorías T1 correspondientes. Puedes omitir categorías que no quieras importar.</p>
              </div>
              
              <div className="category-matching-container">
                <div className="matching-header">
                  <div className="header-section">Categoría a importar</div>
                  <div className="header-section">Categoria T1</div>
                  <div className="header-section">Estado</div>
                </div>
                
                <div className="category-matching-rows">
                  {(parsedData || []).slice(0, 10).map((category, index) => (
                    <div key={index} className="category-matching-row">
                      <div className="import-category">
                        <span className="category-icon">📁</span>
                        <div className="category-details">
                          <span className="category-name">{category.nombre_categoria || category[Object.keys(category)[1]] || 'Sin nombre'}</span>
                          <span className="category-path">{category.ruta_completa || category[Object.keys(category)[3]] || 'Sin ruta'}</span>
                        </div>
                      </div>
                      
                      <div className="t1-category-selector">
                        <select 
                          value={columnMappings[`category_${index}`] || ''}
                          onChange={(e) => handleColumnMapping(e.target.value, `category_${index}`)}
                        >
                          <option value="">Selecciona categoría T1</option>
                          {(t1Categories || []).map(t1Cat => (
                            <optgroup key={t1Cat.id} label={t1Cat.nombre}>
                              {/* Solo mostrar subcategorías (último nivel) - no la categoría padre */}
                              {(t1Cat.subcategorias || []).map(subCat => (
                                <option key={subCat.id} value={subCat.id}>
                                  {subCat.nombre}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                      
                      <div className="matching-status">
                        {columnMappings[`category_${index}`] ? (
                          <span className="status-matched">&nbsp;&nbsp;&nbsp;✅ Mapeado</span>
                        ) : (
                          <span className="status-unmapped">&nbsp;&nbsp;&nbsp;⚪ Sin mapear</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={skipColumnMapping}
              >
                Omitir Matching
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowColumnMatchingModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary" 
                onClick={confirmColumnMapping}
                disabled={Object.keys(columnMappings).length === 0}
              >
                Importar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;