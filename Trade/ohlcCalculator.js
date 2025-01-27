const { eventEmitter } = require('./events');
const OHLC_INTERVAL = 15000;
const ohlcData = {};
function calculateOHLC(trade) {
    const { sym, P, Q, TS2 } = trade;
    if (!ohlcData[sym]) {
        ohlcData[sym] = {
            barNum: 1,
            startTime: TS2,
            open: P,
            high: P,
            low: P,
            close: 0,
            volume: 0,
        };
    }
    const bar = ohlcData[sym];
    // Check if the current bar should close...
    if (TS2 - bar.startTime >= OHLC_INTERVAL * 1000000) {
        bar.close = bar.close || bar.high; 
        console.log(`OHLC for ${sym}:`, bar);
        // Emit event to WebSocket
        eventEmitter.emit('barClosed', sym, { ...bar });
        // Start a new bar...
        bar.barNum++;
        bar.startTime = TS2;
        bar.open = P;
        bar.high = P;
        bar.low = P;
        bar.close = 0;
        bar.volume = 0;
    }
    // Update OHLC values...
    bar.high = Math.max(bar.high, P);
    bar.low = Math.min(bar.low, P);
    bar.close = P;
    bar.volume += Q;
}

module.exports = { calculateOHLC };
