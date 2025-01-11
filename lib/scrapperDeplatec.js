const { scraper } = require('./scraper');

scraper('https://deplatec.com/torres-gaming/63909-pctec-gaming-ga5-ryzen-5-5500-32gb-1tb-rtx-4060-ti.html', {
    nombre: 'h1.page-title',
    precio: '.product-price.current-price-value'
})
.then(resultado => console.log(resultado))
.catch(error => console.error(error));