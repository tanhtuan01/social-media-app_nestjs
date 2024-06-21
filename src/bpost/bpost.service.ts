import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BPost } from './bpost.schema';
import { Model } from 'mongoose';
import { BPostDTO } from './bpost.dto';

@Injectable()
export class BpostService {

    constructor(@InjectModel(BPost.name) private readonly bpostModel: Model<BPost>) { }

    async findAllPostNotherUser(user_id: string): Promise<BPost[]> {
        return await this.bpostModel.find({ author: { $ne: user_id } }).lean().exec();
    }

    async findAllPostOfUser(user_id: string): Promise<BPost[]> {
        return await this.bpostModel.find({ author: user_id }).lean().exec();
    }

    async postByAuthor(user_id: string): Promise<BPost[]> {
        return await this.bpostModel.find({ author: user_id }).lean().exec();
    }

    async createPost(postDTO: BPostDTO): Promise<BPost> {
        return await new this.bpostModel(postDTO).save();
    }

    async updatePost(post_id: string, postDTO: BPostDTO): Promise<BPost> {
        return await this.bpostModel.findByIdAndUpdate(post_id, postDTO, { new: true }).exec();
    }

    async deletePost(post_id: string): Promise<BPost> {
        const post = await this.bpostModel.findOne({ _id: post_id }).lean().exec();
        if (!post) throw new Error('Post not found');
        await this.bpostModel.deleteOne({ _id: post_id }).lean().exec();
        return post;
    }
}
