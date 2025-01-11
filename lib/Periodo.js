const { Client } = require('pg');
const scraper = require('./scraper');
const notificador = require('./enviarNotificacion');

async function connectDB() {
    const client = new Client({
        user: 'rse_user',
        host: 'localhost',
        database: 'mydb',
        password: 'rse_password',
        port: 5432,
    });
    await client.connect();
    return client;
}

async function main() {
    try {
        const client = await connectDB();
        
        const result = await client.query('SELECT * FROM products');
        
        for (const product of result.rows) {
            const currentData = await scraper.main({ url: product.url });
            
            if (currentData.precio < product.price) {
                const mensaje = `¡Bajada de precio! ${product.name} ahora cuesta ${currentData.precio}€ (antes ${product.price}€)\nURL: ${product.url}`;
                await notificador.main({ mensaje });
                
                await client.query(
                    'UPDATE products SET price = $1 WHERE id = $2',
                    [currentData.precio, product.id]
                );
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