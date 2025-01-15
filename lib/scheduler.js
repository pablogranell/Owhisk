const openwhisk = require('openwhisk');
const os = require('os');
const platform = os.platform();
const host = platform === 'linux' ? '172.17.0.1' : 'host.docker.internal';
const options = {
    apihost: 'http://'+ host+ ':3233',
    api_key: '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP',
    namespace: '_',
    ignore_certs: true,
};

const ow = openwhisk(options);

async function main() {
    try {
        setInterval(async () => {
            await ow.actions.invoke({ 
                name: 'lib/runtime',
                blocking: true
            });
        }, 2000);

    } catch (error) {
        return { error: error.message };
    }
    return { message: 'Scheduler iniciado correctamente' };
}

module.exports.main = main;