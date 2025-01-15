const { Client } = require('pg');
const os = require('os');
async function connectDB() {
    const platform = os.platform();
    const host = platform === 'linux' ? '172.17.0.1' : 'host.docker.internal';
    const client = new Client({
        user: 'rse_user',
        host: host,
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
        await client.end();

        return {
            products: result.rows,
            count: result.rowCount
        };
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        return { error: error.message };
    }
}

module.exports.main = main; 