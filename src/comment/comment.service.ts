import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {

    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) { }

    async createComment(userid: string, commentDTO: CommentDTO): Promise<Comment> {
        try {
            commentDTO.userId = userid;
            const comment = await this.commentModel.create(commentDTO);
            if (!comment) throw new HttpException('Failed to create comment', HttpStatus.INTERNAL_SERVER_ERROR);
            return comment;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
