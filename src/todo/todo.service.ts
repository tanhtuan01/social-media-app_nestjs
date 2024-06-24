import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        try {
            return await this.todoModel.create(todoDTO);
        } catch (error) {
            throw new HttpException(
                'INTERNAL_SERVER_ERROR',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

    }

    async getTodo(todo_id: string, user_id: string): Promise<ToDo> {
        try {
            const userFind = await this.todoModel.findOne({ _id: todo_id })
            if (!userFind) {
                throw new HttpException('TODO_NOT_FOUND', HttpStatus.NOT_FOUND)
            }
            return await this.todoModel.findOne({ _id: todo_id, userId: user_id })
        } catch (error) {
            throw new HttpException(
                'INTERNAL_SERVER_ERROR',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }

    }

    async updateTodo(todoDTO: ToDoDTO): Promise<ToDo> {
        try {
            const todoFind = await this.todoModel.findOne({ _id: todoDTO.userId })
            if (!todoFind) {
                throw new HttpException('TODO_NOT_FOUND', HttpStatus.NOT_FOUND)
            }
            return await this.todoModel.findByIdAndUpdate({ _id: todoDTO.userId }, todoDTO, { new: true }).exec();

        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async softDeleteTodo(todo_id: string, user_id: string): Promise<ToDo> {
        try {
            const findTodo = await this.todoModel.findOne({ _id: todo_id, userId: user_id })
            if (!findTodo) throw new HttpException('Todo not found or not belong to user', HttpStatus.NOT_FOUND)
            findTodo.deleted = true
            findTodo.deletedAt = new Date()
            const softDeleteTodo = await findTodo.save()
            return softDeleteTodo
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async restoreTodo(todo_id: string, user_id: string): Promise<ToDo> {
        const findTodo = await this.todoModel.findOne({ _id: todo_id, userId: user_id, deleted: true })
        if (!findTodo) throw new Error('Todo not found or not belong to user or not deleted')
        return await this.todoModel.findByIdAndUpdate({ _id: todo_id, deleted: false, deletedAt: null }, { new: true }).lean().exec()
    }

    async hardDeleteTodo(todo_id: string, user_id: string): Promise<ToDo> {
        try {
            const findTodo = await this.todoModel.findOne({ _id: todo_id, userId: user_id })
            if (!findTodo) throw new Error('Todo not found or not belong to user')
            await this.todoModel.deleteOne({ _id: todo_id })
            return findTodo
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllTodos(user_id: string): Promise<ToDo[]> {
        try {
            const todoFindList = await this.todoModel.find({ userId: user_id, deleted: false }).lean().exec()
            if (!todoFindList) throw new HttpException('TODO LIST NOT FOUND', HttpStatus.NOT_FOUND)
            return todoFindList
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async getAllDeletedTodos(user_id: string): Promise<ToDo[]> {
        try {
            const todoDeletedFindList = await this.todoModel.find({ userId: user_id, deleted: true }).lean().exec()
            if (!todoDeletedFindList) throw new HttpException('TODO LIST NOT FOUND', HttpStatus.NOT_FOUND)
            return todoDeletedFindList
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }


}
