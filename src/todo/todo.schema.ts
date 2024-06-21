import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TodoDocument = HydratedDocument<ToDo>;

@Schema()
export class ToDo {

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' })
    status: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: false })
    deleted: boolean;

    @Prop()
    deletedAt: Date;
}


export const ToDoSchema = SchemaFactory.createForClass(ToDo);