const { Client } = require('pg');

async function connectDB() {
    const client = new Client({
      user: 'rse_user',
      host: '172.17.0.6',  
      database: 'mydb',
      password: 'rse_password',
      port: 5432,
    });
    await client.connect();
    return client;
}

async function main(params) {  
    if (!params || !params.name || !params.price || !params.url) {
        console.error('Usage: node addProduct.js <name> <price> <url>');
        return { error: 'Missing required parameters' }; 
    }

    const { name, price, url } = params; 


    try {
        const client = await connectDB();

        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            price DECIMAL(10,2) NOT NULL,
            url TEXT
            )
        `);
        const query = {
            text: 'INSERT INTO products(name, price, url) VALUES($1, $2, $3) RETURNING *',
            values: [name, price, url],
        };

        const res = await client.query(query);
        console.log('Product added successfully:', res.rows[0]);
        
        await client.end();

        return { result: res.rows[0] }; 
    } catch (err) {
        console.error('Error adding product:', err);
        return { error: err.message }; 
    }
}

module.exports.main = main; 