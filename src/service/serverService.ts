import * as HTTPS from 'https';
import * as HTTP from 'http';
// @ts-ignore
import * as Config from "../config/config";
import * as Logger from "../service/logService";
import * as fs from "fs";

export const startServer = (app) => {
    if(Config.httpsEnabled){
        const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
        const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

        const credentials = { key: privateKey, cert: certificate };

        const httpsServer = HTTPS.createServer(credentials, app);
        httpsServer.listen(Config.serverPort);
        Logger.info('Server started at https://localhost:' + Config.serverPort);
    }else {
        const httpServer = HTTP.createServer(app);
        httpServer.listen(Config.serverPort);
        Logger.info('Server started at http://localhost:' + Config.serverPort);
    }
}

export const shutDown = () => {
    process.exit();
}