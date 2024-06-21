import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type shareDocument = HydratedDocument<Share>;

@Schema()

export class Share {

    @Prop()
    postId: string;

    @Prop()
    userShare: string;

}


export const ShareSchema = SchemaFactory.createForClass(Share);