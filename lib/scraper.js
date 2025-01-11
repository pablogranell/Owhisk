const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function scraper(url, elementoWeb) {
  async function obtenerDatosProducto(urlProducto, selectores) {
    const $ = cheerio.load(await (await fetch(urlProducto)).text());
    const nombre = $(selectores.nombre).text().trim();
    const precioTexto = $(selectores.precio).text().trim();
    console.log(precioTexto);
    const precio = parseFloat(precioTexto.replace(/[^0-9,.]/g, '').replace(',', '.'));
    return { nombre, precio };
  }

  if (Array.isArray(url)) {
    const promesas = url.map(async ({ id, url, elementoWeb }) => {
      try {
        const datos = await obtenerDatosProducto(url, elementoWeb);
        return { id, url, ...datos };
      } catch (error) {
        return { id, url, error: error.message };
      }
    });
    return Promise.all(promesas);
  }

  return obtenerDatosProducto(url, elementoWeb);
}

module.exports = {
  scraper,
};