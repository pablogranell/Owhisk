async function enviarNotificacionDiscord(mensaje) {
    const webhookUrl = 'webhookPlaceholderPreOW';

    try {
        const response = await fetch(webhookUrl, {
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
        }
        
        return true;
    } catch (error) {
        console.error('Error al enviar notificación a openwhisk:', error);
        return false;
    }
}

module.exports = {
    enviarNotificacionDiscord
};
