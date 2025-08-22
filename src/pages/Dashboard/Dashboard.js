import React, { useState, useEffect } from 'react';
import MetricCard from '../../components/common/MetricCard';
import TopPerformers from '../../components/dashboard/TopPerformers';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import './Dashboard.css';

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({});
  const [topPerformers, setTopPerformers] = useState([]);
  const [allPerformers, setAllPerformers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('all'); // 'all' o ID específico del seller
  const [sellers, setSellers] = useState([]);
  const [sellerSearch, setSellerSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadDashboardData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter, selectedSeller, currentPage]);

  useEffect(() => {
    loadSellers();
  }, []);

  const loadSellers = async () => {
    // Simular carga de sellers
    setTimeout(() => {
      const mockSellers = [
        { id: 1, name: 'TechStore Pro', email: 'contact@techstore.com' },
        { id: 2, name: 'Fashion Boutique', email: 'info@fashionb.com' },
        { id: 3, name: 'Home Decor Plus', email: 'sales@homedecor.com' },
        { id: 4, name: 'Sports World', email: 'info@sportsworld.com' },
        { id: 5, name: 'Beauty Corner', email: 'hello@beautycorner.com' },
        { id: 6, name: 'Electronics Hub', email: 'contact@electronicsHub.com' },
        { id: 7, name: 'Auto Parts Store', email: 'info@autoparts.com' },
        { id: 8, name: 'Book Paradise', email: 'books@paradise.com' }
      ];
      setSellers(mockSellers);
    }, 500);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      if (selectedSeller === 'all') {
        // Vista de marketplace (todos los sellers)
        setMetrics({
          sellersActivos: { value: '87', change: '+2', changeType: 'positive' },
          sellersPendientes: { value: '14', change: '+7', changeType: 'positive' },
          gmv: { value: '$1,847,250', change: '+12.5%', changeType: 'positive' },
          productosActivos: { value: '3,456', change: '+156', changeType: 'positive' },
          pedidosXLiquidar: { value: '142', change: '+18', changeType: 'neutral' },
          comisiones: { value: '$92,360', change: '+8.3%', changeType: 'positive' }
        });
        const allSellersData = [
          { id: 1, name: 'TechStore Pro', rating: 4.8,  value: '$45,230', growth: 15 },
          { id: 2, name: 'Fashion Boutique', rating: 4.6, odr: 1.8, value: '$38,120', growth: 8 },
          { id: 3, name: 'Home Decor Plus', rating: 4.5, odr: 2.5, value: '$32,890', growth: -2 },
          { id: 4, name: 'Sports World', rating: 4.7, odr: 1.9, value: '$28,450', growth: 12 },
          { id: 5, name: 'Beauty Corner', rating: 4.4, odr: 3.1, value: '$24,670', growth: 5 },
          { id: 6, name: 'Electronics Hub', rating: 4.2, odr: 2.8, value: '$22,340', growth: 7 },
          { id: 7, name: 'Auto Parts Store', rating: 4.6, odr: 1.5, value: '$19,850', growth: -3 },
          { id: 8, name: 'Book Paradise', rating: 4.3, odr: 2.2, value: '$18,720', growth: 10 },
          { id: 9, name: 'Garden Center', rating: 4.5, odr: 1.9, value: '$16,450', growth: 6 },
          { id: 10, name: 'Pet Supplies Plus', rating: 4.4, odr: 2.6, value: '$15,230', growth: 4 },
          { id: 11, name: 'Music Store Pro', rating: 4.1, odr: 3.2, value: '$14,680', growth: -1 },
          { id: 12, name: 'Kitchen Essentials', rating: 4.7, odr: 1.7, value: '$13,920', growth: 8 },
          { id: 13, name: 'Fitness World', rating: 4.2, odr: 2.4, value: '$12,540', growth: 3 },
          { id: 14, name: 'Baby Care Store', rating: 4.6, odr: 1.8, value: '$11,890', growth: 5 },
          { id: 15, name: 'Office Supplies Co', rating: 4.3, odr: 2.1, value: '$10,720', growth: 2 }
        ];
        setAllPerformers(allSellersData);
        setTopPerformers(allSellersData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      } else {
        // Datos específicos del seller seleccionado
        const sellerSpecificData = getSellerSpecificData(selectedSeller);
        setMetrics(sellerSpecificData.metrics);
        setAllPerformers(sellerSpecificData.allProducts);
        setTopPerformers(sellerSpecificData.allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
      }
      
      setActivities([
        {
          id: 1,
          orderId: 'ORD-2024-001',
          type: 'order',
          title: 'Nueva orden recibida',
          productName: 'iPhone 15 Pro',
          seller: 'TechStore Pro',
          marketplace: 'Sears',
          amount: '$1,299',
          status: 'Confirmado',
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 min ago
        },
        {
          id: 2,
          orderId: 'ORD-2024-002',
          type: 'payment',
          title: 'Pago procesado',
          productName: 'Laptop Gaming',
          seller: 'TechStore Pro',
          marketplace: 'Liverpool',
          amount: '$2,499',
          status: 'Confirmado',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
          id: 3,
          orderId: 'ORD-2024-003',
          type: 'shipment',
          title: 'Orden enviada',
          productName: 'Auriculares Pro',
          seller: 'Fashion Boutique',
          marketplace: 'Sanborns',
          amount: '$299',
          status: 'Enviado',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
        },
        {
          id: 4,
          orderId: 'ORD-2024-004',
          type: 'approval',
          title: 'Producto aprobado',
          productName: 'Smartwatch',
          seller: 'Sports World',
          marketplace: 'Multiple',
          amount: '$399',
          status: 'Pendiente',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
        },
        {
          id: 5,
          orderId: 'ORD-2024-005',
          type: 'return',
          title: 'Devolución solicitada',
          productName: 'Tablet Pro',
          seller: 'Beauty Corner',
          marketplace: 'Elektra',
          amount: '$599',
          status: 'Cancelado',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
        }
      ]);
      
      setLoading(false);
    }, 1500);
  };

  const getSellerSpecificData = (sellerId) => {
    if (sellerId === 'all') {
      return {
        metrics: {
          ventasTotales: { value: '$142,350', change: '+15.2%', changeType: 'positive' },
          pedidosActivos: { value: '87', change: '12 nuevos', changeType: 'neutral' },
          productosPublicados: { value: '1,234', change: '+45', changeType: 'positive' },
          pedidosXLiquidar: { value: '23', change: '+5', changeType: 'neutral' },
          ticketPromedio: { value: '$289', change: '+8.5%', changeType: 'positive' },
          ingresosNetos: { value: '$118,945', change: '+12.8%', changeType: 'positive' }
        },
        topProducts: [
          { id: 1, name: 'iPhone 15 Pro', category: 'Electrónicos', value: '$8,450', growth: 25 },
          { id: 2, name: 'Laptop Gaming', category: 'Computadoras', value: '$6,890', growth: 18 },
          { id: 3, name: 'Auriculares Pro', category: 'Audio', value: '$4,234', growth: -5 },
          { id: 4, name: 'Smartwatch', category: 'Wearables', value: '$3,987', growth: 12 },
          { id: 5, name: 'Tablet Pro', category: 'Tabletas', value: '$2,876', growth: 8 }
        ]
      };
    } else {
      // Datos específicos por seller
      const totalMarketplaceCommission = 92360; // Total de comisiones del marketplace
      
      const sellerDataMap = {
        1: { // TechStore Pro
          metrics: {
            ventasTotales: { value: '$45,230', change: '+15.2%', changeType: 'positive' },
            pedidosActivos: { value: '23', change: '5 nuevos', changeType: 'neutral' },
            productosPublicados: { value: '156', change: '+8', changeType: 'positive' },
            pedidosXLiquidar: { value: '8', change: '+2', changeType: 'neutral' },
            ticketPromedio: { value: '$320', change: '+12.3%', changeType: 'positive' },
            ingresosNetos: { value: '$6,285', change: '42.2% del total', changeType: 'positive' }
          },
          allProducts: [
            { id: 1, name: 'iPhone 15 Pro', category: 'Electrónicos', value: '$2,450', growth: 25 },
            { id: 2, name: 'MacBook Pro', category: 'Computadoras', value: '$1,890', growth: 18 },
            { id: 3, name: 'AirPods Pro', category: 'Audio', value: '$1,234', growth: -5 },
            { id: 4, name: 'iPad Pro', category: 'Tabletas', value: '$980', growth: 12 },
            { id: 5, name: 'Apple Watch', category: 'Wearables', value: '$850', growth: 8 },
            { id: 6, name: 'Magic Keyboard', category: 'Accesorios', value: '$720', growth: 15 },
            { id: 7, name: 'Studio Display', category: 'Monitores', value: '$650', growth: -2 },
            { id: 8, name: 'HomePod mini', category: 'Audio', value: '$520', growth: 20 },
            { id: 9, name: 'Apple TV 4K', category: 'Streaming', value: '$480', growth: 6 },
            { id: 10, name: 'MagSafe Charger', category: 'Accesorios', value: '$320', growth: 10 }
          ]
        },
        2: { // Fashion Boutique
          metrics: {
            ventasTotales: { value: '$32,100', change: '+8.7%', changeType: 'positive' },
            pedidosActivos: { value: '18', change: '3 nuevos', changeType: 'neutral' },
            productosPublicados: { value: '89', change: '+12', changeType: 'positive' },
            pedidosXLiquidar: { value: '4', change: '+1', changeType: 'neutral' },
            ticketPromedio: { value: '$145', change: '+5.2%', changeType: 'positive' },
            ingresosNetos: { value: '$4,820', change: '35.8% del total', changeType: 'positive' }
          },
          allProducts: [
            { id: 1, name: 'Vestido Elegante', category: 'Ropa Mujer', value: '$1,200', growth: 15 },
            { id: 2, name: 'Bolso Designer', category: 'Accesorios', value: '$890', growth: 22 },
            { id: 3, name: 'Zapatos Formales', category: 'Calzado', value: '$650', growth: 8 },
            { id: 4, name: 'Blusa Casual', category: 'Ropa Mujer', value: '$520', growth: 12 },
            { id: 5, name: 'Falda Midi', category: 'Ropa Mujer', value: '$480', growth: 7 },
            { id: 6, name: 'Chaqueta Denim', category: 'Ropa Mujer', value: '$420', growth: 18 },
            { id: 7, name: 'Sandalias Verano', category: 'Calzado', value: '$380', growth: -3 },
            { id: 8, name: 'Collar Perlas', category: 'Joyería', value: '$350', growth: 25 },
            { id: 9, name: 'Cartera Pequeña', category: 'Accesorios', value: '$290', growth: 9 },
            { id: 10, name: 'Bufanda Seda', category: 'Accesorios', value: '$240', growth: 14 }
          ]
        }
      };
      
      return sellerDataMap[sellerId] || sellerDataMap[1]; // Default a TechStore Pro
    }
  };

  const filteredSellers = sellers.filter(seller => 
    seller.name.toLowerCase().includes(sellerSearch.toLowerCase()) ||
    seller.email.toLowerCase().includes(sellerSearch.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewAll = () => {
    if (selectedSeller === 'all') {
      // Navegar a módulo "Todas las Tiendas"
      window.location.href = '/sellers';
    } else {
      // Navegar a módulo "Todos los Productos"
      window.location.href = '/productos';
    }
  };


  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Dashboard</h1>
          <p className="module-subtitle">
            {selectedSeller === 'all'
              ? 'Resumen ejecutivo de su marketplace - Métricas, ventas y performance'
              : `Indicadores del seller ${sellers.find(s => s.id == selectedSeller)?.name || ''} - Ventas, productos y performance`
            }
          </p>
        </div>
        
        <div className="module-controls">
          <div className="seller-selector">
            <div className="seller-search-wrapper">
              <input
                type="text"
                placeholder="Buscar seller..."
                value={sellerSearch}
                onChange={(e) => setSellerSearch(e.target.value)}
                className="seller-search"
              />
              <span className="search-icon">🔍</span>
            </div>
            <select
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
              className="seller-select"
            >
              <option value="all">Todos los Sellers</option>
              {filteredSellers.map(seller => (
                <option key={seller.id} value={seller.id}>
                  {seller.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="time-filter">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="time-select"
            >
              <option value="today">Hoy</option>
              <option value="7days">7 días</option>
              <option value="30days">30 días</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        {/* Métricas principales */}
        <div className="metrics-section">
          <div className="metrics-grid">
            {selectedSeller === 'all' ? (
              <>
                <MetricCard
                  title="Sellers Activos"
                  value={metrics.sellersActivos?.value || '0'}
                  change={metrics.sellersActivos?.change}
                  changeType={metrics.sellersActivos?.changeType}
                  icon="🏪"
                  loading={loading}
                />
                <MetricCard
                  title="Sellers Pendientes"
                  value={metrics.sellersPendientes?.value || '0'}
                  change={metrics.sellersPendientes?.change}
                  changeType={metrics.sellersPendientes?.changeType}
                  icon="🏪"
                  loading={loading}
                />
                <MetricCard
                  title="GMV Este Mes"
                  value={metrics.gmv?.value || '$0'}
                  change={metrics.gmv?.change}
                  changeType={metrics.gmv?.changeType}
                  icon="💰"
                  loading={loading}
                />
                <MetricCard
                  title="Productos Activos"
                  value={metrics.productosActivos?.value || '0'}
                  change={metrics.productosActivos?.change}
                  changeType={metrics.productosActivos?.changeType}
                  icon="📦"
                  loading={loading}
                />
              
                <MetricCard
                  title="Comisiones Generadas"
                  value={metrics.comisiones?.value || '$0'}
                  change={metrics.comisiones?.change}
                  changeType={metrics.comisiones?.changeType}
                  icon="📊"
                  loading={loading}
                />
              </>
            ) : (
              <>
                <MetricCard
                  title="Ventas Totales"
                  value={metrics.ventasTotales?.value || '$0'}
                  change={metrics.ventasTotales?.change}
                  changeType={metrics.ventasTotales?.changeType}
                  icon="💰"
                  loading={loading}
                />
              
                <MetricCard
                  title="Productos Activos"
                  value={metrics.productosPublicados?.value || '0'}
                  change={metrics.productosPublicados?.change}
                  changeType={metrics.productosPublicados?.changeType}
                  icon="📦"
                  loading={loading}
                />
               
                <MetricCard
                  title="Ticket Promedio"
                  value={metrics.ticketPromedio?.value || '$0'}
                  change={metrics.ticketPromedio?.change}
                  changeType={metrics.ticketPromedio?.changeType}
                  icon="🎯"
                  loading={loading}
                />
                <MetricCard
                  title="Comisión generada"
                  value={metrics.ingresosNetos?.value || '$0'}
                  change={metrics.ingresosNetos?.change}
                  changeType={metrics.ingresosNetos?.changeType}
                  icon="📊"
                  loading={loading}
                />
              </>
            )}
          </div>
        </div>
        
        {/* Sección principal con performers y actividad */}
        <div className="dashboard-main">
          <div className="performers-section">
            <TopPerformers 
              data={topPerformers}
              allData={allPerformers}
              type={selectedSeller === 'all' ? 'sellers' : 'products'}
              loading={loading}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onViewAll={handleViewAll}
            />
          </div>
          
          <div className="activity-section">
            <ActivityFeed 
              activities={activities}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;