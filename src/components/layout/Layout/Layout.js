import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './Layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Cerrar sidebar automáticamente en desktop
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <Header onToggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="layout-content">
        <Sidebar 
          isOpen={sidebarOpen} 
          isMobile={isMobile}
          onClose={closeSidebar}
        />
        <main className={`main-content ${sidebarOpen && isMobile ? 'sidebar-open' : ''}`}>
          <Outlet />
        </main>
      </div>
      
      {/* Overlay para móvil */}
      {sidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default Layout;