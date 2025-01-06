const { extraerInfoProducto } = require('../../utilidades/scraper');

async function main(params) {
  const { url, selectores } = params;

  if (!url) {
    return { error: 'Se requiere la URL del producto' };
  }

  try {
    const infoProducto = await extraerInfoProducto(url, selectores);
    return { body: infoProducto };
  } catch (error) {
    console.error('Error al obtener la información del producto:', error);
    return { error: 'Error al obtener la información del producto' };
  }
}

exports.main = main; 