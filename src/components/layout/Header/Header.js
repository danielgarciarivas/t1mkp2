import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span>Ⓜ</span>
            <span>T1MKP</span>
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
              <button>Perfil</button>
              <button>Configuración</button>
              <button>Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;