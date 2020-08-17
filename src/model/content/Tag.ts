import typegoose, {Ref} from "typegoose";
import {Article} from "./Article";
const { prop, Typegoose } = typegoose;

export class Tag extends Typegoose {

    @prop()
    public title?: string;

    @prop()
    public slug?: string;

    @prop()
    public addedAt?: Date;

    @prop()
    public articles?: Ref<Article>;
}

export const TagModel = new Tag().getModelForClass(Tag);
