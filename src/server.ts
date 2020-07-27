// @ts-ignore
import * as server from './service/serverService';
import express from 'express';

const app = express();
const router = express.Router();

app.use('/api/v01', router);

server.startServer(app);
