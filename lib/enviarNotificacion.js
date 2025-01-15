const TelegramBot = require('node-telegram-bot-api');


const token = '7486238554:AAHbk6TqVY6VOIksC3EnaJfqN233N9VZQ84'
function main(params) {

    if (!params || !params.mensaje || !params.teleid) {
        return { error: 'Usage: wsk action invoke lib/enviarNotificacion -r -p mensaje <mensaje> -p teleId <telegramId>' };
    }
    const { mensaje, teleid } = params;

    const bot = new TelegramBot(token, { polling: true });

    bot.sendMessage(teleid, "Notificación desde openwhisk: " + mensaje);

    return { mensaje: 'Notificación enviada' };

}

module.exports.main = main;
