// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('Options', new Schema({
    name: String,
    value: String
}));