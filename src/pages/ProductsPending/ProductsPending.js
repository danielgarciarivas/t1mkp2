import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ProductStats from '../../components/products/ProductStats';
import ProductTable from '../../components/products/ProductTable';
import './ProductsPending.css';

const ProductsPending = () => {
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
    // Simular carga de datos - solo productos pendientes
    setTimeout(() => {
      const mockProducts = [
        {
          id: 7,
          nombre: 'MacBook Pro M3 14"',
          sku: 'MBP14M3001',
          seller: 'TechWorld Premium',
          precio: 45999,
          categoria: 'electronicos',
          estado: 'pendiente',
          fechaCreacion: '2024-02-13T10:30:00Z'
        },
        {
          id: 8,
          nombre: 'Samsung Galaxy S24 Ultra',
          sku: 'SGS24U256',
          seller: 'Nueva Tienda Fashion',
          precio: 28999,
          categoria: 'electronicos',
          estado: 'pendiente',
          fechaCreacion: '2024-02-13T14:15:00Z'
        },
        {
          id: 9,
          nombre: 'Sofá Esquinero Premium',
          sku: 'SOFESP001',
          seller: 'Home Deco Plus',
          precio: 22999,
          categoria: 'hogar',
          estado: 'pendiente',
          fechaCreacion: '2024-02-14T09:00:00Z'
        },
        {
          id: 10,
          nombre: 'Vestido Formal Elegante',
          sku: 'VESFOR001',
          seller: 'Nueva Tienda Fashion',
          precio: 1899,
          categoria: 'ropa',
          estado: 'pendiente',
          fechaCreacion: '2024-02-14T16:45:00Z'
        },
        {
          id: 11,
          nombre: 'Monitor Gaming 4K 32"',
          sku: 'MON4K32001',
          seller: 'TechWorld Premium',
          precio: 12999,
          categoria: 'electronicos',
          estado: 'pendiente',
          fechaCreacion: '2024-02-15T11:30:00Z'
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

    // Filtro de categoría
    if (filters.categoria && filters.categoria !== 'todas') {
      filtered = filtered.filter(product => product.categoria === filters.categoria);
    }

    // Filtro de seller
    if (filters.seller && filters.seller !== 'todos') {
      const sellerMap = {
        'techworld': 'TechWorld Premium',
        'nuevafashion': 'Nueva Tienda Fashion',
        'homedeco': 'Home Deco Plus'
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
      case 'view':
      case 'review':
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
    console.log('Exportar lista de productos pendientes');
    // Implementar exportación
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Productos Por Autorizar</h1>
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
        {/* Stats de productos pendientes */}
        <ProductStats loading={loading} pendingOnly={true} />
        
        {/* Tabla de productos pendientes con filtros integrados */}
        <ProductTable
          products={filteredProducts}
          loading={loading}
          onProductAction={handleProductAction}
          onProductSelect={setSelectedProducts}
          selectedProducts={selectedProducts}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearchTerm}
          pendingOnly={true}
        />
      </div>
    </div>
  );
};

export default ProductsPending;