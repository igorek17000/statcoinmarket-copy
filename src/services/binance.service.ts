import Binance from "node-binance-api";
import { ReservedOrUserListener } from "socket.io/dist/typed-events";

class BinanceService {
  binance: Binance;
  io: any;

  constructor(ioSocket: any) {
    this.binance = new Binance().options({
      useServerTime: true,
      recvWindow: 60000, // Set a higher recvWindow to increase response timeout
      verbose: true, // Add extra output when subscribing to WebSockets, etc
      log: (log) => {
        console.log(log); // You can create your own logger here, or disable console output
      },
    });

    this.io = ioSocket; 
  }

  openWebsocket(): void {
    this.binance.websockets.candlesticks("BTCUSDT", "1M", (candlesticks) => {
      const { e: eventType, E: eventTime, s: symbol, k: ticks } = candlesticks;
      const {
        o: open,
        h: high,
        l: low,
        c: close,
        v: volume,
        n: trades,
        i: interval,
        x: isFinal,
        q: quoteVolume,
        V: buyVolume,
        Q: quoteBuyVolume,
      } = ticks;

      this.io.emit("symbols update", close);
    });
  }
}

export default BinanceService;
