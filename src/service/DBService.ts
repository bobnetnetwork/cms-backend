import mongoose from "mongoose";
import dotenv from "dotenv";
import {LogService} from "./LogService.js";

export class DBService {
    private readonly USER: string;
    private readonly PWD: string;
    private readonly TYPE: string;
    private readonly PORT: number;
    private readonly ADDRESS: string;
    private readonly DATABASE: string;

    private log = new LogService().getLogger("dbService");

    private connection: { once: (arg0: string, arg1: () => Promise<void>) => void; on: (arg0: string, arg1: () => void) => void; };
    private readonly dbUri: string;

    constructor() {
         if (process.env.NODE_ENV !== 'production') {
             dotenv.config();
         }
         this.USER = process.env.DB_SERVER_USER;
         this.PWD = process.env.DB_SERVER_PWD;
         this.TYPE = process.env.DB_SERVER_TYPE;
         this.PORT = parseInt(process.env.DB_SERVER_PORT, 10);
         this.ADDRESS = process.env.DB_SERVER_ADDRESS;
         this.DATABASE = process.env.DB_SERVER_DATABASE;
         this.dbUri = this.getDBUri();
    }

    private getDBUri(){
        return "mongodb://" + this.USER + ":" + this.PWD + "@" + this.ADDRESS + ":" + this.PORT + "/" + this.DATABASE;
    }

    public connectToDB() {
        try {
            mongoose.connect(this.dbUri, {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
            this.connection = mongoose.connection;
            this.connection.once("open", async () => {
                this.log.info("Connected to database");
            });
            this.connection.on("error", () => {
                this.log.error("Error connecting to database");
            });
        } catch (e) {
            this.log.error(e.message);
            this.log.debug(e.stack);
        }
    }

    public disconnect() {
        if (!this.connection) {
            return;
        }
        mongoose.disconnect();
    }
}
