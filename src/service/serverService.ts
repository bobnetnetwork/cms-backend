import * as HTTPS from "https";
import * as HTTP from "http";
import * as Logger from "../service/logService.js";
import * as fs from "fs";
import dotenv from "dotenv";
import * as database from "./dbService.js"

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const PORT: number = parseInt(process.env.APP_PORT as string, 10);

export const startServer = (app) => {
    if (process.env.HTTPS_ENABLED === "true") {
        const privateKey = fs.readFileSync("sslcert/server.key", "utf8");
        const certificate = fs.readFileSync("sslcert/server.crt", "utf8");

        const credentials = {key: privateKey, cert: certificate};

        const httpsServer = HTTPS.createServer(credentials, app);
        httpsServer.listen(PORT);
        Logger.info("Server started at https://localhost:" + PORT);
    } else {
        const httpServer = HTTP.createServer(app);
        httpServer.listen(PORT);
        Logger.info("Server started at http://localhost:" + PORT);
    }
    Logger.info("pid is " + process.pid);
    connectToDB();
}

function  connectToDB() {
    database.connectToDB()
}

function closeDBConnections() {
    database.disconnect();
}

export const shutDown = (msg) => {
    Logger.info(msg);
    Logger.info("Closing DB connection(s).")
    closeDBConnections();
    Logger.info("Closing http(s) server.")
    process.exit(0);
}