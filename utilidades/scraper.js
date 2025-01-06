const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function extraerInfoProducto(url, elementoWeb) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    const nombre = $(elementoWeb.nombre).text().trim();
    const precioTexto = $(elementoWeb.precio).text().trim();
    const precio = parseFloat(precioTexto.replace(/[^0-9,.]/g, '').replace(',', '.'));

    return { nombre, precio };
  } catch (error) {
    console.error('Error al extraer la información del producto:', error);
    throw error;
  }
}

module.exports = {
  extraerInfoProducto,
}; 