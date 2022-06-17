import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from 'socket.io';
import cookieParser from "cookie-parser";

import router from "./router/router";
import BinanceService from "./services/binance.service";
import Binance from "node-binance-api";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://statcoinmarket-copy-5nsj0kvw9-daniilokrug.vercel.app" 
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://statcoinmarket-copy-5nsj0kvw9-daniilokrug.vercel.app/",
  })
);
app.use("/api", router);

io.on('connection', (socket) => {
    console.log('User connected!');
});

(async function start() {
  server.listen(port, () => console.log(`Running on port ${port}`));

  const binanceService = new BinanceService(io);
  
  binanceService.openWebsocket();
})();