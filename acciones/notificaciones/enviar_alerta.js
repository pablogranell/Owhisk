const http = require('http');
const { URL } = require('url');

async function main(params) {
  const { url, precio, nombre } = params;

  if (!url || precio === undefined || !nombre) {
    return { error: 'Se requieren la URL, el precio y el nombre del producto' };
  }

  try {
    const mensaje = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Oferta encontrada</title>
      </head>
      <body>
        <h1>¡Oferta encontrada!</h1>
        <p>El precio de <strong>${nombre}</strong> ha bajado a <strong>${precio}</strong>.</p>
        <p>URL: <a href="${url}">${url}</a></p>
      </body>
      </html>
    `;

    // Crear un servidor simple que se cierra después de enviar una respuesta
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(mensaje);
      server.close();
    });

    // Iniciar el servidor en un puerto aleatorio
    server.listen(0, () => {
      const port = server.address().port;
      const serverUrl = `http://localhost:${port}`;
      console.log(`Servidor de notificaciones escuchando en ${serverUrl}`);

      // Abrir el navegador (opcional, dependiendo del entorno)
      // require('open')(serverUrl);
    });

    return { body: 'Alerta enviada correctamente' };
  } catch (error) {
    console.error('Error al enviar la alerta:', error);
    return { error: 'Error al enviar la alerta' };
  }
}

exports.main = main; 