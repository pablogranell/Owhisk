async function main(params) {
    if (!params || !params.mensaje) {
        console.error('Usage: node enviarNotificacion.js <mensaje>');
        return { error: 'Missing required parameters' }; 
    }
    const {mensaje} = params;
    const webhookUrl = 'localhost';

    try {
        /*const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: mensaje
            })
        });
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }*/
        return {mensaje: mensaje};
    } catch (error) {
        console.error('Error al enviar notificación a openwhisk:', error);
        return {mensaje: 'Error al enviar notificación a openwhisk'};
    }
}

module.exports.main = main;
