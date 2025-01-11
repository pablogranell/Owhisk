const cheerio = require('cheerio');

  async function main(params) {
    if (!params || !params.url) {
      console.error('Usage: node scraper.js <url>');
      return { error: 'Missing required parameters' }; 
    }
  
    const {url} = params;
    
    const $ = cheerio.load(await (await fetch(url)).text());
    const nombre = $('h1.page-title').text().trim();
    const precioTexto = $('.product-price.current-price-value').text().trim();
    const precio = parseFloat(precioTexto.replace(/[^0-9,.]/g, '').replace(',', '.'));
    return { nombre, precio };
}

module.exports.main = main;