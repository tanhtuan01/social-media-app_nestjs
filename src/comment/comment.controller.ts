import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CommentDTO } from './comment.dto';
import { Comment } from './comment.schema';

@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

    @Post('create')
    async createComment(@Req() req: Request, @Body() commentDTO: CommentDTO): Promise<Comment> {
        const userId = req.userId
        return await this.commentService.createComment(userId, commentDTO);
    }

}
