const { exec } = require('child_process');
const openwhisk = require('openwhisk');

const options = {
    apihost: 'http://host.docker.internal:3233',
    api_key: '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP',
    namespace: '_',
    ignore_certs: true,
};

const ow = openwhisk(options);

async function main() {
    try {
        await ow.actions.invoke({ 
            name: 'lib/runtime',
            blocking: true
        });
        setTimeout(() => {
            exec('node scheduler.js', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error en la auto-invocación: ${error}`);
                    return;
                }
            });
        }, 120000);

    } catch (error) {
        console.error('Error al invocar las acciones:', error);
    }
}

main();

module.exports.main = main;