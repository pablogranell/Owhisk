const TelegramBot = require('node-telegram-bot-api');


const token = '7486238554:AAHbk6TqVY6VOIksC3EnaJfqN233N9VZQ84'
const chatId = '6963596982';
function main(params) {

    if (!params || !params.mensaje || !params.userId) {
        console.error('Usage: node enviarNotificacion.js <mensaje>');
        return { error: 'Missing required parameters' };
    }


    const bot = new TelegramBot(token, { polling: true });

    bot.sendMessage(chatId, "Notificación desde openwhisk: " + params.mensaje);

    return { mensaje: 'Notificación enviada' };

}

module.exports.main = main;
