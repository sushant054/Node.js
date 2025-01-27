const { readTrades } = require('./readTrade');
const { calculateOHLC } = require('./ohlcCalculator');
const { simulateWebSocket } = require('./websocket');
const { eventEmitter } = require('./events');

function main() {
    const tradesFile = './trades.json';

    console.log('Starting OHLC computation...');
    readTrades(tradesFile);
    eventEmitter.on('newTrade', calculateOHLC);
    simulateWebSocket();
}

main();
