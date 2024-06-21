import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo } from './todo.schema';
import { Model } from 'mongoose';
import { ToDoDTO } from './todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(ToDo.name) private readonly todoModel: Model<ToDo>
    ) { }


    async createTodo(todoDTO: ToDoDTO): Promise<ToDo> {
        const createTodo = await this.todoModel.create(todoDTO);
        return createTodo;
    }

    async getTodo(todo_id: string, user_id: string): Promise<ToDo> {
        return await this.todoModel.findOne({ _id: todo_id, userId: user_id })
    }

    async updateTodo(todoDTO: ToDoDTO): Promise<ToDo> {
        const todoUpdate = await this.todoModel.findByIdAndUpdate({ _id: todoDTO.userId }, todoDTO, { new: true }).exec();
        return todoUpdate;
    }

    async softDeleteTodo(todo_id: string, user_id: string): Promise<ToDo> {
        const findTodo = await this.todoModel.findOne({ _id: todo_id, userId: user_id })
        if (!findTodo) throw new Error('Todo not found or not belong to user')
        findTodo.deleted = true
        findTodo.deletedAt = new Date()
        const softDeleteTodo = await findTodo.save()
        return softDeleteTodo
    }

    async restoreTodo(todo_id: string, user_id: string): Promise<ToDo> {
        const findTodo = await this.todoModel.findOne({ _id: todo_id, userId: user_id, deleted: true })
        if (!findTodo) throw new Error('Todo not found or not belong to user or not deleted')
        return await this.todoModel.findByIdAndUpdate({ _id: todo_id, deleted: false, deletedAt: null }, { new: true }).lean().exec()
    }

    async hardDeleteTodo(todo_id: string, user_id: string): Promise<ToDo> {
        const findTodo = await this.todoModel.findOne({ _id: todo_id, userId: user_id })
        if (!findTodo) throw new Error('Todo not found or not belong to user')
        await this.todoModel.deleteOne({ _id: todo_id })
        return findTodo
    }

    async getAllTodos(user_id: string): Promise<ToDo[]> {
        return await this.todoModel.find({ userId: user_id, deleted: false }).lean().exec()
    }

    async getAllDeletedTodos(user_id: string): Promise<ToDo[]> {
        return await this.todoModel.find({ userId: user_id, deleted: true }).lean().exec()
    }


}
