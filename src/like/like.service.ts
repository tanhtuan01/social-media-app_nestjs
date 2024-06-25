import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './like.schema';
import { Model } from 'mongoose';
import { LikeDTO } from './like.dto';

@Injectable()
export class LikeService {

    constructor(
        @InjectModel(Like.name) private readonly likeModel: Model<Like>
    ) { }


    async createLike(userid: string, likeDTO: LikeDTO): Promise<Like> {
        try {
            likeDTO.userId = userid;
            const like = await this.likeModel.create(likeDTO);
            return like;
        } catch (error) {
            throw new HttpException('Failed to create like', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
