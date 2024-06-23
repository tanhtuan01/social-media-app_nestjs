import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './middleware/auth.service';

@Module({
  imports: [UserModule, LikeModule, CommentModule, ShareModule, ChatModule, MongooseModule.forRoot('mongodb://localhost/social_media_app'), TodoModule, BpostModule,
    JwtModule.register({ secret: 'XXKAMSKASMIWN123x', signOptions: { expiresIn: '1d' } }),],
  controllers: [AppController],
  providers: [AppService, AuthService],
  // exports: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/create', method: RequestMethod.POST },
      )
      .forRoutes('*')
  }
}
