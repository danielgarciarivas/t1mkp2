import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    loadProductDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProductDetail = async () => {
    setLoading(true);
    // Simular carga de datos del producto
    setTimeout(() => {
      const mockProducts = {
        1: {
          id: 1,
          nombre: 'iPhone 15 Pro Max 256GB',
          sku: 'IPH15PM256',
          seller: 'TechnoMax SA',
          precio: 24999,
          categoria: 'Electrónicos',
          estado: 'pendiente',
          fechaCreacion: '2024-01-15T10:30:00Z',
          descripcion: 'iPhone 15 Pro Max con 256GB de almacenamiento, cámara profesional de 48MP y chip A17 Pro. Diseño premium en titanio con resistencia al agua IP68.',
          imagenes: [
            'https://resources.sears.com.mx/medios-plazavip/mkt/63d42f699b98a_12progrisjpg.jpg?scale=600&qlty=75',
            'https://resources.sears.com.mx/medios-plazavip/t1/1749240502DNQNP761323MLU78879158670092024Ojpg?scale=500&qlty=75',
            'https://resources.sears.com.mx/medios-plazavip/t1/1749240264appleiphone16plusblack3jpg?scale=500&qlty=75',
            'https://resources.sears.com.mx/medios-plazavip/t1/17492410364504692jpg?scale=500&qlty=75'
          ],
          especificaciones: {
            marca: 'Apple',
            modelo: 'iPhone 15 Pro Max',
            color: 'Titanio Natural',
            almacenamiento: '256GB',
            pantalla: '6.7 pulgadas Super Retina XDR',
            camara: '48MP + 12MP + 12MP',
            bateria: 'Hasta 29 horas de reproducción de video',
            conectividad: '5G, Wi-Fi 6E, Bluetooth 5.3',
            peso: '221 gramos',
            dimensiones: '159.9 x 76.7 x 8.25 mm'
          }
        },
        2: {
          id: 2,
          nombre: 'Sofá Modular 3 Piezas',
          sku: 'SOF3P001',
          seller: 'HomeStyle México',
          precio: 15999,
          categoria: 'Hogar',
          estado: 'activo',
          fechaCreacion: '2024-01-20T14:15:00Z',
          descripcion: 'Sofá modular de 3 piezas con tapicería en tela resistente y estructura de madera maciza. Diseño contemporáneo que se adapta a cualquier espacio.',
          imagenes: [
            'https://via.placeholder.com/600x600/8B4513/fff?text=Sofá+Completo',
            'https://via.placeholder.com/600x600/A0522D/fff?text=Detalle+Tela',
            'https://via.placeholder.com/600x600/CD853F/fff?text=Configuración',
            'https://via.placeholder.com/600x600/DEB887/fff?text=Vista+Lateral'
          ],
          especificaciones: {
            marca: 'HomeStyle',
            material: 'Tela y madera maciza',
            color: 'Gris carbón',
            dimensiones: '280x90x85 cm',
            peso: '85 kg',
            capacidad: '4-5 personas',
            estructura: 'Madera de pino maciza',
            relleno: 'Espuma de alta densidad',
            garantia: '2 años'
          }
        },
        3: {
          id: 3,
          nombre: 'Vestido Casual Verano',
          sku: 'VES001',
          seller: 'FashionHub',
          precio: 1299,
          categoria: 'Ropa',
          estado: 'suspendido',
          fechaCreacion: '2024-02-01T09:00:00Z',
          descripcion: 'Vestido casual para verano con corte A-line y tela ligera. Perfect para días calurosos con su diseño fresco y cómodo.',
          imagenes: [
            'https://via.placeholder.com/600x600/FFB6C1/333?text=Vestido+Frontal',
            'https://via.placeholder.com/600x600/FFC0CB/333?text=Detalle+Tela',
            'https://via.placeholder.com/600x600/FFE4E1/333?text=Vista+Trasera',
            'https://via.placeholder.com/600x600/F0E68C/333?text=Modelo'
          ],
          especificaciones: {
            marca: 'FashionHub',
            tallas: 'S, M, L, XL',
            color: 'Azul cielo',
            material: '100% Algodón',
            cuidado: 'Lavado a máquina 30°C',
            temporada: 'Verano',
            corte: 'A-line',
            largo: 'Midi'
          }
        },
        4: {
          id: 4,
          nombre: 'Tenis Running Professional',
          sku: 'TEN001',
          seller: 'Sports World',
          precio: 2499,
          categoria: 'Deportes',
          estado: 'rechazado',
          fechaCreacion: '2024-02-05T16:45:00Z',
          descripcion: 'Tenis profesionales para running con tecnología de amortiguación avanzada. Diseñados para atletas que buscan máximo rendimiento.',
          imagenes: [
            'https://via.placeholder.com/600x600/000080/fff?text=Tenis+Lateral',
            'https://via.placeholder.com/600x600/191970/fff?text=Suela',
            'https://via.placeholder.com/600x600/4169E1/fff?text=Interior',
            'https://via.placeholder.com/600x600/6495ED/fff?text=Par+Completo'
          ],
          especificaciones: {
            marca: 'Sports World Pro',
            tallas: '25-30 cm',
            color: 'Negro/Azul',
            material: 'Mesh transpirable + Suela EVA',
            peso: '280g por zapato',
            uso: 'Running, caminata',
            tecnologia: 'Amortiguación Air-Max',
            suela: 'Antideslizante'
          }
        },
        5: {
          id: 5,
          nombre: 'Serum Facial Anti-Edad',
          sku: 'SER001',
          seller: 'Beauty Corner',
          precio: 899,
          categoria: 'Salud y Belleza',
          estado: 'pendiente',
          fechaCreacion: '2024-02-08T13:30:00Z',
          descripcion: 'Serum facial con ácido hialurónico y vitamina C para combatir signos de envejecimiento. Fórmula avanzada para una piel radiante.',
          imagenes: [
            'https://via.placeholder.com/600x600/FFA07A/333?text=Producto+Frontal',
            'https://via.placeholder.com/600x600/FFB07A/333?text=Envase+Detalle',
            'https://via.placeholder.com/600x600/FFC07A/333?text=Aplicación',
            'https://via.placeholder.com/600x600/FFD07A/333?text=Ingredientes'
          ],
          especificaciones: {
            marca: 'Beauty Corner',
            contenido: '30ml',
            ingredientes: 'Ácido hialurónico, Vitamina C, Extractos naturales',
            tiposPiel: 'Todo tipo de piel',
            uso: 'Día y noche',
            duracion: '2-3 meses de uso',
            origen: 'Corea del Sur',
            certificacion: 'Cruelty-free'
          }
        },
        6: {
          id: 6,
          nombre: 'Laptop Gaming ROG Strix',
          sku: 'LAP001ROG',
          seller: 'TechStore Pro',
          precio: 35999,
          categoria: 'Electrónicos',
          estado: 'freepass',
          fechaCreacion: '2024-02-10T11:20:00Z',
          descripcion: 'Laptop gaming de alto rendimiento con procesador Intel i7, tarjeta gráfica RTX 4060 y 16GB RAM. Diseñada para gaming extremo y trabajo profesional.',
          imagenes: [
            'https://via.placeholder.com/600x600/FF0000/fff?text=Laptop+Gaming',
            'https://via.placeholder.com/600x600/FF4500/fff?text=Teclado+RGB',
            'https://via.placeholder.com/600x600/FF6347/fff?text=Pantalla',
            'https://via.placeholder.com/600x600/FF8C00/fff?text=Conectores'
          ],
          especificaciones: {
            marca: 'ASUS ROG',
            procesador: 'Intel Core i7-12700H',
            tarjetaGrafica: 'NVIDIA RTX 4060 8GB',
            ram: '16GB DDR4',
            almacenamiento: '1TB SSD NVMe',
            pantalla: '15.6" Full HD 144Hz',
            sistemaOperativo: 'Windows 11',
            conectividad: 'Wi-Fi 6, Bluetooth 5.2, USB-C, HDMI',
            bateria: '90Wh',
            peso: '2.3 kg'
          }
        }
      };
      
      const mockProduct = mockProducts[parseInt(id)];
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  };

  const handleProductAction = (action) => {
    console.log(`Acción: ${action} para producto ${id}`);
    
    switch (action) {
      case 'approve':
        setProduct(prev => ({
          ...prev,
          estado: 'activo'
        }));
        break;
      case 'reject':
        setProduct(prev => ({
          ...prev,
          estado: 'rechazado'
        }));
        break;
      case 'suspend':
        setProduct(prev => ({
          ...prev,
          estado: 'suspendido'
        }));
        break;
      case 'reactivate':
        setProduct(prev => ({
          ...prev,
          estado: 'activo'
        }));
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pendiente': { text: 'Pendiente', class: 'status-pending' },
      'activo': { text: 'Activo', class: 'status-active' },
      'freepass': { text: 'Freepass', class: 'status-freepass' },
      'suspendido': { text: 'Suspendido', class: 'status-suspended' },
      'rechazado': { text: 'Rechazado', class: 'status-rejected' }
    };
    
    return badges[status] || badges['pendiente'];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="module">
        <div className="error-container">
          <h2>Producto no encontrado</h2>
          <Button onClick={() => navigate('/productos')}>
            Volver a la lista
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusBadge(product.estado);

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <div className="product-header-info">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/productos')}
              className="back-button"
            >
              ← Volver
            </Button>
            <div className="product-title">
              <h1 className="module-title">{product.nombre}</h1>
              <p className="module-subtitle">
                SKU: {product.sku} • Seller: {product.seller}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones según estado */}
        <div className="product-actions">
          <span className={`status-badge ${statusInfo.class}`}>
            {statusInfo.text}
          </span>
          
          {product.estado === 'pendiente' && (
            <>
              <Button 
                variant="success"
                onClick={() => handleProductAction('approve')}
              >
                Aprobar Producto
              </Button>
              <Button 
                variant="danger"
                onClick={() => handleProductAction('reject')}
              >
                Rechazar Producto
              </Button>
            </>
          )}
          
          {(product.estado === 'activo' || product.estado === 'freepass') && (
            <Button 
              variant="warning"
              onClick={() => handleProductAction('suspend')}
            >
              Suspender Producto
            </Button>
          )}
          
          {product.estado === 'freepass' && (
            <div className="freepass-info">
              <div className="freepass-badge">
                <span className="freepass-icon">🚀</span>
                <div className="freepass-text">
                  <strong>Producto Freepass</strong>
                  <p>Este producto se sincronizó automáticamente sin validación previa</p>
                </div>
              </div>
            </div>
          )}
          
          {product.estado === 'suspendido' && (
            <Button 
              variant="success"
              onClick={() => handleProductAction('reactivate')}
            >
              Reactivar Producto
            </Button>
          )}
        </div>
      </div>

      <div className="product-detail-content">
        {/* Sección principal con imágenes y detalles */}
        <div className="product-main">
          {/* Galería de imágenes */}
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.imagenes[activeImageIndex]} 
                alt={product.nombre}
                className="product-image"
              />
            </div>
            <div className="image-thumbnails">
              {product.imagenes.map((imagen, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={imagen} alt={`Vista ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Información principal */}
          <div className="product-info">
            <div className="product-basic-info">
              <h2>{product.nombre}</h2>
              <div className="product-meta">
                <span className="product-category">{product.categoria}</span>
                <span className="product-seller">por {product.seller}</span>
              </div>
              <div className="product-price">
                {formatPrice(product.precio)}
              </div>
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.descripcion}</p>
            </div>

            <div className="product-specifications">
              <h3>Especificaciones</h3>
              <div className="specs-grid">
                {Object.entries(product.especificaciones).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-metadata">
              <h3>Información adicional</h3>
              <div className="metadata-grid">
                <div className="metadata-item">
                  <span className="metadata-label">SKU:</span>
                  <span className="metadata-value">{product.sku}</span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Fecha de creación:</span>
                  <span className="metadata-value">
                    {new Date(product.fechaCreacion).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="metadata-item">
                  <span className="metadata-label">Seller:</span>
                  <span className="metadata-value">{product.seller}</span>
                </div>
                 <div className="metadata-item">
                  <span className="metadata-label">Stock:</span>
                  <span className="metadata-value">405</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;