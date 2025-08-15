import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import SellerStats from '../../components/sellers/SellerStats';
import SellerTable from '../../components/sellers/SellerTable';
import './SellersPending.css';

const SellersPending = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSellers, setSelectedSellers] = useState([]);

  useEffect(() => {
    loadSellers();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [sellers, filters, searchTerm]);

  const loadSellers = async () => {
    setLoading(true);
    // Simular carga de datos - solo sellers pendientes
    setTimeout(() => {
      const mockSellers = [
        {
          id: 6,
          nombre: 'Nueva Tienda Fashion',
          tipoPersona: 'Persona Moral',
          tipoSociedad: 'S.A. de C.V.',
          estado: 'pendiente',
          email: 'info@nuevafashion.com',
          telefono: '+52 55 9876 5432',
          fechaRegistro: '2024-02-12T09:00:00Z',
          categorias: ['Ropa', 'Accesorios'],
          documentos: {
            actaConstitutiva: { verificado: false },
            contratoSears: { verificado: false },
            contratoSanborns: { verificado: false }
          }
        },
        {
          id: 7,
          nombre: 'TechWorld Premium',
          tipoPersona: 'Persona Física',
          tipoSociedad: null,
          estado: 'pendiente',
          email: 'contacto@techworldpremium.com',
          telefono: '+52 55 5432 1098',
          fechaRegistro: '2024-02-13T14:30:00Z',
          categorias: ['Electrónicos', 'Computación'],
          documentos: {
            actaConstitutiva: { verificado: false },
            contratoSears: { verificado: false },
            contratoSanborns: { verificado: false }
          }
        },
        {
          id: 8,
          nombre: 'Home Deco Plus',
          tipoPersona: 'Persona Moral',
          tipoSociedad: 'S. de R.L.',
          estado: 'pendiente',
          email: 'ventas@homedecoplus.com',
          telefono: '+52 55 1357 2468',
          fechaRegistro: '2024-02-14T11:15:00Z',
          categorias: ['Hogar', 'Decoración'],
          documentos: {
            actaConstitutiva: { verificado: false },
            contratoSears: { verificado: false },
            contratoSanborns: { verificado: false }
          }
        }
      ];
      
      setSellers(mockSellers);
      setLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    let filtered = [...sellers];

    // Filtro de búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(seller => 
        seller.nombre.toLowerCase().includes(search) ||
        seller.email.toLowerCase().includes(search) ||
        seller.tipoPersona.toLowerCase().includes(search)
      );
    }

    // Filtro de tipo de persona
    if (filters.tipoPersona && filters.tipoPersona !== 'todos') {
      filtered = filtered.filter(seller => seller.tipoPersona === filters.tipoPersona);
    }

    setFilteredSellers(filtered);
  };

  const handleSellerAction = (action, sellerId) => {
    console.log(`Acción: ${action}, Seller: ${sellerId}`);
    
    switch (action) {
      case 'approve':
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { ...seller, estado: 'activo' }
            : seller
        ));
        break;
      case 'reject':
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { ...seller, estado: 'rechazado' }
            : seller
        ));
        break;
      case 'view':
      case 'review':
        navigate(`/sellers/${sellerId}`);
        break;
      case 'bulk-approve':
        setSellers(prev => prev.map(seller => 
          sellerId.includes(seller.id)
            ? { ...seller, estado: 'activo' }
            : seller
        ));
        setSelectedSellers([]);
        break;
      case 'bulk-reject':
        setSellers(prev => prev.map(seller => 
          sellerId.includes(seller.id)
            ? { ...seller, estado: 'rechazado' }
            : seller
        ));
        setSelectedSellers([]);
        break;
      default:
        break;
    }
  };

  const handleExportList = () => {
    console.log('Exportar lista de sellers pendientes');
    // Implementar exportación
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Tiendas Por Autorizar</h1>
          <p className="module-subtitle">
            Revise y apruebe nuevas tiendas antes de su activación
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

      <div className="sellers-content">
        {/* Stats de sellers pendientes */}
        <SellerStats loading={loading} pendingOnly={true} />
        
        {/* Tabla de sellers pendientes con filtros integrados */}
        <SellerTable
          sellers={filteredSellers}
          loading={loading}
          onSellerAction={handleSellerAction}
          onSellerSelect={setSelectedSellers}
          selectedSellers={selectedSellers}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearchTerm}
          pendingOnly={true}
        />
      </div>
    </div>
  );
};

export default SellersPending;