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
    if (!params || !params.name || !params.price || !params.url || !params.teleid) {
        return { error: 'Usage:  wsk action invoke lib/addProduct -r -p name <nombre> -p price <price> -p url <url> -p teleid <teleId>' };
    }

    const { name, price, url, teleid } = params; 


    try {
        const client = await connectDB();

        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2) NOT NULL,
            url TEXT,
            teleid VARCHAR(100)
            )
        `);
        const query = {
            text: 'INSERT INTO products(name, price, url, teleid) VALUES($1, $2, $3, $4) RETURNING *',
            values: [name, price, url, teleid],
        };

        const res = await client.query(query);
        console.log('Producto agregado correctamente:', res.rows[0]);
        
        await client.end();

        return { result: res.rows[0] }; 
    } catch (err) {
        console.error('Error agregando producto:', err);
        return { error: err.message }; 
    }
}

module.exports.main = main; 