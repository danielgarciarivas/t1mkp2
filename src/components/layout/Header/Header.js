import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import './Header.css';

const Header = ({ onToggleSidebar, isMobile }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {isMobile && (
            <button 
              className="hamburger-button"
              onClick={onToggleSidebar}
              aria-label="Abrir menú"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}
          <div className="logo-container">
            <div className="logo-icon">T1</div>
            <span className="logo-text">MARKETPLACE</span>
          </div>
        </div>
        
        <div className="user-info">
          <div className="user-details">
            <div className="user-name">{user?.name || user?.email || 'Usuario'}</div>
            <div className="user-role">{user?.role || 'Usuario'}</div>
          </div>
          <div 
            className="user-avatar"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            👤
          </div>
          {userMenuOpen && (
            <div className="user-menu">
              <button onClick={() => navigate('/perfil')}>Perfil</button>
              <button onClick={() => navigate('/roles-permisos')}>Roles y Permisos</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;