import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { 
    id: 'sellers', 
    icon: '🏪', 
    label: 'Tiendas', 
    hasSubmenu: true,
    submenu: [
      { id: 'sellers-pending', label: 'Por Autorizar', path: '/sellers/pending' },
      { id: 'sellers-all', label: 'Todas las Tiendas', path: '/sellers' }
    ]
  },
  { 
    id: 'productos', 
    icon: '📦', 
    label: 'Productos', 
    hasSubmenu: true,
    submenu: [
      { id: 'productos-pending', label: 'Por Autorizar', path: '/productos/pending' },
      { id: 'productos-all', label: 'Todos los Productos', path: '/productos' }
    ]
  },
  { id: 'pedidos', icon: '📋', label: 'Pedidos', path: '/pedidos' },
  { id: 'pagos', icon: '💳', label: 'Liquidaciones', path: '/pagos' },
  { 
    id: 'configuracion', 
    icon: '⚙️', 
    label: 'Configuración', 
    hasSubmenu: true,
    submenu: [
      { id: 'contratos', label: 'Gestión de Contratos', path: '/configuracion/contratos' },
      { id: 'categorias', label: 'Categorías', path: '/configuracion/categorias' },
      { id: 'reglas', label: 'Motor de Reglas', path: '/configuracion/reglas' },
      { id: 'comisiones', label: 'Configuración de Comisiones', path: '/configuracion/comisiones' },
      { id: 'facturacion', label: 'Facturación', path: '/configuracion/facturacion' }
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auto-expand menús basado en la ruta actual
  const getInitialExpandedMenus = () => {
    const expanded = {};
    menuItems.forEach(item => {
      if (item.hasSubmenu) {
        const isMenuActive = item.submenu.some(sub => location.pathname === sub.path);
        if (isMenuActive) {
          expanded[item.id] = true;
        }
      }
    });
    return expanded;
  };
  
  const [expandedMenus, setExpandedMenus] = useState(getInitialExpandedMenus);

  // Actualizar menús expandidos cuando cambie la ruta
  useEffect(() => {
    const newExpanded = getInitialExpandedMenus();
    setExpandedMenus(prev => ({ ...prev, ...newExpanded }));
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [item.id]: !prev[item.id]
      }));
    } else {
      navigate(item.path);
    }
  };

  const handleSubmenuClick = (path) => {
    navigate(path);
  };

  const isMenuActive = (item) => {
    if (item.hasSubmenu) {
      return item.submenu.some(sub => location.pathname === sub.path);
    }
    return location.pathname === item.path;
  };

  const isSubmenuActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-group">
            <button
              className={`menu-item ${isMenuActive(item) ? 'active' : ''} ${item.hasSubmenu ? 'has-submenu' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-item-content">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <span className={`submenu-arrow ${expandedMenus[item.id] ? 'expanded' : ''}`}>
                  ▼
                </span>
              )}
            </button>
            
            {item.hasSubmenu && expandedMenus[item.id] && (
              <div className="submenu">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    className={`submenu-item ${isSubmenuActive(subItem.path) ? 'active' : ''}`}
                    onClick={() => handleSubmenuClick(subItem.path)}
                  >
                    <span className="submenu-label">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;