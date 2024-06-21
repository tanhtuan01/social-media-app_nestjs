import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDo, ToDoSchema } from './todo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule { }
