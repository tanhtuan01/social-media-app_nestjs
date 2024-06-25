import { Module } from '@nestjs/common';
import { BpostController } from './bpost.controller';
import { BpostService } from './bpost.service';
import { BPost, BPostSchema } from './bpost.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/user/user.schema';
import { Comment, CommentSchema } from 'src/comment/comment.schema';
import { Like, LikeSchema } from 'src/like/like.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BPost.name, schema: BPostSchema },
    { name: User.name, schema: UserSchema },
    { name: Comment.name, schema: CommentSchema },
    { name: Like.name, schema: LikeSchema },
  ]), UserModule],
  controllers: [BpostController],
  providers: [BpostService],
  exports: [BpostService, MongooseModule.forFeature([{ name: BPost.name, schema: BPostSchema }])]
  // note: Xuất BpostService: Để các module khác có thể sử dụng BpostService khi cần.
  // note: Xuất MongooseModule.forFeature([{ name: BPost.name, schema: BPostSchema }]): Để các module khác có thể inject BPostModel khi cần sử dụng.   
})
export class BpostModule { }
