// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('User', new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    pwd: String,
    id: Long,
    accountExpired: Boolean,
    accountLocked: Boolean,
    credentialsExpired: Boolean,
    enabled: Boolean,
    registeredAt: Date,
    roles: Object
}));