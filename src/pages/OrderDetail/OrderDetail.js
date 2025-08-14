import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrderDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadOrderDetail = async () => {
    setLoading(true);
    // Simular carga de datos del pedido
    setTimeout(() => {
      const mockOrders = {
        1: {
          id: 1,
          numeroOrden: 'ORD-2024-001256',
          estado: 'recibido',
          fecha: '2024-02-10T14:30:00Z',
          fechaEntregaEstimada: '2024-02-15T18:00:00Z',
          total: 27498,
          subtotal: 24999,
          envio: 299,
          impuestos: 2200,
          cliente: {
            nombre: 'Ana García Martínez',
            email: 'ana.garcia@email.com',
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
          seller: 'TechStore Pro',
          productos: [
            {
              id: 1,
              nombre: 'iPhone 15 Pro Max 256GB',
              sku: 'IPH15PM256',
              precio: 24999,
              cantidad: 1,
              imagen: 'https://resources.sears.com.mx/medios-plazavip/mkt/63d42f699b98a_12progrisjpg.jpg?scale=300&qlty=75'
            }
          ],
          tracking: {
            numeroGuia: '',
            paqueteria: '',
            actualizaciones: [
              {
                fecha: '2024-02-10T14:30:00Z',
                estado: 'Pedido recibido',
                descripcion: 'El pedido ha sido recibido y está siendo procesado',
                ubicacion: 'Centro de distribución CDMX'
              }
            ]
          },
          metricasCancelacion: null,
          motivoDevolucion: null
        },
        2: {
          id: 2,
          numeroOrden: 'ORD-2024-001257',
          estado: 'validado',
          fecha: '2024-02-08T10:15:00Z',
          fechaEntregaEstimada: '2024-02-13T18:00:00Z',
          total: 16298,
          subtotal: 15999,
          envio: 299,
          impuestos: 0,
          cliente: {
            nombre: 'Carlos Rodríguez',
            email: 'carlos.rodriguez@email.com',
            telefono: '+52 55 2345 6789',
            direccion: {
              calle: 'Calle Revolución 567',
              colonia: 'San Ángel',
              ciudad: 'Ciudad de México',
              estado: 'CDMX',
              codigoPostal: '01000',
              pais: 'México'
            }
          },
          seller: 'HomeStyle México',
          productos: [
            {
              id: 2,
              nombre: 'Sofá Modular 3 Piezas',
              sku: 'SOF3P001',
              precio: 15999,
              cantidad: 1,
              imagen: 'https://via.placeholder.com/300x300/8B4513/fff?text=Sofá+Modular'
            }
          ],
          tracking: {
            numeroGuia: '',
            paqueteria: '',
            actualizaciones: [
              {
                fecha: '2024-02-08T10:15:00Z',
                estado: 'Pedido recibido',
                descripcion: 'El pedido ha sido recibido y está siendo procesado',
                ubicacion: 'Centro de distribución CDMX'
              },
              {
                fecha: '2024-02-08T16:45:00Z',
                estado: 'Pedido validado',
                descripcion: 'El pedido ha sido validado y enviado al seller',
                ubicacion: 'Centro de distribución CDMX'
              }
            ]
          },
          metricasCancelacion: null,
          motivoDevolucion: null
        },
        3: {
          id: 3,
          numeroOrden: 'ORD-2024-001258',
          estado: 'entregado',
          fecha: '2024-02-01T09:20:00Z',
          fechaEntregaEstimada: '2024-02-05T18:00:00Z',
          fechaEntregaReal: '2024-02-04T15:30:00Z',
          total: 1598,
          subtotal: 1299,
          envio: 299,
          impuestos: 0,
          cliente: {
            nombre: 'María López',
            email: 'maria.lopez@email.com',
            telefono: '+52 55 3456 7890',
            direccion: {
              calle: 'Av. Universidad 890',
              colonia: 'Copilco',
              ciudad: 'Ciudad de México',
              estado: 'CDMX',
              codigoPostal: '04360',
              pais: 'México'
            }
          },
          seller: 'FashionHub',
          productos: [
            {
              id: 3,
              nombre: 'Vestido Casual Verano',
              sku: 'VES001',
              precio: 1299,
              cantidad: 1,
              imagen: 'https://via.placeholder.com/300x300/FFB6C1/333?text=Vestido'
            }
          ],
          tracking: {
            numeroGuia: 'TRK789012345',
            paqueteria: 'DHL Express',
            actualizaciones: [
              {
                fecha: '2024-02-01T09:20:00Z',
                estado: 'Pedido recibido',
                descripcion: 'El pedido ha sido recibido y está siendo procesado',
                ubicacion: 'Centro de distribución CDMX'
              },
              {
                fecha: '2024-02-02T11:30:00Z',
                estado: 'En proceso de envío',
                descripcion: 'El pedido está siendo preparado para envío',
                ubicacion: 'Almacén FashionHub'
              },
              {
                fecha: '2024-02-03T08:15:00Z',
                estado: 'En camino',
                descripcion: 'El paquete ha sido enviado y está en tránsito',
                ubicacion: 'Centro de distribución DHL'
              },
              {
                fecha: '2024-02-04T15:30:00Z',
                estado: 'Entregado',
                descripcion: 'El paquete ha sido entregado exitosamente',
                ubicacion: 'Domicilio del cliente'
              }
            ]
          },
          metricasCancelacion: null,
          motivoDevolucion: null
        },
        4: {
          id: 4,
          numeroOrden: 'ORD-2024-001259',
          estado: 'cancelado',
          fecha: '2024-02-09T13:45:00Z',
          fechaCancelacion: '2024-02-10T10:20:00Z',
          total: 2798,
          subtotal: 2499,
          envio: 299,
          impuestos: 0,
          cliente: {
            nombre: 'Roberto Sánchez',
            email: 'roberto.sanchez@email.com',
            telefono: '+52 55 4567 8901',
            direccion: {
              calle: 'Calle Madero 123',
              colonia: 'Centro Histórico',
              ciudad: 'Ciudad de México',
              estado: 'CDMX',
              codigoPostal: '06000',
              pais: 'México'
            }
          },
          seller: 'Sports World',
          productos: [
            {
              id: 4,
              nombre: 'Tenis Running Professional',
              sku: 'TEN001',
              precio: 2499,
              cantidad: 1,
              imagen: 'https://via.placeholder.com/300x300/000080/fff?text=Tenis'
            }
          ],
          tracking: {
            numeroGuia: '',
            paqueteria: '',
            actualizaciones: [
              {
                fecha: '2024-02-09T13:45:00Z',
                estado: 'Pedido recibido',
                descripcion: 'El pedido ha sido recibido y está siendo procesado',
                ubicacion: 'Centro de distribución CDMX'
              },
              {
                fecha: '2024-02-10T10:20:00Z',
                estado: 'Cancelado',
                descripcion: 'El pedido ha sido cancelado',
                ubicacion: 'Sistema'
              }
            ]
          },
          metricasCancelacion: {
            canceladoPor: 'cliente',
            motivo: 'Cambio de opinión',
            indicadores: {
              porSeller: 12,
              porMarketplace: 5,
              porCliente: 23,
              porReglasNegocio: 3
            }
          },
          motivoDevolucion: null
        },
        5: {
          id: 5,
          numeroOrden: 'ORD-2024-001260',
          estado: 'devuelto',
          fecha: '2024-01-25T11:30:00Z',
          fechaDevolucion: '2024-02-08T14:15:00Z',
          total: 1198,
          subtotal: 899,
          envio: 299,
          impuestos: 0,
          cliente: {
            nombre: 'Patricia Hernández',
            email: 'patricia.hernandez@email.com',
            telefono: '+52 55 5678 9012',
            direccion: {
              calle: 'Av. Chapultepec 456',
              colonia: 'Roma Norte',
              ciudad: 'Ciudad de México',
              estado: 'CDMX',
              codigoPostal: '06700',
              pais: 'México'
            }
          },
          seller: 'Beauty Corner',
          productos: [
            {
              id: 5,
              nombre: 'Serum Facial Anti-Edad',
              sku: 'SER001',
              precio: 899,
              cantidad: 1,
              imagen: 'https://via.placeholder.com/300x300/FFA07A/333?text=Serum'
            }
          ],
          tracking: {
            numeroGuia: 'RET456789123',
            paqueteria: 'Estafeta',
            actualizaciones: [
              {
                fecha: '2024-01-25T11:30:00Z',
                estado: 'Pedido recibido',
                descripcion: 'El pedido ha sido recibido y está siendo procesado',
                ubicacion: 'Centro de distribución CDMX'
              },
              {
                fecha: '2024-01-28T16:45:00Z',
                estado: 'Entregado',
                descripcion: 'El paquete ha sido entregado exitosamente',
                ubicacion: 'Domicilio del cliente'
              },
              {
                fecha: '2024-02-05T09:20:00Z',
                estado: 'Devolución solicitada',
                descripcion: 'El cliente ha solicitado la devolución del producto',
                ubicacion: 'Portal del cliente'
              },
              {
                fecha: '2024-02-07T12:30:00Z',
                estado: 'Devolución aprobada',
                descripcion: 'La devolución ha sido aprobada por el seller',
                ubicacion: 'Sistema Beauty Corner'
              },
              {
                fecha: '2024-02-08T14:15:00Z',
                estado: 'Devuelto',
                descripcion: 'El producto ha sido devuelto y el reembolso está siendo procesado',
                ubicacion: 'Centro de devoluciones'
              }
            ]
          },
          metricasCancelacion: null,
          motivoDevolucion: {
            motivo: 'Producto defectuoso',
            subEstatus: 'reembolso_procesando',
            descripcion: 'El producto llegó con el empaque dañado y el contenido derramado',
            solicitudPor: 'cliente',
            fechaSolicitud: '2024-02-05T09:20:00Z',
            estadoSeller: 'aprobada',
            fechaAprobacion: '2024-02-07T12:30:00Z',
            montoReembolso: 1198,
            estadoReembolso: 'procesando'
          }
        }
      };
      
      const mockOrder = mockOrders[parseInt(id)];
      setOrder(mockOrder);
      setLoading(false);
    }, 1000);
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
        setOrder(prev => ({
          ...prev,
          estado: 'cancelado'
        }));
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
    </div>
  );
};

export default OrderDetail;