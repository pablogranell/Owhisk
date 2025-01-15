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

async function main(params) {
    if (!params || !params.id) {
        return { error: 'Falta el ID del producto' };
    }

    const { id } = params;

    try {
        const client = await connectDB();

        const query = {
            text: 'DELETE FROM products WHERE id = $1 RETURNING *',
            values: [id],
        };

        const res = await client.query(query);

        if (res.rowCount === 0) {
            await client.end();
            return { error: 'Producto no encontrado' };
        }

        console.log('Producto eliminado correctamente:', res.rows[0]);
        await client.end();

        return { result: res.rows[0] };
    } catch (err) {
        console.error('Error eliminando producto:', err);
        return { error: err.message };
    }
}

module.exports.main = main; 