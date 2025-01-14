const scraper = require('./scraper');
const openwhisk = require('openwhisk');
const listProducts = require('./listProducts');

const options = {
    apihost: 'http://host.docker.internal:3233',
    api_key: '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP',
    namespace: '_',
    ignore_certs: true,
};

const ow = openwhisk(options);

async function main() {
    try {
        const { products } = await listProducts.main();
        
        for (const product of products) {
            const currentData = await scraper.main({ url: product.url });
            
            if (currentData.precio < product.price) {
                const mensaje = `¡Bajada de precio! ${product.name} ahora cuesta ${currentData.precio}€ (antes ${product.price}€)\nURL: ${product.url}`;
                const teleId = product.teleId;
                await ow.actions.invoke({ name: 'lib/enviarNotificacion', params: { mensaje, teleId } });
                return { message: 'Bajada de precio' };
            }
        }
        
        return { message: 'Precio comprobado correctamente' };
        
    } catch (error) {
        console.error('Error comprobando precios:', error);
        return { error: error.message };
    }
}

module.exports.main = main; 