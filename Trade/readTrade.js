const fs = require('fs');
const readline = require('readline');
const { eventEmitter } = require('./events');
function readTrades(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });
    rl.on('line', (line) => {
        try {
            const trade = JSON.parse(line);
            eventEmitter.emit('newTrade', trade);
        } catch (err) {
            console.error('Invalid JSON:', line);
        }
    });
    rl.on('close', () => {
        console.log('Finished reading trades.');
    });
}

module.exports = { readTrades };
