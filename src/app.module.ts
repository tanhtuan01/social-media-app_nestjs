import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { ShareModule } from './share/share.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';
import { BpostModule } from './bpost/bpost.module';

@Module({
  imports: [UserModule, LikeModule, CommentModule, ShareModule, ChatModule, MongooseModule.forRoot('mongodb://localhost/social_media_app'), TodoModule, BpostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
