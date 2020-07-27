// @ts-ignore
import * as server from './service/serverService';
import express from 'express';

const app = express();

server.startServer(app);
