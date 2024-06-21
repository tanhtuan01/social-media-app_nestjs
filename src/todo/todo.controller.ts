import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDoDTO } from './todo.dto';
import { ToDo } from './todo.schema';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    @Post('create/:id')
    createTodo(@Param('id') id: string, @Body() todoDTO: ToDoDTO): Promise<ToDo> {
        todoDTO.userId = id;
        return this.todoService.createTodo(todoDTO);
    }

    @Delete('soft-delete/:id/:userId')
    deleteTodo(@Param('id') id: string, @Param('userId') userId: string) {
        return this.todoService.softDeleteTodo(id, userId);
    }

    @Put('update/:id')
    updateTodo(@Body() todoDTO: ToDoDTO, @Param('id') id: string): Promise<ToDo> {
        todoDTO.userId = id
        return this.todoService.updateTodo(todoDTO);
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
