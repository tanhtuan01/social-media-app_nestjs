import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BPostDocument = HydratedDocument<BPost>;

@Schema()
export class BPost {

    @Prop()
    content: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    author: string;

    @Prop()
    deletedAt: Date;

    @Prop()
    deleted: true;

    @Prop()
    tag: string;
}


export const BPostSchema = SchemaFactory.createForClass(BPost);