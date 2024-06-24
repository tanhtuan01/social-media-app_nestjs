import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BPost } from './bpost.schema';
import { Model } from 'mongoose';
import { BPostDTO } from './bpost.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class BpostService {

    constructor(@InjectModel(BPost.name) private readonly bpostModel: Model<BPost>,
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async findAllPostNotherUser(user_id: string): Promise<BPost[]> {
        try {
            const findAllPostNotherUser = await this.bpostModel.find({ author: { $ne: user_id } }).lean().exec();
            if (!findAllPostNotherUser) throw new HttpException('No post found', HttpStatus.NOT_FOUND);
            return findAllPostNotherUser;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // async getAllPost(): Promise<BPost[]> {
    //     try {
    //         return await this.bpostModel.find().lean().exec();
    //     } catch (error) {
    //         throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }

    async getAllPost(): Promise<(BPost & { name: string })[]> {
        try {
            const posts = await this.bpostModel.find().lean().exec();
            const postsWithUserName = await Promise.all(
                posts.map(async (post) => {
                    const user = await this.userModel.findOne({ _id: post.author }).lean().exec();
                    return { ...post, name: user.name || 'Unknown' };
                })
            );
            return postsWithUserName;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    async findAllPostOfUser(user_id: string): Promise<BPost[]> {
        try {
            const bPost = await this.bpostModel.find({ author: user_id }).lean().exec();
            if (!bPost) throw new HttpException('No post found', HttpStatus.NOT_FOUND);
            return bPost;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async postByAuthor(user_id: string): Promise<BPost[]> {
        try {
            const bPost = await this.bpostModel.find({ author: user_id }).lean().exec();
            if (!bPost) throw new HttpException('No post found', HttpStatus.NOT_FOUND);
            return bPost
        } catch (error) {

        }
    }

    async createPost(userId: string, postDTO: BPostDTO): Promise<BPost> {
        try {
            postDTO.author = userId;
            return await new this.bpostModel(postDTO).save();
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async updatePost(post_id: string, postDTO: BPostDTO): Promise<BPost> {
        try {
            const bpostFind = this.bpostModel.findOne({ _id: post_id }).lean().exec();
            if (!bpostFind) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            return await this.bpostModel.findByIdAndUpdate(post_id, postDTO, { new: true }).exec();
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async deletePost(post_id: string): Promise<BPost> {
        try {
            const post = await this.bpostModel.findOne({ _id: post_id }).lean().exec();
            if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            await this.bpostModel.deleteOne({ _id: post_id }).lean().exec();
            return post;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
