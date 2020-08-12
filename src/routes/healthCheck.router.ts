/**
 * Required External Modules and Interfaces
 */
import express, {NextFunction, Request, Response} from "express";
import * as Logger from "../service/logService.js";
import os from "os";

/**
 * Router Definition
 */
export const healthCheckRouter = express.Router();

/**
 * Controller Definitions
 */

// GET health-check/
// todo: auth.required
healthCheckRouter.get("/", async (req: Request, res: Response, _next: NextFunction) => {
    // todo: add further things to check (e.g. connecting to database)
    const processData = {
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        resourceUsage: process.resourceUsage()
    }
    const osData = {
        loadavg: os.loadavg(),
        freeMem: os.freemem(),
        totalmem: os.totalmem(),
        uptime: os.uptime(),
        arch: os.arch(),
        cpus: os.cpus(),
        platform: os.platform(),
        hostname: os.hostname(),
        version: os.version(),
        networkInterfaces: os.networkInterfaces()
    }
    const healthCheck = {
        process: processData,
        os: osData,
        message: "OK",
        timestamp: Date.now(),
    };
    try {
        res.status(200).json(healthCheck);
    } catch (e) {
        Logger.error(e.message);
        healthCheck.message = e;
        res.status(503).json(healthCheck);
    }
});
