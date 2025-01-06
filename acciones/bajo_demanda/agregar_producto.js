const Producto = require('../../modelos/producto');
const { agregarProducto } = require('../../utilidades/base_de_datos');

async function main(params) {
  const { url, nombre, precioDeseado, selectores } = params;

  if (!url || !nombre || !precioDeseado || !selectores) {
    return { error: 'Se requieren todos los campos: url, nombre, precioDeseado, selectores' };
  }

  try {
    const producto = new Producto(url, nombre, precioDeseado, selectores);
    await agregarProducto(producto);
    return { body: 'Producto agregado correctamente' };
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    return { error: 'Error al agregar el producto' };
  }
}

exports.main = main; 