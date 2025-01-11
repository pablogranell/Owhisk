const { Client } = require('pg');
const scraper = require('./scraper');
const notificador = require('./enviarNotificacion');
const openwhisk = require('openwhisk');

async function connectDB() {
    const client = new Client({
        user: 'rse_user',
        host: 'host.docker.internal',
        database: 'mydb',
        password: 'rse_password',
        port: 5432,
    });
    await client.connect();
    return client;
}

const options = {
    apihost: 'http://host.docker.internal:3233',
    api_key: '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP',
    namespace: '_',
    ignore_certs: true,
};

const ow = openwhisk(options);


async function main() {
    try {
        const client = await connectDB();
        
        const result = await client.query('SELECT * FROM products');
        
        for (const product of result.rows) {
            const currentData = await scraper.main({ url: product.url });
            
            if (currentData.precio < product.price) {
                const mensaje = `¡Bajada de precio! ${product.name} ahora cuesta ${currentData.precio}€ (antes ${product.price}€)\nURL: ${product.url}`;
                
                await ow.actions.invoke({ name: 'lib/enviarNotificacion', params: { mensaje } });
                return { message: 'Bajada de precio' };
            }
        }
        
        await client.end();
        return { message: 'Price check completed successfully' };
        
    } catch (error) {
        console.error('Error checking prices:', error);
        return { error: error.message };
    }
}

module.exports.main = main; 