// @ts-ignore
import { Schema, Model } from "mongoose";
import {Long} from "long";

module.exports = Model('Article', new Schema({
    title: String,
    headline: String,
    content: String,
    featuredImage: String,
    author: Object,
    slug: String,
    addedAt: Date,
    id: Long,
    tags: Object,
    categories: Object
}));