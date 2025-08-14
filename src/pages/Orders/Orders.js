import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import OrderStats from '../../components/orders/OrderStats';
import OrderTable from '../../components/orders/OrderTable';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [orders, filters, searchTerm]);

  const loadOrders = async () => {
    setLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      const mockOrders = [
        {
          id: 1,
          numeroOrden: 'ORD-2024-001256',
          estado: 'recibido',
          fecha: '2024-02-10T14:30:00Z',
          total: 27498,
          cliente: {
            nombre: 'Ana García Martínez',
            email: 'ana.garcia@email.com'
          },
          seller: 'TechStore Pro',
          productos: [
            { id: 1, nombre: 'iPhone 15 Pro Max 256GB', cantidad: 1 }
          ]
        },
        {
          id: 2,
          numeroOrden: 'ORD-2024-001257',
          estado: 'validado',
          fecha: '2024-02-08T10:15:00Z',
          total: 16298,
          cliente: {
            nombre: 'Carlos Rodríguez',
            email: 'carlos.rodriguez@email.com'
          },
          seller: 'HomeStyle México',
          productos: [
            { id: 2, nombre: 'Sofá Modular 3 Piezas', cantidad: 1 }
          ]
        },
        {
          id: 3,
          numeroOrden: 'ORD-2024-001258',
          estado: 'enviado_seller',
          fecha: '2024-02-07T16:20:00Z',
          total: 3847,
          cliente: {
            nombre: 'Laura Mendoza',
            email: 'laura.mendoza@email.com'
          },
          seller: 'Sports World',
          productos: [
            { id: 4, nombre: 'Tenis Running Professional', cantidad: 1 },
            { id: 5, nombre: 'Camiseta Deportiva', cantidad: 2 }
          ]
        },
        {
          id: 4,
          numeroOrden: 'ORD-2024-001259',
          estado: 'confirmado',
          fecha: '2024-02-06T09:30:00Z',
          total: 1598,
          cliente: {
            nombre: 'Miguel Torres',
            email: 'miguel.torres@email.com'
          },
          seller: 'Beauty Corner',
          productos: [
            { id: 5, nombre: 'Serum Facial Anti-Edad', cantidad: 1 },
            { id: 6, nombre: 'Crema Hidratante', cantidad: 1 }
          ]
        },
        {
          id: 5,
          numeroOrden: 'ORD-2024-001260',
          estado: 'en_proceso_envio',
          fecha: '2024-02-05T14:45:00Z',
          total: 2299,
          cliente: {
            nombre: 'Sandra Jiménez',
            email: 'sandra.jimenez@email.com'
          },
          seller: 'FashionHub',
          productos: [
            { id: 3, nombre: 'Vestido Casual Verano', cantidad: 1 },
            { id: 7, nombre: 'Bolsa de Mano', cantidad: 1 }
          ]
        },
        {
          id: 6,
          numeroOrden: 'ORD-2024-001261',
          estado: 'en_camino',
          fecha: '2024-02-04T11:20:00Z',
          total: 5499,
          cliente: {
            nombre: 'Roberto Vázquez',
            email: 'roberto.vazquez@email.com'
          },
          seller: 'TechStore Pro',
          productos: [
            { id: 8, nombre: 'Auriculares Bluetooth', cantidad: 1 },
            { id: 9, nombre: 'Cargador Inalámbrico', cantidad: 2 }
          ]
        },
        {
          id: 7,
          numeroOrden: 'ORD-2024-001262',
          estado: 'entregado',
          fecha: '2024-02-01T08:15:00Z',
          total: 1598,
          cliente: {
            nombre: 'María López',
            email: 'maria.lopez@email.com'
          },
          seller: 'FashionHub',
          productos: [
            { id: 3, nombre: 'Vestido Casual Verano', cantidad: 1 }
          ]
        },
        {
          id: 8,
          numeroOrden: 'ORD-2024-001263',
          estado: 'cancelado',
          fecha: '2024-02-09T13:45:00Z',
          total: 2798,
          cliente: {
            nombre: 'Roberto Sánchez',
            email: 'roberto.sanchez@email.com'
          },
          seller: 'Sports World',
          productos: [
            { id: 4, nombre: 'Tenis Running Professional', cantidad: 1 }
          ]
        },
        {
          id: 9,
          numeroOrden: 'ORD-2024-001264',
          estado: 'devuelto',
          fecha: '2024-01-25T11:30:00Z',
          total: 1198,
          cliente: {
            nombre: 'Patricia Hernández',
            email: 'patricia.hernandez@email.com'
          },
          seller: 'Beauty Corner',
          productos: [
            { id: 5, nombre: 'Serum Facial Anti-Edad', cantidad: 1 }
          ]
        },
        {
          id: 10,
          numeroOrden: 'ORD-2024-001265',
          estado: 'recibido',
          fecha: '2024-02-11T16:00:00Z',
          total: 8999,
          cliente: {
            nombre: 'Eduardo Morales',
            email: 'eduardo.morales@email.com'
          },
          seller: 'HomeStyle México',
          productos: [
            { id: 10, nombre: 'Mesa de Centro', cantidad: 1 },
            { id: 11, nombre: 'Cojines Decorativos', cantidad: 4 }
          ]
        },
        {
          id: 11,
          numeroOrden: 'ORD-2024-001266',
          estado: 'validado',
          fecha: '2024-02-11T12:30:00Z',
          total: 4567,
          cliente: {
            nombre: 'Carmen Rivera',
            email: 'carmen.rivera@email.com'
          },
          seller: 'TechStore Pro',
          productos: [
            { id: 12, nombre: 'Tablet Android 128GB', cantidad: 1 },
            { id: 13, nombre: 'Funda Protectora', cantidad: 1 }
          ]
        },
        {
          id: 12,
          numeroOrden: 'ORD-2024-001267',
          estado: 'confirmado',
          fecha: '2024-02-10T09:45:00Z',
          total: 1999,
          cliente: {
            nombre: 'José Luis Pérez',
            email: 'jose.perez@email.com'
          },
          seller: 'Sports World',
          productos: [
            { id: 14, nombre: 'Mancuernas 5kg', cantidad: 2 },
            { id: 15, nombre: 'Tapete para Yoga', cantidad: 1 }
          ]
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Filtro de búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.numeroOrden.toLowerCase().includes(search) ||
        order.cliente.nombre.toLowerCase().includes(search) ||
        order.cliente.email.toLowerCase().includes(search) ||
        order.seller.toLowerCase().includes(search)
      );
    }

    // Filtro de estado
    if (filters.estado && filters.estado !== '') {
      filtered = filtered.filter(order => order.estado === filters.estado);
    }

    // Filtro de seller
    if (filters.seller && filters.seller !== '') {
      filtered = filtered.filter(order => order.seller === filters.seller);
    }

    // Filtro de fechas
    if (filters.fechaDesde) {
      const fechaDesde = new Date(filters.fechaDesde);
      filtered = filtered.filter(order => 
        new Date(order.fecha) >= fechaDesde
      );
    }

    if (filters.fechaHasta) {
      const fechaHasta = new Date(filters.fechaHasta);
      filtered = filtered.filter(order => 
        new Date(order.fecha) <= fechaHasta
      );
    }

    setFilteredOrders(filtered);
  };

  const handleOrderAction = (action, orderId) => {
    console.log(`Acción: ${action}, Pedido: ${orderId}`);
    
    switch (action) {
      case 'validate':
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, estado: 'validado' }
            : order
        ));
        break;
      case 'cancel':
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, estado: 'cancelado' }
            : order
        ));
        break;
      case 'review':
      case 'view':
        // Navegar a la página de detalle del pedido
        navigate(`/pedidos/${orderId}`);
        break;
      case 'bulk-export':
        console.log('Exportar pedidos seleccionados:', orderId);
        setSelectedOrders([]);
        break;
      default:
        break;
    }
  };

  const handleExportList = () => {
    console.log('Exportar lista de pedidos');
    // Implementar exportación
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Gestión de Pedidos</h1>
          <p className="module-subtitle">
            Administre y supervise todos los pedidos del marketplace
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

      <div className="orders-content">
        {/* Stats de pedidos */}
        <OrderStats loading={loading} />
        
        {/* Tabla de pedidos con filtros integrados */}
        <OrderTable
          orders={filteredOrders}
          loading={loading}
          onOrderAction={handleOrderAction}
          onOrderSelect={setSelectedOrders}
          selectedOrders={selectedOrders}
          filters={filters}
          onFiltersChange={setFilters}
          onSearch={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default Orders;