import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cookieParser from 'cookie-parser';

import router from './router/router';

dotenv.config();
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

server.listen(port, () => console.log(`Running on port ${port}`));