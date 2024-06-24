import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Share } from './share.schema';
import { Model } from 'mongoose';
import { BPost } from 'src/bpost/bpost.schema';

@Injectable()
export class ShareService {
    constructor(
        @InjectModel(Share.name) private readonly shareModel: Model<Share>,
        @InjectModel(BPost.name) private readonly bpostModel: Model<BPost>
    ) { }

    createShareHref(post_id: string, user_id: string): string {
        try {
            const postFind = this.bpostModel.findOne({ _id: post_id }).lean().exec();
            if (!postFind) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            return '/post-share/' + post_id + '/u/' + user_id;
        } catch (error) {
            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
