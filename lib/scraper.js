const cheerio = require('cheerio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function main(url, elementoWeb) {
  async function obtenerDatosProducto(urlProducto, selectores) {
    const $ = cheerio.load(await (await fetch(urlProducto)).text());
    const nombre = $(selectores.nombre).text().trim();
    const precioTexto = $(selectores.precio).text().trim();
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

module.exports.main = main;

main('https://deplatec.com/torres-gaming/63909-pctec-gaming-ga5-ryzen-5-5500-32gb-1tb-rtx-4060-ti.html', {
  nombre: 'h1.page-title',
  precio: '.product-price.current-price-value'
})
.then(resultado => console.log(resultado))
.catch(error => console.error(error));