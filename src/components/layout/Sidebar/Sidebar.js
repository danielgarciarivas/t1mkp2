import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { id: 'sellers', icon: '🏪', label: 'Tiendas', path: '/sellers' },
  { id: 'productos', icon: '📦', label: 'Productos', path: '/productos' },
  { id: 'pedidos', icon: '📋', label: 'Pedidos', path: '/pedidos' },
  { id: 'pagos', icon: '💳', label: 'Pagos y Liquidaciones', path: '/pagos' },
  { id: 'configuracion', icon: '⚙️', label: 'Configuración y Reglas', path: '/configuracion' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.path)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;