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

    @Prop({ required: true, enum: ['Personal', 'Work', 'Family', 'Study', 'Healthy', 'Entertainment', 'Finance', 'Home'], default: 'Personal' })
    type: string;

    @Prop({ required: true, enum: ['pending', 'inprogress', 'completed'], default: 'pending' })
    status: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ default: false })
    deleted: boolean;

    @Prop()
    deletedAt: Date;

    @Prop({ default: '' })
    note: string;

    @Prop({ required: true, default: 'Normal', enum: ['Important', 'Normal'] })
    taskPriority: string;
}


export const ToDoSchema = SchemaFactory.createForClass(ToDo);