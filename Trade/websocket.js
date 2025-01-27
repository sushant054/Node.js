const { eventEmitter } = require('./events');

function simulateWebSocket() {
    eventEmitter.on('barClosed', (symbol, bar) => {
        console.log(`Sending OHLC to WebSocket for ${symbol}:`, bar);
    });
}

module.exports = { simulateWebSocket };
