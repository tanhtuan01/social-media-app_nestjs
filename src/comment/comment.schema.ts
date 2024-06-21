import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type commentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    postId: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    createdAt: Date;


}


export const CommentSchema = SchemaFactory.createForClass(Comment);