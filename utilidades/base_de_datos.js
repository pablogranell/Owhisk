const { MongoClient } = require('mongodb');
const Producto = require('../modelos/producto');

const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'chollometro2';

async function conectar() {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

async function getPrecios() {
  try {
    const db = client.db(dbName);
    const coleccionProductos = db.collection('productos');
    const productos = await coleccionProductos.find({}).toArray();
    return productos;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

async function agregarProducto(producto) {
  try {
    const db = client.db(dbName);
    const coleccionProductos = db.collection('productos');
    await coleccionProductos.insertOne(producto);
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    throw error;
  }
}

module.exports = {
  conectar,
  getPrecios,
  agregarProducto,
}; 