import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ maxlength: 50 })
    name: string;

    @Prop({ unique: true, maxlength: 50 })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    avatar: string;

    @Prop()
    bio: string;

    @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);