import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDoDTO } from './todo.dto';
import { ToDo } from './todo.schema';
import { Request } from 'express';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    @Post('create')
    createTodo(@Body() todoDTO: ToDoDTO, @Req() req: Request): Promise<ToDo> {
        const userId = req.userId;
        console.log("Controller todoDTO: " + todoDTO)
        return this.todoService.createTodo(userId, todoDTO);
    }

    @Get('get/:id')
    getTodoByUser(@Param('id') id: string, @Req() req: Request): Promise<ToDo> {
        const userId = req.userId;
        return this.todoService.getTodoByUser(id, userId);
    }

    @Get('list-by-user')
    listTodoByUserId(@Req() req: Request): Promise<ToDo[]> {
        const userId = req.userId;
        return this.todoService.getAllTodoByUserId(userId);
    }

    @Delete('soft-delete/:id')
    async deleteTodo(@Param('id') id: string, @Req() req: Request) {
        const userId = req.userId;
        return await this.todoService.softDeleteTodo(id, userId);
    }

    @Put('update/:id')
    updateTodo(@Body() todoDTO: ToDoDTO, @Param('id') id: string, @Req() req: Request): Promise<ToDo> {
        const userId = req.userId;
        return this.todoService.updateTodo(id, todoDTO, userId);
    }

    @Get('todo/:id/:userId')
    getTodo(@Param('id') id: string, @Param('userId') userId: string): Promise<ToDo> {
        return this.todoService.getTodo(id, userId);
    }

    @Get('todo/deleted/:userId')
    getAllDeletedTodos(@Param('userId') userId: string): Promise<ToDo[]> {
        return this.todoService.getAllDeletedTodos(userId);
    }

    @Get('todo/restore/:id/:userId')
    restoreTodo(@Param('id') id: string, @Param('userId') userId: string): Promise<ToDo> {
        return this.todoService.restoreTodo(id, userId);
    }


}
