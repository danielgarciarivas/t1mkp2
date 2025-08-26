import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Configuracion.css';

const Configuracion = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'contratos',
      title: 'Gestión de Contratos',
      description: 'Administración de acuerdos legales y comerciales con interfaz visual',
      icon: '📄',
      path: '/configuracion/contratos',
      features: [
        'Editor visual de contratos',
        'Templates predefinidos',
        'Customización avanzada',
        'Preview del seller',
        'Firma electrónica',
        'Control de versiones'
      ]
    },
    {
      id: 'categorias',
      title: 'Árbol de Categorías',
      description: 'Configuración del árbol de categorías del marketplace',
      icon: '🌳',
      path: '/configuracion/categorias',
      features: [
        'Carga de taxonomía vía CSV',
        'Mapeo con taxonomía universal',
        'Asignación de comisiones por categoría',
        'Gestión visual',
        'Validaciones de coherencia'
      ]
    },
    {
      id: 'reglas',
      title: 'Motor de Reglas de Negocio',
      description: 'Sistema configurable para establecer políticas por marketplace',
      icon: '⚖️',
      path: '/configuracion/reglas',
      features: [
        'Reglas de productos',
        'Políticas de precios',
        'Reglas de inventario',
        'Criterios de sellers',
        'Políticas de fulfillment'
      ]
    },
    {
      id: 'comisiones',
      title: 'Configuración de Comisiones',
      description: 'Gestión centralizada de estructura de comisiones',
      icon: '💰',
      path: '/configuracion/comisiones',
      features: [
        'Comisiones por categoría',
        'Comisiones por seller',
        'Simulador de comisiones',
        'Historial de cambios',
        'Aplicación de cambios automática'
      ]
    },
    {
      id: 'facturacion',
      title: 'Facturación SAT',
      description: 'Configuración del servicio de facturación electrónica (SAT)',
      icon: '🧾',
      path: '/configuracion/facturacion',
      features: [
        'Activación del servicio',
        'Configuración de PAC',
        'Gestión de certificados',
        'Configuración fiscal',
        'Proceso automático'
      ]
    },
    {
      id: 'score-tiendas',
      title: 'Score de Tiendas',
      description: 'Configuración del sistema de puntuación y reputación de sellers',
      icon: '⭐',
      path: '/configuracion/score-tiendas',
      features: [
        'Configuración de métricas de evaluación',
        'Umbrales de score por nivel',
        'Ponderación de factores (entregas, cancelaciones, reclamos)',
        'Políticas automáticas por score',
        'Sistema de termómetro de 5 colores',
        'Configuración de alertas y notificaciones'
      ]
    }
  ];

  const handleModuleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Configuración y Reglas</h1>
          <p className="module-subtitle">
            Motor de reglas de negocio y configuración general de la plataforma
          </p>
        </div>
      </div>

      <div className="config-modules-grid">
        {modules.map((module) => (
          <div 
            key={module.id} 
            className="config-module-card"
            onClick={() => handleModuleClick(module.path)}
          >
            <div className="module-card-header">
              <div className="module-icon">{module.icon}</div>
              <div className="module-card-title">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </div>
            
            <div className="module-features">
              <h4>Características principales:</h4>
              <ul>
                {module.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="module-card-footer">
              <button className="access-button">
                Acceder al Módulo →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Configuracion;