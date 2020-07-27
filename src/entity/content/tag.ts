// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('Tag', new Schema({
    title: String,
    slug: String,
    addedAt: Date,
    id: Long,
    articles: Object
}));