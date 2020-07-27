/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { usersRouter } from './router/users.router';
import { errorHandler } from "./middleware/error.middleware";
import {notFoundHandler} from "./middleware/notFound.middleware";
// @ts-ignore
import * as server from './service/serverService';
import express, {Request, Response} from 'express';

dotenv.config();

/**
 *  App Configuration
 */

const app = express();
const router = express.Router();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v01', router);
app.use('/api/v01/users', usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

// @ts-ignore
router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to CMS_DEV server by BobNET Network!'
    });
})





server.startServer(app);
