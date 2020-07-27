// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('Role', new Schema({
    name: String,
    id: Long
}));