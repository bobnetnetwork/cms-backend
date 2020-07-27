import { configure, getLogger } from "log4js";
// @ts-ignore
import * as Config from "../config/config";
configure("./filename");
const logger = getLogger();
logger.level = Config.logLevel;

configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["CMS_DEV"], level: Config.logLevel } }
});

export const trace = (msg) => {
    logger.trace(msg);
}

export const debug = (msg) => {
    logger.debug(msg);
}

export const info = (msg) => {
    logger.info(msg);
}

export const warn = (msg) => {
    logger.warn(msg);
}

export const error = (msg) => {
    logger.error(msg);
}

export const fatal = (msg) => {
    logger.fatal(msg);
}