const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: {
        addProduct: './lib/addProduct.js',
        scraper: './lib/scraper.js',
        enviarNotificacion: './lib/enviarNotificacion.js',
        runtime: './lib/runtime.js',
        deleteProduct: './lib/deleteProduct.js',
        listProducts: './lib/listProducts.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2', // Asegúrate de que las exportaciones son compatibles con Node.js
    },
};
