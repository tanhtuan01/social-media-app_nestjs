import { Body, Controller, Post, Req } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeDTO } from './like.dto';
import { Request } from 'express';

@Controller('like')
export class LikeController {

    constructor(private likeService: LikeService) { }

    @Post('post')
    async createLike(@Body() likeDTO: LikeDTO, @Req() req: Request) {
        const userId = req.userId;
        console.log(likeDTO)
        return this.likeService.createLike(userId, likeDTO);
    }
}
