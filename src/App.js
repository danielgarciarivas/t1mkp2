import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Sellers from './pages/Sellers';
import SellersPending from './pages/SellersPending/SellersPending';
import SellerDetail from './pages/SellerDetail';
import Products from './pages/Products';
import ProductsPending from './pages/ProductsPending/ProductsPending';
import ProductDetail from './pages/ProductDetail';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Payments from './pages/Payments/Payments';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="sellers/pending" element={<SellersPending />} />
            <Route path="sellers/:id" element={<SellerDetail />} />
            <Route path="productos" element={<Products />} />
            <Route path="productos/pending" element={<ProductsPending />} />
            <Route path="productos/:id" element={<ProductDetail />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="pedidos/:id" element={<OrderDetail />} />
            <Route path="pagos" element={<Payments />} />
            <Route path="configuracion" element={<div className="module"><div className="module-header"><div className="module-title-section"><h1 className="module-title">Configuración y Reglas</h1><p className="module-subtitle">Motor de reglas de negocio y configuración general</p></div></div><div className="content-placeholder"><h3>Módulo de Configuración</h3><p>Gestión de contratos, taxonomías de categorías, reglas de negocio y configuración general de la plataforma.</p></div></div>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
