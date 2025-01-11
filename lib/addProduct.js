const { Client } = require('pg');

async function connectDB() {
    const client = new Client({
      user: 'rse_user',
      host: 'localhost',
      database: 'owhiskdb',
      password: 'rse_password',
      port: 5432,
    });
    await client.connect();
    return client;
}

async function main(args) {
    if (!args || args.length < 3) {
        console.error('Usage: node addProduct.js <name> <price> <url>');
        process.exit(1);
    }

    const [name, price, url] = args;

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
        return res.rows[0];
    } catch (err) {
        console.error('Error adding product:', err);
        process.exit(1);
    }
}

// Execute main function with command line arguments
if (require.main === module) {
    main(process.argv.slice(2)).catch(console.error);
}

module.exports = { main };