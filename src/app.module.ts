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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthService } from './middleware/auth.service';
import { PasswordService } from './middleware/password.service';
import { AuthModule } from './middleware/auth.module';
// import { PasswordService } from './middleware/password.service';

@Module({
  imports: [AuthModule, UserModule, LikeModule, CommentModule, ShareModule, ChatModule, MongooseModule.forRoot('mongodb://localhost/social_media_app'), TodoModule, BpostModule],
  controllers: [AppController],
  providers: [AppService, AuthService, PasswordService, JwtService, AuthService],
  exports: [PasswordService, JwtService, AuthService],
  //exports: [AuthService, PasswordService],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/create', method: RequestMethod.POST },
        { path: '/user/get/:emailOrPhone/:password', method: RequestMethod.GET },
      )
      .forRoutes('*')
  }
}
