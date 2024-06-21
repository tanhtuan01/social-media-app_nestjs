import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type ChatDocument = HydratedDocument<Chat>;

@Schema()

export class Chat {

    @Prop({ required: true })
    sender: string;

    @Prop({ required: true })
    receiver: string;

    @Prop({ required: true })
    message: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ default: 'send' })
    type: string

    @Prop({ required: true, default: false })
    isRead: boolean;

}


export const ChatSchema = SchemaFactory.createForClass(Chat);