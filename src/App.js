import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Sellers from './pages/Sellers';
import SellersPending from './pages/SellersPending/SellersPending';
import SellerDetail from './pages/SellerDetail';
import Products from './pages/Products';
import ProductsPending from './pages/ProductsPending/ProductsPending';
import ProductsLogs from './pages/ProductsLogs';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Payments from './pages/Payments/Payments';
import Configuracion from './pages/Configuracion/Configuracion';
import Contratos from './pages/Configuracion/Contratos/Contratos';
import Categorias from './pages/Configuracion/Categorias/Categorias';
import Reglas from './pages/Configuracion/Reglas/Reglas';
import Comisiones from './pages/Configuracion/Comisiones/Comisiones';
import Facturacion from './pages/Configuracion/Facturacion/Facturacion';
import Logistica from './pages/Configuracion/Logistica/Logistica';
import ScoreTiendas from './pages/Configuracion/ScoreTiendas/ScoreTiendas';
import Liquidaciones from './pages/Configuracion/Liquidaciones/Liquidaciones';
import RolesPermisos from './pages/RolesPermisos';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta pública de login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="sellers/pending" element={<SellersPending />} />
            <Route path="sellers/:id" element={<SellerDetail />} />
            <Route path="productos" element={<Products />} />
            <Route path="productos/pending" element={<ProductsPending />} />
            <Route path="productos/logs" element={<ProductsLogs />} />
            <Route path="productos/:id" element={<ProductDetail />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="pedidos/:id" element={<OrderDetail />} />
            <Route path="pagos" element={<Payments />} />
            <Route path="configuracion" element={<Configuracion />} />
            <Route path="configuracion/contratos" element={<Contratos />} />
            <Route path="configuracion/categorias" element={<Categorias />} />
            <Route path="configuracion/reglas" element={<Reglas />} />
            <Route path="configuracion/comisiones" element={<Comisiones />} />
            <Route path="configuracion/facturacion" element={<Facturacion />} />
            <Route path="configuracion/logistica" element={<Logistica />} />
            <Route path="configuracion/score-tiendas" element={<ScoreTiendas />} />
            <Route path="configuracion/liquidaciones" element={<Liquidaciones />} />
            <Route path="roles-permisos" element={<RolesPermisos />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
