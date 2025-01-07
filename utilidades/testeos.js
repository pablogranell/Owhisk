const { main } = require('./acciones/notificaciones/enviar_alerta.js');

// Datos de prueba
const params = {
  url: 'https://www.ejemplo.com/producto',
  precio: '99.99€',
  nombre: 'PlayStation 5'
};

// Ejecutar la función
main(params)
  .then(result => {
    console.log('Resultado:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });