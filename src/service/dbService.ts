// @ts-ignore
import * as Mongoose from "mongoose";
// @ts-ignore
import * as Config from "../config/config";
let connection;

export const connectToDB = () => {
    let dbUri;
    dbUri = 'mongodb://' + Config.dbServerUser + ":" + Config.dbServerPwd + '@' + Config.dbServerAddress + ":" + Config.dbServerPort + '/' + Config.dbServerDataBase;
    Mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    connection = Mongoose.connection;
    connection.once("open", async () => {
        console.log("Connected to database");
    });
    connection.on("error", () => {
        console.log("Error connecting to database");
    });
}

export const disconnect = () => {
    if (!connection) {
        return;
    }
    Mongoose.disconnect();
};