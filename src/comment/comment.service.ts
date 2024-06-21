import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) { }

    async createComment(commentDTO: CommentDTO): Promise<Comment> {
        return this.commentModel.create(commentDTO);
    }
}
