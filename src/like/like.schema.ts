import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type postDocument = HydratedDocument<Like>;

@Schema()
export class Like {

    @Prop()
    userId: string;

    @Prop()
    postId: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    isLiked: boolean;

}

export const LikeSchema = SchemaFactory.createForClass(Like);