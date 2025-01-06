class Producto {
  constructor(url, nombre, precioDeseado, elementoWeb, precioActual, precioMinimoHistorico, historialPrecios, fechaCreacion, fechaUltimaActualizacion = null, disponibilidad = null, porcentajeDescuento = null, vendedor = null, categoria = null, valoraciones = {puntuacion: null, numeroReviews: null}) {
    this.url = url;
    this.nombre = nombre;
    this.precioActual = precioActual;
    this.precioMinimoHistorico = precioMinimoHistorico;
    this.precioDeseado = precioDeseado;
    this.historialPrecios = historialPrecios || [];
    this.fechaCreacion = fechaCreacion || new Date();
    this.fechaUltimaActualizacion = fechaUltimaActualizacion;
    this.elementoWeb = {
      nombre: elementoWeb.nombre,
      precio: elementoWeb.precio
    };
    this.disponibilidad = disponibilidad;
    this.porcentajeDescuento = porcentajeDescuento;
    this.vendedor = vendedor;
    this.categoria = categoria;
    this.valoraciones = valoraciones;
  }
}

module.exports = Producto;