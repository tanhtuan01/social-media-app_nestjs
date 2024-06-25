import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BPost } from './bpost.schema';
import { Model } from 'mongoose';
import { BPostDTO } from './bpost.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.schema';
import { Comment } from 'src/comment/comment.schema';
import { Like } from 'src/like/like.schema';
import { Mode } from 'fs';

@Injectable()
export class BpostService {

    constructor(@InjectModel(BPost.name) private readonly bpostModel: Model<BPost>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
        @InjectModel(Like.name) private readonly likeModel: Model<Like>) { }

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

    async getAllPost(userid: string): Promise<(BPost & { name: string })[]> {
        try {
            const currentUser = await this.userModel.findOne({ _id: userid }).lean().exec();
            const posts = await this.bpostModel.find().lean().sort({ createdAt: -1 }).exec();

            const postsWithUserName = await Promise.all(
                posts.map(async (post) => {
                    const user = await this.userModel.findOne({ _id: post.author }).lean().exec();
                    const comments = await this.commentModel.find({ postId: post._id }).lean().sort({ createdAt: -1 })
                    const commentsWithUserName = await Promise.all(
                        comments.map(async (comment) => {
                            const commentUser = await this.userModel.findOne({ _id: comment.userId }).lean().exec();
                            const userFIND = await this.userModel.findOne({ _id: comment.userId }).lean().exec();
                            const meOrOther = userFIND.name == currentUser.name ? 'Me' : user.name;

                            return {
                                userName: meOrOther,
                                content: comment.content,
                                createdAt: comment.createdAt
                            };
                        })
                    );
                    const totalLike = await this.likeModel.countDocuments({ postId: post._id, isLiked: true }).exec();
                    let name = user.name || 'Unknown';
                    if (post.author == userid) {
                        name = 'Me'
                    }
                    return { ...post, name, comment: commentsWithUserName, totalLike };
                })
            );
            return postsWithUserName;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async getAllPostTEMP(): Promise<(BPost & { name: string; comments: { userId: string; userName: string; content: string; createdAt: Date }[] })[]> {
    //     try {
    //         const posts = await this.bpostModel.find().lean().sort({ createdAt: -1 }).exec();
    //         const postsWithUserNameAndComments = await Promise.all(
    //             posts.map(async (post) => {
    //                 const user = await this.userModel.findOne({ _id: post.author }).lean().exec();
    //                 const comments = await this.commentModel.find({ postId: post._id });
    //                 const commentsWithUserName = await Promise.all(
    //                     comments.map(async (comment) => {
    //                         const commentUser = await this.userModel.findOne({ _id: comment.userId }).lean().exec();
    //                         return {
    //                             userId: comment.userId,
    //                             userName: commentUser?.name || 'Unknown',
    //                             content: comment.content,
    //                             createdAt: comment.createdAt
    //                         };
    //                     })
    //                 );
    //                 return { ...post, name: user?.name || 'Unknown', comments: commentsWithUserName };
    //             })
    //         );
    //         return postsWithUserNameAndComments;
    //     } catch (error) {
    //         throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }



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
