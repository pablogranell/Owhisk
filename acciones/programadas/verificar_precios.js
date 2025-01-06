const Producto = require('../../modelos/producto');
const { getPrecios } = require('../../utilidades/base_de_datos');
const { extraerInfoProducto } = require('../../utilidades/scraper');

async function main(params) {
  try {
    const productos = await getPrecios();
    const productoPendiente = productos.map(async (producto) => {
      const infoProducto = await extraerInfoProducto(producto.url, producto.selectores);
      console.log(infoProducto);
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