import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDo, ToDoSchema } from './todo.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/middleware/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule { }
