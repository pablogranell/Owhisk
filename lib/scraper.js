const cheerio = require('cheerio');

async function main(params) {
  if (!params || !params.url) {
    console.error('Usage: node scraper.js <url>');
    return { error: 'Missing required parameters' }; 
  }

  const {url} = params;

  async function obtenerDatosProducto(urlProducto) {
    const $ = cheerio.load(await (await fetch(urlProducto)).text());
    const nombre = $('h1.page-title').text().trim();
    const precioTexto = $('.product-price.current-price-value').text().trim();
    const precio = parseFloat(precioTexto.replace(/[^0-9,.]/g, '').replace(',', '.'));
    return { nombre, precio };
  }

  if (Array.isArray(url)) {
    const promesas = url.map(async ({ id, url}) => {
      try {
        const datos = await obtenerDatosProducto(url);
        return { id, url, ...datos };
      } catch (error) {
        return { id, url, error: error.message };
      }
    });
    return Promise.all(promesas);
  }

  return obtenerDatosProducto(url);
}

module.exports.main = main;