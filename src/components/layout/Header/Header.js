import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onToggleSidebar, isMobile }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

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
            <div className="user-name">Sears Operadora</div>
            <div className="user-role">Administrador</div>
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
              <button>Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;