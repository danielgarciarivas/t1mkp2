import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import SellerStats from '../../components/sellers/SellerStats';
import SellerFilters from '../../components/sellers/SellerFilters';
import SellerTable from '../../components/sellers/SellerTable';
import './Sellers.css';

const Sellers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [categories] = useState([
    { id: 1, name: 'Electrónicos', count: 45 },
    { id: 2, name: 'Ropa y Moda', count: 32 },
    { id: 3, name: 'Hogar y Jardín', count: 28 },
    { id: 4, name: 'Deportes', count: 21 },
    { id: 5, name: 'Salud y Belleza', count: 18 }
  ]);

  useEffect(() => {
    loadSellers();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [sellers, filters, searchTerm]);

  const loadSellers = async () => {
    setLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      // Función para calcular alertas automáticas
      const calculateAlerts = (seller) => {
        const alerts = [];
        const now = new Date();
        
        // Calcular días desde última venta
        const daysSinceLastSale = seller.ultimaVenta ? 
          Math.floor((now - new Date(seller.ultimaVenta)) / (1000 * 60 * 60 * 24)) : 
          Math.floor((now - new Date(seller.fechaSolicitud)) / (1000 * 60 * 60 * 24));
        
        // Alertas por inactividad
        if (daysSinceLastSale >= 180) { // 6 meses
          alerts.push({
            type: 'suspension_risk',
            severity: 'critical',
            message: `Sin ventas por ${daysSinceLastSale} días. Riesgo de suspensión automática.`
          });
        } else if (daysSinceLastSale >= 120) { // 4 meses
          alerts.push({
            type: 'low_activity',
            severity: 'warning',
            message: `Sin ventas por ${daysSinceLastSale} días. Actividad muy baja.`
          });
        } else if (daysSinceLastSale >= 60) { // 2 meses
          alerts.push({
            type: 'inactive',
            severity: 'info',
            message: `Sin ventas por ${daysSinceLastSale} días. Considerar contacto.`
          });
        }
        
        // Alertas por rendimiento bajo
        if (seller.ventasMes < 5 && daysSinceLastSale < 60) {
          alerts.push({
            type: 'low_performance',
            severity: 'warning',
            message: `Solo ${seller.ventasMes} ventas este mes. Rendimiento bajo.`
          });
        }
        
        // Auto-suspensión por inactividad prolongada
        if (daysSinceLastSale >= 180) {
          return {
            ...seller,
            estado: 'suspendido',
            motivoSuspension: 'inactividad_automatica',
            fechaSuspension: new Date(Date.now() - (daysSinceLastSale - 180) * 24 * 60 * 60 * 1000).toISOString(),
            alerts: alerts
          };
        }
        
        return {
          ...seller,
          alerts: alerts
        };
      };

      const baseSellers = [
        {
          id: 1,
          nombre: 'TechStore Pro',
          email: 'contact@techstore.com',
          telefono: '+52 55 1234 5678',
          rfc: 'TSP980312ABC',
          rfcValidado: true,
          estado: 'activo',
          fechaSolicitud: '2024-01-15T10:30:00Z',
          ultimaVenta: '2024-02-10T14:30:00Z',
          ventasMes: 45,
          categorias: [
            { id: 1, nombre: 'Electrónicos' },
            { id: 4, nombre: 'Deportes' }
          ],
          rating: 4.8,
          odr: 2.1,
          urgente: false,
          validationState: null
        },
        {
          id: 2,
          nombre: 'Fashion Boutique',
          email: 'info@fashionb.com',
          telefono: '+52 55 2345 6789',
          rfc: 'FAB850420DEF',
          rfcValidado: true,
          estado: 'activo',
          fechaSolicitud: '2024-01-20T14:15:00Z',
          ultimaVenta: '2023-10-15T10:00:00Z', // Más de 4 meses sin ventas
          ventasMes: 2,
          categorias: [
            { id: 2, nombre: 'Ropa y Moda' }
          ],
          rating: 4.6,
          odr: 1.8,
          urgente: false,
          validationState: null
        },
        {
          id: 3,
          nombre: 'Home Decor Plus',
          email: 'sales@homedecor.com',
          telefono: '+52 55 3456 7890',
          rfc: 'HDP920815GHI',
          rfcValidado: false,
          estado: 'pendiente',
          fechaSolicitud: '2024-02-01T09:00:00Z',
          categorias: [
            { id: 3, nombre: 'Hogar y Jardín' }
          ],
          rating: null,
          odr: null,
          urgente: true,
          validationState: 'pending'
        },
        {
          id: 4,
          nombre: 'Sports World',
          email: 'info@sportsworld.com',
          telefono: '+52 55 4567 8901',
          rfc: 'SPW750630JKL',
          rfcValidado: true,
          estado: 'suspendido',
          fechaSolicitud: '2023-08-10T16:45:00Z', // 6+ meses sin ventas - auto suspendido
          ultimaVenta: null,
          ventasMes: 0,
          categorias: [
            { id: 4, nombre: 'Deportes' },
            { id: 5, nombre: 'Salud y Belleza' }
          ],
          rating: null,
          odr: null,
          urgente: false,
          validationState: null
        },
        {
          id: 5,
          nombre: 'Beauty Corner',
          email: 'hello@beautycorner.com',
          telefono: '+52 55 5678 9012',
          rfc: 'BCR830925MNO',
          rfcValidado: true,
          estado: 'bloqueado',
          fechaSolicitud: '2024-01-10T11:20:00Z',
          ultimaVenta: '2024-01-25T14:00:00Z',
          ventasMes: 15,
          categorias: [
            { id: 5, nombre: 'Salud y Belleza' }
          ],
          rating: 4.2,
          odr: 6.8,
          urgente: false,
          validationState: null
        },
        {
          id: 6,
          nombre: 'Electronics Hub',
          email: 'contact@electronicsHub.com',
          telefono: '+52 55 6789 0123',
          rfc: 'ELH940710PQR',
          rfcValidado: false,
          estado: 'inactivo',
          fechaSolicitud: '2024-02-08T13:30:00Z',
          ultimaVenta: '2023-11-20T10:00:00Z', // Seller marcado como inactivo
          ventasMes: 0,
          categorias: [
            { id: 1, nombre: 'Electrónicos' }
          ],
          rating: 3.8,
          odr: 3.2,
          urgente: false,
          validationState: null,
          motivoInactividad: 'decision_seller'
        },
        {
          id: 7,
          nombre: 'Garden Center Plus',
          email: 'info@gardenplus.com',
          telefono: '+52 55 7890 1234',
          rfc: 'GCP880901STU',
          rfcValidado: true,
          estado: 'pendiente',
          fechaSolicitud: '2024-02-15T16:20:00Z',
          ventasMes: 0,
          categorias: [
            { id: 3, nombre: 'Hogar y Jardín' }
          ],
          rating: null,
          odr: null,
          urgente: false,
          validationState: 'pending'
        },
        {
          id: 8,
          nombre: 'Mega Sports Store',
          email: 'ventas@megasports.com',
          telefono: '+52 55 8901 2345',
          rfc: 'MSS920415VWX',
          rfcValidado: true,
          estado: 'activo',
          fechaSolicitud: '2023-12-05T12:00:00Z',
          ultimaVenta: '2024-02-14T16:45:00Z',
          ventasMes: 38,
          categorias: [
            { id: 4, nombre: 'Deportes' }
          ],
          rating: 4.9,
          odr: 1.2,
          urgente: false,
          validationState: null
        }
      ];
      
      // Aplicar cálculo de alertas a todos los sellers
      const sellersWithAlerts = baseSellers.map(calculateAlerts);
      
      setSellers(sellersWithAlerts);
      setLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    let filtered = [...sellers];

    // Excluir sellers pendientes - esos van al módulo "Por Autorizar"
    filtered = filtered.filter(seller => seller.estado !== 'pendiente');

    // Filtro de búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(seller => 
        seller.nombre.toLowerCase().includes(search) ||
        seller.email.toLowerCase().includes(search) ||
        seller.rfc.toLowerCase().includes(search)
      );
    }

    // Filtro de estado
    if (filters.estado && filters.estado !== 'todos') {
      filtered = filtered.filter(seller => seller.estado === filters.estado);
    }

    // Filtro de categorías
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(seller => 
        seller.categorias.some(cat => filters.categories.includes(cat.id))
      );
    }

    // Filtro de fechas
    if (filters.fechaDesde) {
      const fechaDesde = new Date(filters.fechaDesde);
      filtered = filtered.filter(seller => 
        new Date(seller.fechaSolicitud) >= fechaDesde
      );
    }

    if (filters.fechaHasta) {
      const fechaHasta = new Date(filters.fechaHasta);
      filtered = filtered.filter(seller => 
        new Date(seller.fechaSolicitud) <= fechaHasta
      );
    }

    setFilteredSellers(filtered);
  };

  const handleSellerAction = (action, sellerId) => {
    console.log(`Acción: ${action}, Seller: ${sellerId}`);
    
    switch (action) {
      case 'approve':
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { ...seller, estado: 'activo', urgente: false }
            : seller
        ));
        break;
      case 'reject':
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { ...seller, estado: 'rechazado', urgente: false }
            : seller
        ));
        break;
      case 'suspend':
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { ...seller, estado: 'suspendido' }
            : seller
        ));
        break;
      case 'reactivate':
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { ...seller, estado: 'activo' }
            : seller
        ));
        break;
      case 'review':
      case 'view':
        // Navegar a la página de detalle del seller
        navigate(`/sellers/${sellerId}`);
        break;
      case 'bulk-approve':
        setSellers(prev => prev.map(seller => 
          sellerId.includes(seller.id)
            ? { ...seller, estado: 'activo', urgente: false }
            : seller
        ));
        setSelectedSellers([]);
        break;
      case 'bulk-reject':
        setSellers(prev => prev.map(seller => 
          sellerId.includes(seller.id)
            ? { ...seller, estado: 'rechazado', urgente: false }
            : seller
        ));
        setSelectedSellers([]);
        break;
      default:
        break;
    }
  };

  const handleAddSeller = () => {
    console.log('Agregar nuevo seller');
    // Implementar modal para agregar seller
  };

  const handleExportList = () => {
    console.log('Exportar lista de sellers');
    // Implementar exportación
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Gestión de Tiendas</h1>
          <p className="module-subtitle">
            Autorice y Administre Tiendas, Asigne comisiones 
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
        {/* Stats de sellers */}
        <SellerStats loading={loading} />
        
        {/* Tabla de sellers con filtros integrados */}
        <SellerTable
          sellers={filteredSellers}
          loading={loading}
          onSellerAction={handleSellerAction}
          onSellerSelect={setSelectedSellers}
          selectedSellers={selectedSellers}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default Sellers;