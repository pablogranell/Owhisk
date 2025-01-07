const { MongoClient } = require('mongodb');
const { conectar } = require('../../utilidades/base_de_datos');

async function main(params) {
  const { url, precio } = params;

  if (!url || precio === undefined) {
    return { error: 'Se requieren la URL del producto y el nuevo precio' };
  }

  try {
    await conectar();
    const db = client.db('chollometro2');
    const coleccionProductos = db.collection('productos');

    const resultado = await coleccionProductos.updateOne(
      { url: url },
      {
        $set: {
          precioActual: precio,
          fechaUltimaActualizacion: new Date(),
        },
        $push: {
          historialPrecios: {
            fecha: new Date(),
            precio: precio,
          },
        },
      }
    );

    if (resultado.matchedCount === 0) {
      return { error: 'No se encontró ningún producto con esa URL' };
    }

    if (resultado.modifiedCount === 0) {
      return { body: 'El precio ya estaba actualizado' };
    }

    return { body: 'Precio actualizado correctamente' };
  } catch (error) {
    console.error('Error al actualizar el precio:', error);
    return { error: 'Error al actualizar el precio' };
  }
}

exports.main = main; 