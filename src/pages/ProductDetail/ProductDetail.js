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
  const [activeTab, setActiveTab] = useState('info');
  const [logs, setLogs] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [productCommission, setProductCommission] = useState({
    personalizada: null,
    categoria: 8.5,
    aplicada: 8.5,
    tienePersonalizada: false
  });

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
            'https://resources.sears.com.mx/medios-plazavip/mkt/63d42f699b98a_12progrisjpg.jpg?scale=500&qlty=75',
            'https://resources.sears.com.mx/medios-plazavip/mkt/63d42f699b98a_12progrisjpg.jpg?scale=500&qlty=75',
            'https://resources.sears.com.mx/medios-plazavip/mkt/63d42f699b98a_12progrisjpg.jpg?scale=500&qlty=75'
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
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
            'https://images.unsplash.com/photo-1556228724-f926b5cd2178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
      
      // Mock data para logs y cronogramas
      const mockLogs = [
        {
          id: 1,
          fecha: '2024-02-15T14:30:00Z',
          accion: 'Producto creado',
          usuario: 'Sistema',
          detalles: 'Producto sincronizado desde la API del seller'
        },
        {
          id: 2,
          fecha: '2024-02-15T14:35:00Z',
          accion: 'Enviado a revisión',
          usuario: 'Sistema',
          detalles: 'Producto enviado automáticamente para validación'
        },
        {
          id: 3,
          fecha: '2024-02-16T09:15:00Z',
          accion: 'Precio actualizado',
          usuario: 'admin@marketplace.com',
          detalles: 'Precio cambió de $26,999 a $24,999'
        },
        {
          id: 4,
          fecha: '2024-02-16T10:00:00Z',
          accion: 'Stock actualizado',
          usuario: 'seller@techstore.com',
          detalles: 'Stock actualizado de 450 a 405 unidades'
        }
      ];
      
      const mockPriceHistory = [
        { fecha: '2024-02-15', precio: 26999, usuario: 'Sistema', motivo: 'Precio inicial' },
        { fecha: '2024-02-16', precio: 24999, usuario: 'admin@marketplace.com', motivo: 'Ajuste promocional' }
      ];
      
      const mockStockHistory = [
        { fecha: '2024-02-15', stock: 500, usuario: 'Sistema', motivo: 'Stock inicial' },
        { fecha: '2024-02-16', stock: 450, usuario: 'seller@techstore.com', motivo: 'Venta realizada' },
        { fecha: '2024-02-16', stock: 405, usuario: 'seller@techstore.com', motivo: 'Venta realizada' }
      ];
      
      // Agregar fechas importantes al producto
      // Agregar variantes de ejemplo basadas en el tipo de producto
      let variants = [];
      
      if (mockProduct.categoria === 'Ropa') {
        variants = [
          {
            id: 1,
            nombre: 'Talla S - Azul cielo',
            atributos: { talla: 'S', color: 'Azul cielo' },
            sku: `${mockProduct.sku}-S-BLUE`,
            precio: mockProduct.precio,
            stock: 25,
            imagen: mockProduct.imagenes[0]
          },
          {
            id: 2,
            nombre: 'Talla M - Azul cielo',
            atributos: { talla: 'M', color: 'Azul cielo' },
            sku: `${mockProduct.sku}-M-BLUE`,
            precio: mockProduct.precio,
            stock: 35,
            imagen: mockProduct.imagenes[1]
          },
          {
            id: 3,
            nombre: 'Talla L - Azul cielo',
            atributos: { talla: 'L', color: 'Azul cielo' },
            sku: `${mockProduct.sku}-L-BLUE`,
            precio: mockProduct.precio,
            stock: 20,
            imagen: mockProduct.imagenes[2]
          },
          {
            id: 4,
            nombre: 'Talla S - Rosa coral',
            atributos: { talla: 'S', color: 'Rosa coral' },
            sku: `${mockProduct.sku}-S-PINK`,
            precio: mockProduct.precio + 100,
            stock: 15,
            imagen: mockProduct.imagenes[3]
          },
          {
            id: 5,
            nombre: 'Talla M - Rosa coral',
            atributos: { talla: 'M', color: 'Rosa coral' },
            sku: `${mockProduct.sku}-M-PINK`,
            precio: mockProduct.precio + 100,
            stock: 30,
            imagen: mockProduct.imagenes[0]
          }
        ];
      } else if (mockProduct.categoria === 'Deportes') {
        variants = [
          {
            id: 1,
            nombre: 'Talla 25 cm - Negro/Azul',
            atributos: { talla: '25 cm', color: 'Negro/Azul' },
            sku: `${mockProduct.sku}-25-BLK`,
            precio: mockProduct.precio,
            stock: 12,
            imagen: mockProduct.imagenes[0]
          },
          {
            id: 2,
            nombre: 'Talla 26 cm - Negro/Azul',
            atributos: { talla: '26 cm', color: 'Negro/Azul' },
            sku: `${mockProduct.sku}-26-BLK`,
            precio: mockProduct.precio,
            stock: 18,
            imagen: mockProduct.imagenes[1]
          },
          {
            id: 3,
            nombre: 'Talla 27 cm - Negro/Azul',
            atributos: { talla: '27 cm', color: 'Negro/Azul' },
            sku: `${mockProduct.sku}-27-BLK`,
            precio: mockProduct.precio,
            stock: 22,
            imagen: mockProduct.imagenes[2]
          },
          {
            id: 4,
            nombre: 'Talla 28 cm - Blanco/Rojo',
            atributos: { talla: '28 cm', color: 'Blanco/Rojo' },
            sku: `${mockProduct.sku}-28-WHT`,
            precio: mockProduct.precio + 200,
            stock: 8,
            imagen: mockProduct.imagenes[3]
          }
        ];
      } else if (mockProduct.categoria === 'Electrónicos') {
        variants = [
          {
            id: 1,
            nombre: '256GB - Titanio Natural',
            atributos: { almacenamiento: '256GB', color: 'Titanio Natural' },
            sku: `${mockProduct.sku}-256-NAT`,
            precio: mockProduct.precio,
            stock: 45,
            imagen: mockProduct.imagenes[0]
          },
          {
            id: 2,
            nombre: '512GB - Titanio Natural',
            atributos: { almacenamiento: '512GB', color: 'Titanio Natural' },
            sku: `${mockProduct.sku}-512-NAT`,
            precio: mockProduct.precio + 5000,
            stock: 32,
            imagen: mockProduct.imagenes[1]
          },
          {
            id: 3,
            nombre: '256GB - Titanio Azul',
            atributos: { almacenamiento: '256GB', color: 'Titanio Azul' },
            sku: `${mockProduct.sku}-256-BLU`,
            precio: mockProduct.precio,
            stock: 28,
            imagen: mockProduct.imagenes[2]
          },
          {
            id: 4,
            nombre: '1TB - Titanio Negro',
            atributos: { almacenamiento: '1TB', color: 'Titanio Negro' },
            sku: `${mockProduct.sku}-1TB-BLK`,
            precio: mockProduct.precio + 8000,
            stock: 15,
            imagen: mockProduct.imagenes[3]
          }
        ];
      }
      
      const enrichedProduct = {
        ...mockProduct,
        fechaActivacion: '2024-02-16T09:30:00Z',
        fechaPublicacion: '2024-02-16T10:00:00Z',
        variants: variants,
        hasVariants: variants.length > 0
      };
      
      setProduct(enrichedProduct);
      setLogs(mockLogs);
      setPriceHistory(mockPriceHistory);
      setStockHistory(mockStockHistory);
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

  const handleUpdateCommission = (newCommission) => {
    setProductCommission(prev => ({
      ...prev,
      personalizada: newCommission,
      aplicada: newCommission || prev.categoria,
      tienePersonalizada: !!newCommission
    }));
  };

  const removePersonalizedCommission = () => {
    setProductCommission(prev => ({
      ...prev,
      personalizada: null,
      aplicada: prev.categoria,
      tienePersonalizada: false
    }));
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
              <h3>Especificaciones Técnicas</h3>
              <div className="specs-grid">
                {Object.entries(product.especificaciones).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <dt className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                    <dd className="spec-value">{value}</dd>
                  </div>
                ))}
              </div>
              
              {product.hasVariants && (
                <div className="variants-indicator">
                  <div className="variants-badge">
                    <span className="variants-icon">🔀</span>
                    <div className="variants-info">
                      <strong>Producto con Variantes</strong>
                      <p>Este producto tiene {product.variants.length} variantes disponibles</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="product-metadata">
             
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas centradas debajo de todo */}
      <div className="product-tabs-section">
        <div className="product-tabs">
          <div className="tab-nav">
            <button 
              className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Información General
            </button>
            <button 
              className={`tab-button ${activeTab === 'cronologia' ? 'active' : ''}`}
              onClick={() => setActiveTab('cronologia')}
            >
              Cronología
            </button>
            <button 
              className={`tab-button ${activeTab === 'comision' ? 'active' : ''}`}
              onClick={() => setActiveTab('comision')}
            >
              Comisión
            </button>
            {product.hasVariants && (
              <button 
                className={`tab-button ${activeTab === 'variants' ? 'active' : ''}`}
                onClick={() => setActiveTab('variants')}
              >
                Variantes ({product.variants.length})
              </button>
            )}
          </div>
          
          <div className="tab-content">
            {activeTab === 'info' && (
              <div className="product-metadata-extended">
                <h3>Información Detallada del Producto</h3>
                <div className="metadata-grid-extended">
                  <div className="metadata-item">
                    <span className="metadata-label">SKU:</span>
                    <span className="metadata-value">{product.sku}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Fecha de creación:</span>
                    <span className="metadata-value">
                      {new Date(product.fechaCreacion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Fecha de activación:</span>
                    <span className="metadata-value">
                      {product.fechaActivacion ? 
                        new Date(product.fechaActivacion).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Pendiente'
                      }
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Fecha de publicación:</span>
                    <span className="metadata-value">
                      {product.fechaPublicacion ? 
                        new Date(product.fechaPublicacion).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Pendiente'
                      }
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Seller:</span>
                    <span className="metadata-value">{product.seller}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">Stock actual:</span>
                    <span className="metadata-value">405 unidades</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'cronologia' && (
              <div className="cronologia-content">
                <div className="cronologia-grid">
                  {/* Logs del producto */}
                  <div className="logs-section">
                    <h3>Registro de Actividad</h3>
                    <div className="logs-container">
                      {logs.map(log => (
                        <div key={log.id} className="log-item">
                          <div className="log-timestamp">
                            {new Date(log.fecha).toLocaleDateString('es-ES', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          <div className="log-content">
                            <div className="log-action">{log.accion}</div>
                            <div className="log-details">{log.detalles}</div>
                            <div className="log-user">por {log.usuario}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cronograma de cambios */}
                  <div className="history-section">
                    <h3>Historial de Cambios (Últimos 30 días)</h3>
                    
                    {/* Historial de precios */}
                    <div className="history-subsection">
                      <div className="changes-summary">
                        <span className="changes-count">
                         💰 Se cambió {priceHistory.length} veces el precio en los últimos 30 días
                        </span>
                      </div>
                    </div>
                    
                    {/* Historial de stock */}
                    <div className="history-subsection">
                      <div className="changes-summary">
                        <span className="changes-count">
                         📦 Se cambió {stockHistory.length} veces el stock en los últimos 30 días
                        </span>
                      </div>
                    </div>
                    
                    {/* Fechas importantes */}
                    <div className="history-subsection">
                      <div className="important-dates">
                        <div className="date-item">
                          <span className="date-label"> 📅 Creación:</span>
                          <span className="date-value">
                            {product.fechaActivacion ? 
                              new Date(product.fechaActivacion).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : 'Pendiente'
                            }
                          </span>
                        </div>
                        <div className="date-item">
                          <span className="date-label">📅 Publicación:</span>
                          <span className="date-value">
                            {product.fechaPublicacion ? 
                              new Date(product.fechaPublicacion).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }) : 'Pendiente'
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'comision' && (
              <div className="commission-content">
                <div className="commission-header">
                  <h3>Comisión del Producto</h3>
                  <p>Configure la comisión específica para este producto</p>
                </div>
                
                <div className="commission-config-grid">
                  {/* Información del producto */}
                  

                  {/* Configuración de comisión */}
                  <div className="commission-configuration">
                    <h4>⚙️ Configuración de Comisión</h4>
                    
                    <div className="commission-status">
                      <div className={`commission-indicator ${productCommission.tienePersonalizada ? 'personalized' : 'inherited'}`}>
                        {productCommission.tienePersonalizada ? (
                          <>
                            <span className="status-icon">🎯</span>
                            <div className="status-info">
                              <span className="status-title">Comisión Personalizada</span>
                              <span className="status-description">Este producto tiene una comisión específica configurada</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="status-icon">📂</span>
                            <div className="status-info">
                              <span className="status-title">Comisión de Categoría</span>
                              <span className="status-description">Usando la comisión por defecto de la categoría</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="commission-form">
                      <div className="form-group">
                        <label>Comisión Personalizada (%)</label>
                        <div className="commission-input-group">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={productCommission.personalizada || ''}
                            onChange={(e) => handleUpdateCommission(parseFloat(e.target.value) || null)}
                            placeholder={`Usa comisión de categoría en este momento`}
                            className="commission-input"
                          />
                          <span className="input-suffix">%</span>
                        </div>
                        <span className="field-help">
                          {productCommission.tienePersonalizada 
                            ? `Comisión personalizada: ${productCommission.personalizada}%` 
                            : `Comisión heredada de categoría "${product.categoria}": ${productCommission.categoria}%`
                          }
                        </span>
                      </div>

                      {productCommission.tienePersonalizada && (
                        <Button 
                          variant="secondary"
                          size="small"
                          onClick={removePersonalizedCommission}
                        >
                          Usar Comisión de Categoría
                        </Button>
                      )}
                    </div>

                    {/* Vista previa de comisión */}
                    <div className="commission-preview">
                      <h5>💡 Vista Previa de Comisión</h5>
                      <div className="preview-calculations">
                        <div className="calculation-row">
                          <span className="calc-label">Precio del producto:</span>
                          <span className="calc-value">{formatPrice(product.precio)}</span>
                        </div>
                        <div className="calculation-row">
                          <span className="calc-label">Comisión aplicada ({productCommission.aplicada}%):</span>
                          <span className="calc-value commission">-{formatPrice(product.precio * productCommission.aplicada / 100)}</span>
                        </div>
                        <div className="calculation-row total">
                          <span className="calc-label">Ganancia para el seller:</span>
                          <span className="calc-value">{formatPrice(product.precio - (product.precio * productCommission.aplicada / 100))}</span>
                        </div>
                      </div>
                    </div>

                    <div className="commission-actions">
                      <Button 
                        variant="primary"
                        onClick={() => {
                          alert(`✅ Comisión ${productCommission.tienePersonalizada ? 'personalizada' : 'de categoría'} guardada: ${productCommission.aplicada}%`);
                        }}
                      >
                        Guardar Configuración
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                
              </div>
            )}
            
            {activeTab === 'variants' && product.hasVariants && (
              <div className="variants-content">
                <div className="variants-header">
                  <h3>Variantes del Producto</h3>
                  <p>Este producto tiene {product.variants.length} variantes disponibles</p>
                </div>
                
                <div className="variants-grid">
                  {product.variants.map(variant => (
                    <div key={variant.id} className="variant-card">
                      <div className="variant-image">
                        <img src={variant.imagen} alt={variant.nombre} />
                      </div>
                      
                      <div className="variant-info">
                        <div className="variant-header">
                          <h4 className="variant-name">{variant.nombre}</h4>
                          <span className="variant-sku">{variant.sku}</span>
                        </div>
                        
                        <div className="variant-attributes">
                          {Object.entries(variant.atributos).map(([key, value]) => (
                            <div key={key} className="variant-attribute">
                              <span className="attr-label">{key}:</span>
                              <span className="attr-value">{value}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="variant-details">
                          <div className="variant-price">
                            <span className="price-label">Precio:</span>
                            <span className="price-value">{formatPrice(variant.precio)}</span>
                          </div>
                          
                          <div className="variant-stock">
                            <span className="stock-label">Stock:</span>
                            <span className={`stock-value ${variant.stock < 10 ? 'low-stock' : variant.stock < 20 ? 'medium-stock' : 'good-stock'}`}>
                              {variant.stock} unidades
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Resumen de variantes */}
                <div className="variants-summary">
                  <div className="summary-stats">
                    <div className="summary-stat">
                      <span className="stat-label">Total de variantes:</span>
                      <span className="stat-value">{product.variants.length}</span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-label">Stock total:</span>
                      <span className="stat-value">
                        {product.variants.reduce((total, variant) => total + variant.stock, 0)} unidades
                      </span>
                    </div>
                    <div className="summary-stat">
                      <span className="stat-label">Rango de precios:</span>
                      <span className="stat-value">
                        {formatPrice(Math.min(...product.variants.map(v => v.precio)))} - {formatPrice(Math.max(...product.variants.map(v => v.precio)))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;