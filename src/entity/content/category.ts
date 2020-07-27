// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('Category', new Schema({
    name: String,
    description: String,
    featuredImage: String,
    slug: String,
    addedAt: Date,
    id: Long,
    parent: Object,
    articles: Object
}));