import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import './RolesPermisos.css';

// Definición de los 6 roles fijos del sistema
const SYSTEM_ROLES = [
  {
    id: 'admin_principal',
    name: 'Admin Principal',
    description: 'Acceso completo a todas las funciones',
    icon: '👑',
    color: '#db3b2b',
    modules: ['Dashboard', 'Sellers', 'Productos', 'Categorías', 'Pedidos', 'Comisiones', 'Pagos', 'Reglas', 'Roles y Permisos', 'Configuración']
  },
  {
    id: 'finanzas',
    name: 'Finanzas',
    description: 'Gestión de pagos y liquidaciones',
    icon: '💰',
    color: '#28a745',
    modules: ['Dashboard', 'Pagos', 'Comisiones', 'Sellers (fiscal)']
  },
  {
    id: 'contenido',
    name: 'Contenido',
    description: 'Aprobación y curaduría de productos',
    icon: '📝',
    color: '#17a2b8',
    modules: ['Dashboard', 'Productos', 'Categorías', 'Reglas']
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Gestión de contratos y compliance',
    icon: '⚖️',
    color: '#6f42c1',
    modules: ['Dashboard', 'Sellers (legal)', 'Productos (compliance)', 'Contratos']
  },
  {
    id: 'operaciones',
    name: 'Operaciones',
    description: 'Gestión de pedidos y sellers',
    icon: '📊',
    color: '#fd7e14',
    modules: ['Dashboard', 'Sellers', 'Pedidos', 'SLA']
  },
  {
    id: 'solo_lectura',
    name: 'Solo Lectura',
    description: 'Acceso de consulta únicamente',
    icon: '👁️',
    color: '#6c757d',
    modules: ['Dashboard (solo vista)']
  }
];

// Matriz completa de permisos basada en el PDF
const PERMISSIONS_MATRIX = {
  admin_principal: {
    dashboard: ['ver_metricas', 'configurar_reportes'],
    sellers: ['ver_listado', 'aprobar_rechazar', 'ver_contratos', 'editar_info', 'suspender'],
    productos: ['ver_listado', 'aprobar_rechazar', 'editar_info', 'gestionar_categorias', 'configurar_reglas'],
    categorias: ['ver_listado', 'activar_desactivar', 'configurar_comisiones', 'mapear_taxonomias', 'crear_editar'],
    pedidos: ['ver_listado', 'ver_detalles', 'gestionar_cancelaciones', 'gestionar_devoluciones', 'configurar_sla'],
    comisiones: ['ver_configuracion', 'crear_editar_reglas', 'usar_simulador', 'ver_historial', 'aplicar_cambios'],
    pagos: ['ver_dashboard', 'configurar_cuenta', 'procesar_liquidaciones', 'ver_reportes', 'configurar_retenciones'],
    reglas: ['ver_reglas', 'configurar_productos', 'configurar_sellers', 'configurar_precios', 'activar_desactivar'],
    roles_permisos: ['ver_roles', 'crear_editar_roles', 'asignar_permisos', 'gestionar_usuarios', 'ver_logs'],
    configuracion: ['ver_config', 'gestionar_contratos', 'configurar_api', 'subir_documentos', 'configurar_politicas']
  },
  finanzas: {
    dashboard: ['ver_metricas', 'configurar_reportes_financieros'],
    sellers: ['ver_listado', 'aprobar_rechazar_fiscal', 'ver_contratos'],
    productos: ['ver_listado'],
    categorias: ['ver_listado', 'configurar_comisiones'],
    pedidos: ['ver_listado', 'ver_detalles', 'gestionar_devoluciones_financiero'],
    comisiones: ['ver_configuracion', 'crear_editar_reglas', 'usar_simulador', 'ver_historial', 'aplicar_cambios'],
    pagos: ['ver_dashboard', 'configurar_cuenta', 'procesar_liquidaciones', 'ver_reportes', 'configurar_retenciones'],
    reglas: ['ver_reglas', 'configurar_sellers_fiscal', 'configurar_precios'],
    configuracion: ['ver_config_financiera', 'subir_docs_financieros']
  },
  contenido: {
    dashboard: ['ver_metricas'],
    sellers: ['ver_listado'],
    productos: ['ver_listado', 'aprobar_rechazar', 'editar_info', 'gestionar_categorias', 'configurar_reglas'],
    categorias: ['ver_listado', 'activar_desactivar', 'mapear_taxonomias', 'crear_editar'],
    pedidos: ['ver_listado', 'ver_detalles'],
    reglas: ['ver_reglas', 'configurar_productos', 'activar_desactivar_contenido'],
    configuracion: ['ver_config_contenido', 'subir_material_contenido', 'configurar_politicas_contenido']
  },
  legal: {
    dashboard: ['ver_metricas'],
    sellers: ['ver_listado', 'aprobar_rechazar_legal', 'ver_contratos', 'editar_info_legal', 'suspender'],
    productos: ['ver_listado', 'aprobar_rechazar_compliance', 'configurar_reglas_legales'],
    categorias: ['ver_listado'],
    pedidos: ['ver_listado', 'ver_detalles', 'gestionar_cancelaciones_legal', 'gestionar_devoluciones_politicas'],
    comisiones: ['ver_configuracion', 'usar_simulador', 'ver_historial'],
    pagos: ['ver_dashboard', 'ver_reportes'],
    reglas: ['ver_reglas', 'configurar_productos_compliance', 'configurar_sellers_legal', 'activar_desactivar_legal'],
    roles_permisos: ['ver_roles', 'ver_logs'],
    configuracion: ['ver_config', 'gestionar_contratos', 'subir_docs_legales', 'configurar_politicas']
  },
  operaciones: {
    dashboard: ['ver_metricas', 'configurar_reportes_operativos'],
    sellers: ['ver_listado', 'aprobar_rechazar', 'ver_contratos', 'editar_info_operativo', 'suspender'],
    productos: ['ver_listado'],
    categorias: ['ver_listado'],
    pedidos: ['ver_listado', 'ver_detalles', 'gestionar_cancelaciones', 'gestionar_devoluciones', 'configurar_sla'],
    comisiones: ['ver_configuracion', 'usar_simulador', 'ver_historial'],
    pagos: ['ver_dashboard', 'ver_reportes'],
    reglas: ['ver_reglas', 'configurar_sellers_performance'],
    configuracion: ['ver_config_operativa', 'configurar_api_consulta']
  },
  solo_lectura: {
    dashboard: ['ver_metricas'],
    sellers: ['ver_listado'],
    productos: ['ver_listado'],
    categorias: ['ver_listado'],
    pedidos: ['ver_listado']
  }
};

const RolesPermisos = () => {
  const [activeView, setActiveView] = useState('roles'); // 'roles', 'users', 'role-detail'
  const [selectedRole, setSelectedRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    status: 'activo'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    // Simular carga de usuarios
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: 'María González',
          email: 'maria.gonzalez@t1marketplace.com',
          role: 'admin_principal',
          status: 'activo',
          lastLogin: '2024-08-16T10:30:00Z',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'Carlos Fernández',
          email: 'carlos.fernandez@t1marketplace.com',
          role: 'finanzas',
          status: 'activo',
          lastLogin: '2024-08-15T16:45:00Z',
          createdAt: '2024-02-01T09:00:00Z'
        },
        {
          id: 3,
          name: 'Ana Ruiz',
          email: 'ana.ruiz@t1marketplace.com',
          role: 'contenido',
          status: 'activo',
          lastLogin: '2024-08-16T08:15:00Z',
          createdAt: '2024-02-10T14:30:00Z'
        },
        {
          id: 4,
          name: 'Roberto López',
          email: 'roberto.lopez@t1marketplace.com',
          role: 'legal',
          status: 'activo',
          lastLogin: '2024-08-14T11:20:00Z',
          createdAt: '2024-03-01T16:00:00Z'
        },
        {
          id: 5,
          name: 'Elena Martínez',
          email: 'elena.martinez@t1marketplace.com',
          role: 'operaciones',
          status: 'activo',
          lastLogin: '2024-08-16T07:45:00Z',
          createdAt: '2024-03-15T11:30:00Z'
        },
        {
          id: 6,
          name: 'Pedro Sánchez',
          email: 'pedro.sanchez@t1marketplace.com',
          role: 'solo_lectura',
          status: 'inactivo',
          lastLogin: '2024-08-10T14:30:00Z',
          createdAt: '2024-04-01T10:00:00Z'
        }
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 800);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    if (userForm.id) {
      // Editar usuario existente
      setUsers(prev => prev.map(user => 
        user.id === userForm.id 
          ? { ...user, ...userForm, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // Crear nuevo usuario
      const newUser = {
        ...userForm,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        lastLogin: null
      };
      setUsers(prev => [...prev, newUser]);
    }
    
    setShowUserModal(false);
    setUserForm({ id: null, name: '', email: '', role: '', status: 'activo' });
  };

  const handleEditUser = (user) => {
    setUserForm(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const getRoleInfo = (roleId) => {
    return SYSTEM_ROLES.find(role => role.id === roleId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPermissionsList = (roleId, module) => {
    const permissions = PERMISSIONS_MATRIX[roleId]?.[module] || [];
    return permissions;
  };

  const renderRoleDetail = () => {
    if (!selectedRole) return null;

    const role = SYSTEM_ROLES.find(r => r.id === selectedRole);
    const rolePermissions = PERMISSIONS_MATRIX[selectedRole];

    return (
      <div className="role-detail">
        <div className="role-detail-header">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('roles')}
            className="back-button"
          >
            ← Volver a Roles
          </Button>
          <div className="role-title">
            <span className="role-icon" style={{ color: role.color }}>{role.icon}</span>
            <div>
              <h2>{role.name}</h2>
              <p>{role.description}</p>
            </div>
          </div>
        </div>

        <div className="permissions-matrix">
          <h3>Detalle de Permisos por Módulo</h3>
          
          {Object.keys(rolePermissions).map(module => {
            const permissions = rolePermissions[module];
            const moduleDisplayNames = {
              dashboard: 'Dashboard',
              sellers: 'Gestión de Sellers',
              productos: 'Gestión de Productos',
              categorias: 'Categorías',
              pedidos: 'Pedidos',
              comisiones: 'Comisiones',
              pagos: 'Gestión Financiera',
              reglas: 'Reglas de Negocio',
              roles_permisos: 'Roles y Permisos',
              configuracion: 'Configuración'
            };

            return (
              <div key={module} className="module-permissions">
                <h4>{moduleDisplayNames[module]}</h4>
                <div className="permissions-list">
                  {permissions.map(permission => (
                    <span key={permission} className="permission-tag">
                      ✅ {permission.replace(/_/g, ' ').charAt(0).toUpperCase() + permission.replace(/_/g, ' ').slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderRolesList = () => (
    <div className="roles-list">
      <div className="roles-header">
        <div>
          <h2>Roles Configurados</h2>
          <p>Configure roles de usuario y permisos específicos</p>
        </div>
      </div>

      <div className="roles-grid">
        {SYSTEM_ROLES.map(role => {
          const userCount = users.filter(user => user.role === role.id).length;
          
          return (
            <div key={role.id} className="role-card">
              <div className="role-card-header">
                <span className="role-icon" style={{ color: role.color }}>
                  {role.icon}
                </span>
                <div className="role-info">
                  <h3>{role.name}</h3>
                  <p>{role.description}</p>
                </div>
              </div>
              
              <div className="role-modules">
                {role.modules.slice(0, 3).map(module => (
                  <span key={module} className="module-tag">
                    {module}
                  </span>
                ))}
                {role.modules.length > 3 && (
                  <span className="module-tag more">
                    +{role.modules.length - 3} más
                  </span>
                )}
              </div>
              
              <div className="role-card-footer">
                <div className="user-count">
                  <span>{userCount} usuario{userCount !== 1 ? 's' : ''}</span>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    setSelectedRole(role.id);
                    setActiveView('role-detail');
                  }}
                >
                  Ver Permisos
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderUsersList = () => (
    <div className="users-list">
      <div className="users-header">
        <div>
          <h2>Gestión de Usuarios</h2>
          <p>Administre usuarios y sus roles asignados</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setUserForm({ id: null, name: '', email: '', role: '', status: 'activo' });
            setShowUserModal(true);
          }}
        >
          Agregar Usuario
        </Button>
      </div>

      <div className="users-table-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando usuarios...</p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Último acceso</th>
                <th>Fecha creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                const roleInfo = getRoleInfo(user.role);
                return (
                  <tr key={user.id} className={user.status === 'inactivo' ? 'user-inactive' : ''}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-badge" style={{ borderColor: roleInfo?.color }}>
                        <span className="role-icon">{roleInfo?.icon}</span>
                        <span>{roleInfo?.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge status-${user.status}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="date-cell">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="date-cell">
                      {formatDate(user.createdAt)}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => handleEditUser(user)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => handleDeleteUser(user.id)}
                          className="delete-button"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <h1 className="module-title">Roles y Permisos</h1>
          <p className="module-subtitle">
            Configure roles de usuario y permisos específicos
          </p>
        </div>
      </div>

      {/* Navegación por tabs */}
      <div className="roles-tabs">
        <button 
          className={`tab-button ${activeView === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveView('roles')}
        >
          Roles del Sistema
        </button>
        <button 
          className={`tab-button ${activeView === 'users' ? 'active' : ''}`}
          onClick={() => setActiveView('users')}
        >
          Gestión de Usuarios
        </button>
      </div>

      {/* Contenido principal */}
      <div className="roles-content">
        {activeView === 'roles' && renderRolesList()}
        {activeView === 'users' && renderUsersList()}
        {activeView === 'role-detail' && renderRoleDetail()}
      </div>

      {/* Modal de usuario */}
      {showUserModal && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{userForm.id ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
              <button 
                className="close-button"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleUserSubmit} className="modal-body">
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Rol</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                  required
                >
                  <option value="">Seleccionar rol...</option>
                  {SYSTEM_ROLES.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.icon} {role.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Estado</label>
                <select
                  value={userForm.status}
                  onChange={(e) => setUserForm(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </form>
            
            <div className="modal-footer">
              <Button 
                variant="secondary"
                onClick={() => setShowUserModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="primary"
                onClick={handleUserSubmit}
              >
                {userForm.id ? 'Actualizar' : 'Crear'} Usuario
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermisos;