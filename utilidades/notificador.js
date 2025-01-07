const fetch = require('node-fetch');
const { config } = require('yargs');

async function enviarNotificacion(mensaje, webhookUrl) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: mensaje,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar la notificación ${response.statusText}`);
    }

    console.log('Notificación enviada correctamente');
  } catch (error) {
    console.error('Error al enviar la notificación', error);
    throw error;
  }
}

module.exports = {
  enviarNotificacion,
}; 