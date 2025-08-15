import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelNote, setCancelNote] = useState('');

  useEffect(() => {
    loadOrderDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Generar cronograma realista basado en el estado del pedido
  const generateTimelineByStatus = (estado, fechaPedido, numeroOrden) => {
    const baseDate = new Date(fechaPedido);
    const timeline = [];
    
    // Estados en orden cronológico
    const estados = ['recibido', 'validado', 'enviado_seller', 'confirmado', 'en_proceso_envio', 'en_camino', 'entregado'];
    const currentStateIndex = estados.indexOf(estado);
    
    // Generar actualizaciones para estados completados
    estados.slice(0, currentStateIndex + 1).forEach((status, index) => {
      const fecha = new Date(baseDate.getTime() + (index * 24 * 60 * 60 * 1000)); // Agregar días
      
      switch (status) {
        case 'recibido':
          timeline.push({
            fecha: fecha.toISOString(),
            estado: 'Pedido recibido',
            descripcion: 'El pedido ha sido recibido y está siendo procesado',
            ubicacion: 'Centro de distribución CDMX'
          });
          break;
        case 'validado':
          timeline.push({
            fecha: new Date(fecha.getTime() + 6 * 60 * 60 * 1000).toISOString(), // 6 horas después
            estado: 'Pedido validado',
            descripcion: 'El pedido ha sido validado y enviado al seller',
            ubicacion: 'Centro de distribución CDMX'
          });
          break;
        case 'enviado_seller':
          timeline.push({
            fecha: new Date(fecha.getTime() + 12 * 60 * 60 * 1000).toISOString(), // 12 horas después
            estado: 'Enviado al seller',
            descripcion: 'El pedido ha sido notificado al seller para su procesamiento',
            ubicacion: 'Sistema T1Marketplace'
          });
          break;
        case 'confirmado':
          timeline.push({
            fecha: new Date(fecha.getTime() + 18 * 60 * 60 * 1000).toISOString(), // 18 horas después
            estado: 'Confirmado por seller',
            descripcion: 'El seller ha confirmado el pedido y tiene el producto disponible',
            ubicacion: 'Almacén del seller'
          });
          break;
        case 'en_proceso_envio':
          timeline.push({
            fecha: new Date(fecha.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 día después
            estado: 'En proceso de envío',
            descripcion: 'El pedido está siendo preparado para envío',
            ubicacion: 'Almacén del seller'
          });
          break;
        case 'en_camino':
          timeline.push({
            fecha: new Date(fecha.getTime() + 36 * 60 * 60 * 1000).toISOString(), // 1.5 días después
            estado: 'En camino',
            descripcion: 'El paquete ha sido enviado y está en tránsito',
            ubicacion: 'Centro de distribución DHL'
          });
          break;
        case 'entregado':
          timeline.push({
            fecha: new Date(fecha.getTime() + 72 * 60 * 60 * 1000).toISOString(), // 3 días después
            estado: 'Entregado',
            descripcion: 'El paquete ha sido entregado exitosamente',
            ubicacion: 'Domicilio del cliente'
          });
          break;
      }
    });
    
    // Casos especiales para cancelado y devuelto
    if (estado === 'cancelado') {
      timeline.push({
        fecha: new Date(baseDate.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        estado: 'Cancelado',
        descripcion: 'El pedido ha sido cancelado',
        ubicacion: 'Sistema'
      });
    }
    
    if (estado === 'devuelto') {
      // Para devuelto, primero debe haber sido entregado
      timeline.push({
        fecha: new Date(baseDate.getTime() + 72 * 60 * 60 * 1000).toISOString(),
        estado: 'Entregado',
        descripcion: 'El paquete ha sido entregado exitosamente',
        ubicacion: 'Domicilio del cliente'
      });
      timeline.push({
        fecha: new Date(baseDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días después
        estado: 'Devolución solicitada',
        descripcion: 'El cliente ha solicitado la devolución del producto',
        ubicacion: 'Portal del cliente'
      });
      timeline.push({
        fecha: new Date(baseDate.getTime() + 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 días después
        estado: 'Devolución aprobada',
        descripcion: 'La devolución ha sido aprobada por el seller',
        ubicacion: 'Sistema del seller'
      });
      timeline.push({
        fecha: new Date(baseDate.getTime() + 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 días después
        estado: 'Devuelto',
        descripcion: 'El producto ha sido devuelto y el reembolso está siendo procesado',
        ubicacion: 'Centro de devoluciones'
      });
    }
    
    return timeline;
  };

  const loadOrderDetail = async () => {
    setLoading(true);
    // Simular carga de datos del pedido
    setTimeout(() => {
      // Datos base para generar pedidos dinámicamente
      const ordersConfig = {
        1: { estado: 'recibido', fecha: '2024-02-10T14:30:00Z', cliente: 'Ana García Martínez', email: 'ana.garcia@email.com', seller: 'TechStore Pro', producto: 'iPhone 15 Pro Max 256GB', precio: 24999 },
        2: { estado: 'validado', fecha: '2024-02-08T10:15:00Z', cliente: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.com', seller: 'HomeStyle México', producto: 'Sofá Modular 3 Piezas', precio: 15999 },
        3: { estado: 'entregado', fecha: '2024-02-01T09:20:00Z', cliente: 'María López', email: 'maria.lopez@email.com', seller: 'FashionHub', producto: 'Vestido Casual Verano', precio: 1299 },
        4: { estado: 'cancelado', fecha: '2024-02-09T13:45:00Z', cliente: 'Roberto Sánchez', email: 'roberto.sanchez@email.com', seller: 'Sports World', producto: 'Tenis Running Professional', precio: 2499 },
        5: { estado: 'devuelto', fecha: '2024-01-25T11:30:00Z', cliente: 'Patricia Hernández', email: 'patricia.hernandez@email.com', seller: 'Beauty Corner', producto: 'Serum Facial Anti-Edad', precio: 899 },
        6: { estado: 'en_camino', fecha: '2024-02-04T11:20:00Z', cliente: 'Roberto Vázquez', email: 'roberto.vazquez@email.com', seller: 'TechStore Pro', producto: 'Auriculares Bluetooth', precio: 5499 }
      };
      
      const config = ordersConfig[parseInt(id)];
      if (!config) {
        setOrder(null);
        setLoading(false);
        return;
      }

      const timeline = generateTimelineByStatus(config.estado, config.fecha, `ORD-2024-00125${id}`);
      
      const mockOrder = {
        id: parseInt(id),
        numeroOrden: `ORD-2024-00125${id}`,
        estado: config.estado,
        fecha: config.fecha,
        fechaEntregaEstimada: new Date(new Date(config.fecha).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        total: config.precio + 299,
        subtotal: config.precio,
        envio: 299,
        impuestos: 0,
        cliente: {
          nombre: config.cliente,
          email: config.email,
          telefono: '+52 55 1234 5678',
          direccion: {
            calle: 'Av. Insurgentes Sur 1234',
            colonia: 'Del Valle Centro',
            ciudad: 'Ciudad de México',
            estado: 'CDMX',
            codigoPostal: '03100',
            pais: 'México'
          }
        },
        seller: config.seller,
        productos: [{
          id: parseInt(id),
          nombre: config.producto,
          sku: `SKU-${id}${Math.floor(Math.random() * 1000)}`,
          precio: config.precio,
          cantidad: 1,
          imagen: 'https://via.placeholder.com/300x300/8B4513/fff?text=Producto'
        }],
        tracking: {
          numeroGuia: (config.estado === 'en_camino' || config.estado === 'entregado' || config.estado === 'devuelto') ? `TRK${id}78901234` : '',
          paqueteria: (config.estado === 'en_camino' || config.estado === 'entregado' || config.estado === 'devuelto') ? 'DHL Express' : '',
          actualizaciones: timeline
        },
        metricasCancelacion: config.estado === 'cancelado' ? {
          canceladoPor: 'operador',
          motivo: cancelReason || 'Sin existencias',
          indicadores: { porSeller: 12, porMarketplace: 5, porCliente: 23, porReglasNegocio: 3 }
        } : null,
        motivoDevolucion: config.estado === 'devuelto' ? {
          motivo: 'Producto defectuoso',
          descripcion: 'El producto llegó con el empaque dañado',
          solicitudPor: 'cliente',
          fechaSolicitud: new Date(new Date(config.fecha).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          estadoSeller: 'aprobada',
          fechaAprobacion: new Date(new Date(config.fecha).getTime() + 9 * 24 * 60 * 60 * 1000).toISOString(),
          subEstatus: 'reembolso_procesando',
          montoReembolso: config.precio + 299,
          estadoReembolso: 'procesando'
        } : null
      };

      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
  };

  const handleCancelOrder = () => {
    if (!cancelReason) {
      alert('Por favor selecciona un motivo de cancelación');
      return;
    }
    
    setOrder(prev => ({
      ...prev,
      estado: 'cancelado',
      fechaCancelacion: new Date().toISOString(),
      metricasCancelacion: {
        canceladoPor: 'operador',
        motivo: cancelReason,
        nota: cancelNote,
        indicadores: { porSeller: 12, porMarketplace: 5, porCliente: 23, porReglasNegocio: 3 }
      },
      tracking: {
        ...prev.tracking,
        actualizaciones: [
          ...prev.tracking.actualizaciones,
          {
            fecha: new Date().toISOString(),
            estado: 'Cancelado',
            descripcion: `Pedido cancelado por operador. Motivo: ${cancelReason}`,
            ubicacion: 'Sistema T1Marketplace'
          }
        ]
      }
    }));
    
    setShowCancelModal(false);
    setCancelReason('');
    setCancelNote('');
  };

  const handleOrderAction = (action) => {
    console.log(`Acción: ${action} para pedido ${id}`);
    
    switch (action) {
      case 'validate':
        setOrder(prev => ({
          ...prev,
          estado: 'validado',
          tracking: {
            ...prev.tracking,
            actualizaciones: [
              ...prev.tracking.actualizaciones,
              {
                fecha: new Date().toISOString(),
                estado: 'Pedido validado',
                descripcion: 'El pedido ha sido validado y enviado al seller',
                ubicacion: 'Centro de distribución CDMX'
              }
            ]
          }
        }));
        break;
      case 'cancel':
        setShowCancelModal(true);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'recibido': { text: 'Recibido', class: 'status-received' },
      'validado': { text: 'Validado', class: 'status-validated' },
      'enviado_seller': { text: 'Enviado al Seller', class: 'status-sent-seller' },
      'confirmado': { text: 'Confirmado', class: 'status-confirmed' },
      'en_proceso_envio': { text: 'En Proceso de Envío', class: 'status-shipping' },
      'en_camino': { text: 'En Camino', class: 'status-transit' },
      'entregado': { text: 'Entregado', class: 'status-delivered' },
      'cancelado': { text: 'Cancelado', class: 'status-cancelled' },
      'devuelto': { text: 'Devuelto', class: 'status-returned' }
    };
    
    return badges[status] || badges['recibido'];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="module">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando detalles del pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="module">
        <div className="error-container">
          <h2>Pedido no encontrado</h2>
          <Button onClick={() => navigate('/pedidos')}>
            Volver a la lista
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusBadge(order.estado);

  return (
    <div className="module">
      <div className="module-header">
        <div className="module-title-section">
          <div className="order-header-info">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/pedidos')}
              className="back-button"
            >
              ← Volver
            </Button>
            <div className="order-title">
              <h1 className="module-title">Pedido {order.numeroOrden}</h1>
              <p className="module-subtitle">
                Cliente: {order.cliente.nombre} • Seller: {order.seller}
              </p>
            </div>
          </div>
        </div>

        {/* Acciones según estado */}
        <div className="order-actions">
          <span className={`status-badge ${statusInfo.class}`}>
            {statusInfo.text}
          </span>
          
          {order.estado === 'recibido' && (
            <>
              <Button 
                variant="success"
                onClick={() => handleOrderAction('validate')}
              >
                Validar Pedido
              </Button>
              <Button 
                variant="danger"
                onClick={() => handleOrderAction('cancel')}
              >
                Cancelar Pedido
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="order-detail-content">
        {/* Información principal del pedido */}
        <div className="order-main">
          {/* Resumen del pedido */}
          <div className="order-summary">
            <h3>Resumen del Pedido</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Número de Pedido:</span>
                <span className="summary-value">{order.numeroOrden}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Fecha del Pedido:</span>
                <span className="summary-value">{formatDate(order.fecha)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Estado:</span>
                <span className={`status-badge ${statusInfo.class}`}>
                  {statusInfo.text}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Seller:</span>
                <span className="summary-value">{order.seller}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total:</span>
                <span className="summary-value price">{formatPrice(order.total)}</span>
              </div>
              {order.fechaEntregaEstimada && (
                <div className="summary-item">
                  <span className="summary-label">Entrega Estimada:</span>
                  <span className="summary-value">{formatDate(order.fechaEntregaEstimada)}</span>
                </div>
              )}
              {order.fechaEntregaReal && (
                <div className="summary-item">
                  <span className="summary-label">Fecha de Entrega:</span>
                  <span className="summary-value">{formatDate(order.fechaEntregaReal)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Información del cliente */}
          <div className="customer-section">
            <h3>Información del Cliente</h3>
            <div className="customer-details">
              <div className="customer-contact">
                <h4>Datos de Contacto</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-label">Nombre:</span>
                    <span className="contact-value">{order.cliente.nombre}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Email:</span>
                    <span className="contact-value">{order.cliente.email}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Teléfono:</span>
                    <span className="contact-value">{order.cliente.telefono}</span>
                  </div>
                </div>
              </div>
              
              <div className="shipping-address">
                <h4>Dirección de Envío</h4>
                <div className="address-info">
                  <p>{order.cliente.direccion.calle}</p>
                  <p>{order.cliente.direccion.colonia}</p>
                  <p>{order.cliente.direccion.ciudad}, {order.cliente.direccion.estado}</p>
                  <p>C.P. {order.cliente.direccion.codigoPostal}</p>
                  <p>{order.cliente.direccion.pais}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos del pedido */}
        <div className="order-products">
          <h3>Productos del Pedido</h3>
          <div className="products-list">
            {order.productos.map((producto) => (
              <div key={producto.id} className="product-item">
                <div className="product-image">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="product-details">
                  <h4>{producto.nombre}</h4>
                  <p className="product-sku">SKU: {producto.sku}</p>
                  <div className="product-quantity">Cantidad: {producto.cantidad}</div>
                </div>
                <div className="product-price">
                  {formatPrice(producto.precio)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen de precios */}
          <div className="price-breakdown">
            <div className="price-item">
              <span>Subtotal:</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="price-item">
              <span>Envío:</span>
              <span>{formatPrice(order.envio)}</span>
            </div>
            {order.impuestos > 0 && (
              <div className="price-item">
                <span>Impuestos:</span>
                <span>{formatPrice(order.impuestos)}</span>
              </div>
            )}
            <div className="price-item total">
              <span>Total:</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Seguimiento del pedido */}
        <div className="order-tracking">
          <h3>Seguimiento del Pedido</h3>
          {order.tracking.numeroGuia && (
            <div className="tracking-info">
              <div className="tracking-item">
                <span className="tracking-label">Número de Guía:</span>
                <span className="tracking-value">{order.tracking.numeroGuia}</span>
              </div>
              <div className="tracking-item">
                <span className="tracking-label">Paquetería:</span>
                <span className="tracking-value">{order.tracking.paqueteria}</span>
              </div>
            </div>
          )}
          
          <div className="tracking-timeline">
            {order.tracking.actualizaciones.map((actualizacion, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{actualizacion.estado}</h4>
                    <span className="timeline-date">{formatDate(actualizacion.fecha)}</span>
                  </div>
                  <p className="timeline-description">{actualizacion.descripcion}</p>
                  <span className="timeline-location">{actualizacion.ubicacion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información especial para cancelaciones */}
        {order.estado === 'cancelado' && order.metricasCancelacion && (
          <div className="cancellation-info">
            <h3>Información de Cancelación</h3>
            <div className="cancellation-details">
              <div className="cancellation-item">
                <span className="cancellation-label">Cancelado por:</span>
                <span className="cancellation-value">{order.metricasCancelacion.canceladoPor}</span>
              </div>
              <div className="cancellation-item">
                <span className="cancellation-label">Motivo:</span>
                <span className="cancellation-value">{order.metricasCancelacion.motivo}</span>
              </div>
              <div className="cancellation-item">
                <span className="cancellation-label">Fecha de cancelación:</span>
                <span className="cancellation-value">{formatDate(order.fechaCancelacion)}</span>
              </div>
            </div>
            
            <div className="cancellation-metrics">
              <h4>Indicadores de Cancelaciones</h4>
              <div className="metrics-grid">
                <div className="metric-item">
                  <span className="metric-label">Por Seller:</span>
                  <span className="metric-value">{order.metricasCancelacion.indicadores.porSeller}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Por Marketplace:</span>
                  <span className="metric-value">{order.metricasCancelacion.indicadores.porMarketplace}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Por Cliente:</span>
                  <span className="metric-value">{order.metricasCancelacion.indicadores.porCliente}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-label">Por Reglas de Negocio:</span>
                  <span className="metric-value">{order.metricasCancelacion.indicadores.porReglasNegocio}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Información especial para devoluciones */}
        {order.estado === 'devuelto' && order.motivoDevolucion && (
          <div className="return-info">
            <h3>Información de Devolución</h3>
            <div className="return-details">
              <div className="return-item">
                <span className="return-label">Motivo:</span>
                <span className="return-value">{order.motivoDevolucion.motivo}</span>
              </div>
              <div className="return-item">
                <span className="return-label">Descripción:</span>
                <span className="return-value">{order.motivoDevolucion.descripcion}</span>
              </div>
              <div className="return-item">
                <span className="return-label">Solicitado por:</span>
                <span className="return-value">{order.motivoDevolucion.solicitudPor}</span>
              </div>
              <div className="return-item">
                <span className="return-label">Fecha de solicitud:</span>
                <span className="return-value">{formatDate(order.motivoDevolucion.fechaSolicitud)}</span>
              </div>
              <div className="return-item">
                <span className="return-label">Estado del seller:</span>
                <span className={`return-status ${order.motivoDevolucion.estadoSeller}`}>
                  {order.motivoDevolucion.estadoSeller}
                </span>
              </div>
              {order.motivoDevolucion.fechaAprobacion && (
                <div className="return-item">
                  <span className="return-label">Fecha de aprobación:</span>
                  <span className="return-value">{formatDate(order.motivoDevolucion.fechaAprobacion)}</span>
                </div>
              )}
              <div className="return-item">
                <span className="return-label">Sub-estado:</span>
                <span className={`return-substatus ${order.motivoDevolucion.subEstatus}`}>
                  {order.motivoDevolucion.subEstatus.replace('_', ' ')}
                </span>
              </div>
              {order.motivoDevolucion.montoReembolso && (
                <div className="return-item">
                  <span className="return-label">Monto de reembolso:</span>
                  <span className="return-value price">{formatPrice(order.motivoDevolucion.montoReembolso)}</span>
                </div>
              )}
              <div className="return-item">
                <span className="return-label">Estado del reembolso:</span>
                <span className={`return-refund ${order.motivoDevolucion.estadoReembolso}`}>
                  {order.motivoDevolucion.estadoReembolso}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de cancelación */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Cancelar Pedido</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCancelModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="cancelReason">Motivo de cancelación *</label>
                <select
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="form-select"
                >
                  <option value="">Selecciona un motivo</option>
                  <option value="producto_dañado">Producto dañado</option>
                  <option value="sin_existencias">Sin existencias</option>
                  <option value="solicitud_cliente">A solicitud del cliente</option>
                  <option value="en_aclaracion">En aclaración</option>
                  <option value="falta_pago">Por falta de pago</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="cancelNote">Nota adicional (opcional)</label>
                <textarea
                  id="cancelNote"
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                  className="form-textarea"
                  placeholder="Agrega información adicional sobre la cancelación..."
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <Button 
                variant="ghost"
                onClick={() => setShowCancelModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                variant="danger"
                onClick={handleCancelOrder}
              >
                Confirmar Cancelación
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;