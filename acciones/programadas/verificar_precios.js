const Producto = require('../../modelos/producto');
const { getPrecios } = require('../../utilidades/base_de_datos');
const { extraerInfoProducto } = require('../../utilidades/scraper');
const { main: actualizarPrecio } = require('../internas/actualizar_precio');
const { main: enviarAlerta } = require('../notificaciones/enviar_alerta');

async function main(params) {
  try {
    const productos = await getPrecios();
    const productoPendiente = productos.map(async (producto) => {
      const infoProducto = await extraerInfoProducto(producto.url, producto.elementoWeb);
      console.log(infoProducto);

      if (infoProducto.precio !== producto.precioActual) {
        await actualizarPrecio({ url: producto.url, precio: infoProducto.precio });
        if (infoProducto.precio <= producto.precioDeseado) {
          await enviarAlerta({ url: producto.url, precio: infoProducto.precio, nombre: infoProducto.nombre });
        }
      }
    });

    await Promise.all(productoPendiente);

    return {
      body: 'Precios verificados correctamente',
    };
  } catch (error) {
    console.error('Error al verificar precios:', error);
    return {
      error: 'Error al verificar precios',
    };
  }
}

exports.main = main; 