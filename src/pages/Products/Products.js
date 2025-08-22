import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ProductStats from '../../components/products/ProductStats';
import ProductFilters from '../../components/products/ProductFilters';
import ProductTable from '../../components/products/ProductTable';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [products, filters, searchTerm]);

  const loadProducts = async () => {
    setLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          nombre: 'iPhone 15 Pro Max 256GB',
          sku: 'IPH15PM256',
          seller: 'TechnoMax SA',
          precio: 24999,
          categoria: 'electronicos',
          estado: 'pendiente',
          fechaCreacion: '2024-01-15T10:30:00Z',
          ventasBrutas: 1250000,
          participacion: 15.2,
          unidadesVendidas: 50
        },
        {
          id: 2,
          nombre: 'Sofá Modular 3 Piezas',
          sku: 'SOF3P001',
          seller: 'HomeStyle México',
          precio: 15999,
          categoria: 'hogar',
          estado: 'activo',
          fechaCreacion: '2024-01-20T14:15:00Z',
          ventasBrutas: 479970,
          participacion: 5.8,
          unidadesVendidas: 30
        },
        {
          id: 3,
          nombre: 'Vestido Casual Verano',
          sku: 'VES001',
          seller: 'FashionHub',
          precio: 1299,
          categoria: 'ropa',
          estado: 'suspendido',
          fechaCreacion: '2024-02-01T09:00:00Z',
          ventasBrutas: 155880,
          participacion: 1.9,
          unidadesVendidas: 120
        },
        {
          id: 4,
          nombre: 'Tenis Running Professional',
          sku: 'TEN001',
          seller: 'Sports World',
          precio: 2499,
          categoria: 'deportes',
          estado: 'rechazado',
          fechaCreacion: '2024-02-05T16:45:00Z',
          ventasBrutas: 199920,
          participacion: 2.4,
          unidadesVendidas: 80
        },
        {
          id: 5,
          nombre: 'Serum Facial Anti-Edad',
          sku: 'SER001',
          seller: 'Beauty Corner',
          precio: 899,
          categoria: 'salud',
          estado: 'pendiente',
          fechaCreacion: '2024-02-08T13:30:00Z',
          ventasBrutas: 89900,
          participacion: 1.1,
          unidadesVendidas: 100
        },
        {
          id: 6,
          nombre: 'Laptop Gaming ROG Strix',
          sku: 'LAP001ROG',
          seller: 'TechStore Pro',
          precio: 35999,
          categoria: 'electronicos',
          estado: 'freepass',
          fechaCreacion: '2024-02-10T11:20:00Z',
          ventasBrutas: 719980,
          participacion: 8.7,
          unidadesVendidas: 20
        }
      ];
      
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filtro de búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.nombre.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search) ||
        product.seller.toLowerCase().includes(search)
      );
    }

    // Filtro de estado
    if (filters.estado && filters.estado !== 'todos') {
      filtered = filtered.filter(product => product.estado === filters.estado);
    }

    // Filtro de categoría
    if (filters.categoria && filters.categoria !== 'todas') {
      filtered = filtered.filter(product => product.categoria === filters.categoria);
    }

    // Filtro de seller
    if (filters.seller && filters.seller !== 'todos') {
      const sellerMap = {
        'techstore': 'TechnoMax SA',
        'fashion': 'FashionHub',
        'homedecor': 'HomeStyle México',
        'sports': 'Sports World'
      };
      if (sellerMap[filters.seller]) {
        filtered = filtered.filter(product => product.seller === sellerMap[filters.seller]);
      }
    }

    setFilteredProducts(filtered);
  };

  const handleProductAction = (action, productId) => {
    console.log(`Acción: ${action}, Producto: ${productId}`);
    
    switch (action) {
      case 'approve':
        setProducts(prev => prev.map(product => 
          product.id === productId 
            ? { ...product, estado: 'activo' }
            : product
        ));
        break;
      case 'reject':
        setProducts(prev => prev.map(product => 
          product.id === productId 
            ? { ...product, estado: 'rechazado' }
            : product
        ));
        break;
      case 'suspend':
        setProducts(prev => prev.map(product => 
          product.id === productId 
            ? { ...product, estado: 'suspendido' }
            : product
        ));
        break;
      case 'reactivate':
        setProducts(prev => prev.map(product => 
          product.id === productId 
            ? { ...product, estado: 'activo' }
            : product
        ));
        break;
      case 'view':
        // Navegar a la página de detalle del producto
        navigate(`/productos/${productId}`);
        break;
      case 'bulk-approve':
        setProducts(prev => prev.map(product => 
          productId.includes(product.id)
            ? { ...product, estado: 'activo' }
            : product
        ));
        setSelectedProducts([]);
        break;
      case 'bulk-reject':
        setProducts(prev => prev.map(product => 
          productId.includes(product.id)
            ? { ...product, estado: 'rechazado' }
            : product
        ));
        setSelectedProducts([]);
        break;
      default:
        break;
    }
  };

  const handleExportList = () => {
    console.log('Exportar lista de productos');
    // Implementar exportación
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Gestión de Productos2</h1>
          <p className="module-subtitle">
            Revise y apruebe productos antes de su publicación
          </p>
        </div>
        
        <div className="module-actions">
          <Button 
            variant="secondary"
            onClick={handleExportList}
          >
            Exportar Lista
          </Button>
        </div>
      </div>

      <div className="products-content">
        {/* Stats de productos */}
        <ProductStats loading={loading} />
        
        {/* Tabla de productos con filtros integrados */}
        <ProductTable
          products={filteredProducts}
          loading={loading}
          onProductAction={handleProductAction}
          onProductSelect={setSelectedProducts}
          selectedProducts={selectedProducts}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default Products;