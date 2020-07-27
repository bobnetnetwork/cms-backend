// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('File', new Schema({
    fileName: String,
    url: String,
    slug: String,
    mimeType: String,
    addedAt: Date,
    id: Long
}));